export function preparePages(HTMLContent: string, renderNode: Node) {
  const doc = new DOMParser().parseFromString(HTMLContent, "text/html");
  let elementsToRender: Node[] = Array.from(doc.body.children);

  const pages = [];
  const headings = [];
  let count = 0;
  while (elementsToRender.length > 0 && count < 1000) {
    count++;
    const {
      remainingElements,
      HTML,
      headings: newHeadings,
    } = renderPage(elementsToRender, renderNode);
    elementsToRender = remainingElements;
    pages.push(HTML);
    headings.push(...newHeadings);
  }
  return { pages, amount: pages.length, headings, isBlank: pages.length === 0 };
}

function renderPage(elements: Node[], renderNode: Node) {
  let hasRanOut = false;
  //First, render the elements from the array untill the prerenderNode overflows
  doUntillOverflow({
    callback: function appendElement() {
      renderNode.appendChild(elements.shift() as Node);
    },
    cleanupFn: function removeLastElement() {
      if (renderNode.lastChild === null || !hasRanOut) return;
      elements.unshift(renderNode.lastChild);
      renderNode.removeChild(renderNode.lastChild);
    },
    canRunCallback: () => {
      hasRanOut = elements.length > 0;
      return hasRanOut;
    },
  });

  // Otherwise, recursively render the children of the last element
  // so that we can render as much as possible
  const lastItemOnPage = elements[0];
  if (lastItemOnPage?.hasChildNodes()) {
    const clone = lastItemOnPage.cloneNode(true);
    lastItemOnPage.replaceChildren();
    renderNode.appendChild(lastItemOnPage);
    const partialChild = renderChildrenRecursively(lastItemOnPage, clone);
    if (partialChild.hasChildNodes()) {
      elements.unshift(partialChild);
    }
  }

  const result = renderNode.innerHTML;
  const headings = Array.from(
    renderNode.querySelectorAll("h1, h2, h3, h4, h5, h6")
  ).map((heading: HTMLHeadingElement) => ({
    id: heading.id,
    text: heading.textContent,
    level: parseInt(heading.tagName[1]),
  }));
  //TODO: Figure out why there are empty headings
  renderNode.innerHTML = "";
  return { remainingElements: elements, HTML: result, headings };

  /* ------------- Inner functions ------------- */
  /**
   * @param element element to render the children into
   * @param copy copy of the element with the children to render
   * Renders the children of the copy into the element until the element overflows
   * @returns copy of the element with the remaining children
   */
  function renderChildrenRecursively(element: Node, copy: Node) {
    doUntillOverflow({
      callback: () => {
        const child = copy.firstChild;
        if (child === null) return;
        //AppendChild will move the child from the copy
        element.appendChild(child);
      },
      canRunCallback: () => copy.hasChildNodes(),
      cleanupFn: () => {
        const lastChild = element.lastChild;
        if (lastChild === null) return;
        if (lastChild.hasChildNodes()) {
          //Recursively render the children of the last child,
          //passing the remainder to the copy Node
          const deepClone = lastChild.cloneNode(true);
          lastChild.replaceChildren();
          const deepCopy = renderChildrenRecursively(lastChild, deepClone);
          copy.prepend(deepCopy);
        } else if (
          lastChild.nodeType === Node.TEXT_NODE &&
          lastChild.textContent !== null
        ) {
          const remainingText = renderWordsUntilOverflow(lastChild);
          if (remainingText.length > 0) {
            //TODO: Verify if this is the correct way to handle the remaining text
            copy.textContent += remainingText;
          }
        } else {
          element.removeChild(lastChild);
          copy.prepend(lastChild);
        }
      },
    });
    return copy;
  }
  function renderWordsUntilOverflow(element: Node) {
    const text = element.textContent as string;
    element.textContent = "";
    let words: string[] = [];
    if ("Segmenter" in Intl) {
      const segmenterFr = new Intl.Segmenter("en", {
        granularity: "word",
      });
      words = Array.from(segmenterFr.segment(text)).map(
        (segment) => segment.segment
      );
    } else {
      words = text.split(" ").map((word) => word + " ");
    }
    let nextWord = "";
    doUntillOverflow({
      callback: function appendWord() {
        nextWord = words.shift() as string;
        element.textContent += nextWord;
      },
      cleanupFn: function cleanupLastWord() {
        element.textContent =
          element.textContent?.slice(
            0,
            element.textContent.length - nextWord.length
          ) ?? "";
        words.unshift(nextWord);
      },
      canRunCallback: () => words.length > 0,
    });

    return words.join("");
  }
  /**
   * Run the callback until the prerenderNode overflows
   * @param callback A function that manipulates the prerenderNode
   * @param undoCallback A function that undoes the last operation of the callback
   */
  function doUntillOverflow({
    callback,
    cleanupFn,
    canRunCallback,
  }: {
    callback: () => void;
    cleanupFn: () => void;
    canRunCallback: () => boolean;
  }) {
    while (
      renderNode.scrollHeight === renderNode.clientHeight &&
      canRunCallback()
    ) {
      callback();
    }
    cleanupFn();
  }
}
