const items = [
  {
    url: "/",
    iconPath: `home`,
    text: "home",
  },
  {
    url: "/read",
    iconPath: "reader",
    text: "reader",
  },
  {
    url: "/library",
    iconPath: "books",
    text: "browse",
  },
  {
    url: "/profile",
    iconPath: "user",
    text: "profile",
  },
  {
    url: "/about",
    iconPath: "logo",
    text: "about",
  },
];

export function createNavigation() {
  let currentItem = null;
  const navigation = document.createElement("nav");
  const ul = document.createElement("ul");
  items.forEach((item) => {
    const isCurrent =
      item.url === "/"
        ? location.pathname === item.url
        : location.pathname.startsWith(item.url);

    const li = Object.assign(document.createElement("li"), {
      innerHTML: `<li>
  <a href="${item.url}" ${isCurrent ? "aria-current" : ""}>
      <img src='assets/icons/${item.iconPath}.svg' height='24px' width='24px' />
      ${item.text}
  </a>
</li>`,
    });
    if (isCurrent) {
      currentItem = li;
    }
    ul.appendChild(li);
  });
  navigation.appendChild(ul);
  return { navigation, currentItem };
}
