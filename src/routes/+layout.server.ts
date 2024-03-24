/** @type {import('./$types').LayoutServerLoad} */ export async function load({
  route,
}) {
  return {
    title: route.id,
  };
}
