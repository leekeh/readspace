export function prerenderText(elements: Node[], prerenderNode: Node) {
  //First, render the elements from the array untill the prerenderNode overflows
  doUntillOverflow({
    callback: function appendElement() {
      prerenderNode.appendChild(elements.shift() as Node);
    },
    cleanupFn: function removeLastElement() {
      if (prerenderNode.lastChild === null) return;
      elements.unshift(prerenderNode.lastChild);
      prerenderNode.removeChild(prerenderNode.lastChild);
    },
    canRunCallback: () => elements.length > 0,
  });

  // If there are no more elements to render, we are done
  if (elements.length === 0) return;

  // Otherwise, recursively render the children of the last element
  // so that we can render as much as possible
  const lastItemOnPage = elements[0];
  if (lastItemOnPage.hasChildNodes()) {
    const clone = lastItemOnPage.cloneNode(true);
    lastItemOnPage.replaceChildren();
    prerenderNode.appendChild(lastItemOnPage);
    const partialChild = renderChildrenRecursively(lastItemOnPage, clone);
    if (partialChild.hasChildNodes()) {
      elements.unshift(partialChild);
    }
  }

  return elements;

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
      prerenderNode.scrollHeight === prerenderNode.clientHeight &&
      canRunCallback()
    ) {
      callback();
    }
    cleanupFn();
  }
}
