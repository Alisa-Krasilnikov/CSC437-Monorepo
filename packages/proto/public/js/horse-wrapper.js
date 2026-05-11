import { html, shadow } from "@unbndl/html";

function renderHorse(data) {
  const { imgSrc, imgAlt, ownerHref, birthday, breed, color, height, ownerName } = data;

  return html`
    <horse-stuff
      img-src=${imgSrc}
      img-alt=${imgAlt}
      owner-href=${ownerHref}
    >
      <time slot="birthday">${birthday}</time>
      <span slot="breed">${breed}</span>
      <span slot="color">${color}</span>
      <span slot="height">${height}</span>
      <span slot="owner-name">${ownerName}</span>
    </horse-stuff>
  `;
}

export class HorseWrapperElement extends HTMLElement {
  constructor() {
  super();
  shadow(this);
}
  
  static observedAttributes = ["src"];

attributeChangedCallback(name, _, newValue) {
    if (name === "src") {
      this.hydrate(newValue).then((data) => {
        const view = HorseWrapperElement.render(data)
        shadow(this).replace(view);
      });
    }
  }

static render(data) {
  return renderHorse(data);
}
  
  hydrate(src) {
  return fetch(src)
    .then((response) => {
      if (response.status !== 200)
        throw `HTTP Status ${response.status}`;
      else return response.json();
    })
    .catch((error) => {
      console.log(`Could not fetch ${src}:`, error);
    });
}
}