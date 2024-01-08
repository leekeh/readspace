import { getTitle } from "@util";

/** @type {import('./$types').LayoutServerLoad} */ export async function load({
  route,
}) {
  return {
    title: getTitle(route.id ?? ""),
    hasNavBar: !route.id?.startsWith("/reader"),
  };
}
