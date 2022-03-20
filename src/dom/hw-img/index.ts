class HWIMG extends HTMLImageElement {
  //public constructor() {
  //  super();
  //}

  public static get observedAttributes() {
    return ["src"];
  }

  public connectedCallback() {
    console.log("new hamster tag created");
    this.src =
      "https://i0.wp.com/thehappiesthamster.com/wp-content/uploads/2021/03/Syrian-Hamster.png?resize=256%2C256";
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "src") {
      this.src = newValue;
    }
  }
}

export default HWIMG;
