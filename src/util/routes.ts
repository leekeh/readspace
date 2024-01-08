export const routes = [
  {
    url: "/",
    icon: `home`,
    text: "home",
  },
  {
    url: "/reader",
    icon: "reader",
    text: "reader",
  },
  {
    url: "/library",
    icon: "books",
    text: "browse",
  },
  {
    url: "/profile",
    icon: "user",
    text: "profile",
  },
  {
    url: "/about",
    icon: "logo",
    text: "about",
  },
];

export function getTitle(href: string) {
  return routes.find((route) => route.url === href)?.text ?? "404";
}
