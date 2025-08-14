async function movies() {
  const res = await fetch('/data.json');
  const data = await res.json();

  return data;
}
export default movies;
