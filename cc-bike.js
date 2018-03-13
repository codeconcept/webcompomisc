class CcBike extends HTMLElement {
    constructor() {
        super();
        console.log('cc-bike ctor');
    }

    connectedCallback() {
        console.log('cc-bike added to the DOM');
    }

    start() {
        console.log('vroom');
    }
}

window.customElements.define('cc-bike', CcBike);