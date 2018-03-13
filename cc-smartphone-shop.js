class CcSmartphoneShop extends HTMLElement {
    constructor() {
        super();        

        // DOM elements
        this._root = this.attachShadow({ mode: 'open' });

        // data
        this._smartphones = [
            {
                id: 1,
                brand: 'Samsung',
                model: 'Galaxy S7 Edge',
                description: 'Le smartphone Honor 9, nouveau très haut de gamme Honor, bla bla'
            },
            {
                id: 2,
                brand: 'Honor',
                model: '9 (bleu)',
                description: 'Nouveau fer de lance de la marque, bli bli'                
            }
        ];

    }

    connectedCallback() { 
        this._root.innerHTML = `
            <style>
                .frame {
                    border: 2px dotted grey;
                    margin-bottom: 10px;
                    padding-left: 10px;
                }

                h1, h2 {
                    color: green;
                }
            </style>
            <template id="smartphone-template">
                <div class="frame">
                    <h2 id="brand"></h2>
                    <p id="model"></p>
                    <p id="description"></p>
                </div>
            </template>
            <div id="result"></div>
        `;

        this._templateContent = this._root.querySelector('#smartphone-template').content;
        this._result = this._root.querySelector('#result');

        this._smartphones.map(smartphone => {
            const clone = document.importNode(this._templateContent, true);
            // update the DOM with current smartphone data
            clone.querySelector('#brand').innerHTML = smartphone.brand;
            clone.querySelector('#model').innerHTML = smartphone.model;
            clone.querySelector('#description').innerHTML = smartphone.description;
            // add to the DOM
            this._result.appendChild(clone);
        });
    }
} // end class

window.customElements.define('cc-smartphone-shop', CcSmartphoneShop);