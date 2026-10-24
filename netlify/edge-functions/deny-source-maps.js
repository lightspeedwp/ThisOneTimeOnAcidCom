export default function denySourceMaps() {
  return new Response("Not found", { status: 404 });
}
