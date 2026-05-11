import { html, css, shadow } from "@unbndl/html";
import reset from "./styles/reset.css.js";

export class HorseElement extends HTMLElement {
  static template = html`
  <template>
    <aside class="sidebar">
      <img id="horse-img" alt="" style="width: 100%;">

      <section class="information">
        <dl>
          <dt>Date of Birth:</dt>
          <dd><slot name="birthday"></slot></dd>
          <dt>Breed:</dt>
          <dd><slot name="breed"></slot></dd>
          <dt>Color:</dt>
          <dd><slot name="color"></slot></dd>
          <dt>Height:</dt>
          <dd><slot name="height"></slot></dd>
          <dt>Owner:</dt>
          <dd><a id="owner-link"><slot name="owner-name"></slot></a></dd>
        </dl>
      </section>
    </aside>
  </template>
`;

  constructor() {
    super();
    shadow(this)
      .template(HorseElement.template)
      .styles(reset.styles, HorseElement.styles);
  }
  static observedAttributes = ["img-src", "img-alt", "owner-href"];

  attributeChangedCallback(name, _, newValue) {
    const root = this.shadowRoot;
    switch (name) {
      case "img-src":
        root.getElementById("horse-img").src = newValue;
        break;
      case "img-alt":
        root.getElementById("horse-img").alt = newValue;
        break;
      case "owner-href":
        root.getElementById("owner-link").href = newValue;
        break;
    }
  }

  static styles = css`
  .information {
    padding: var(--space-md);
    border: var(--color-border) solid var(--border-lg);
    background-color: var(--color-table-header);
    }
  .information dt { 
    color: var(--color-text-light); 
    }
  .information dd { 
    color: var(--color-text-dark); 
    }
  .information a:link { 
    color: var(--color-link-info); 
    }
  .information a:visited { 
    color: var(--color-link-info-visited); 
    }
  img {
    border-style: solid; 
    border-width: var(--space-sm);
    border-color: var(--color-border);
    max-width: 100%;
    }
`;
}
