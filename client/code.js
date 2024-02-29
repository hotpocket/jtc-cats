const btn = document.querySelector(".getCat");
const catPic = document.querySelector(".catPic");
const form = document.querySelector("form");

const randomBreed = [
  "siberian",
  "bengal",
  "siamese",
  "ragdoll",
  "persian",
  "main",
  "scottish",
  "british",
  "abyssinian",
  "burmese",
  "himalayan",
  "russian",
  "munchkin",
];

const makeItRandom = Math.floor(Math.random() * randomBreed.length);

async function getCat(e) {
  e.preventDefault();

  const response = await fetch(
    `http://localhost:3001/create/${randomBreed[makeItRandom]}`
  );

  const data = await response.json();

  console.log(data);

  const { image } = data[0];
  //so far I am only getting the image url.
  console.log(image);

  catPic.src = image.url;
}

form.addEventListener("submit", getCat);
