window.onload = async () => {
  let queryString = new URLSearchParams(window.location.search);
  let id = queryString.get("pokemon");
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  let details = await res.json();
  let h1 = document.querySelector("h1");
  h1.innerHTML = details.name;
};
