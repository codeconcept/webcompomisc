class CcCountDown extends HTMLElement {
    constructor() {
        super();

        this._root = this.attachShadow({
            "mode": "open"
        });
        // DOM elements
        this._btnStart = null;
        this._btnStop = null;
        this._purposeTitle = null;
        this._currentValueParagraph = null;
        // data
        this._duration = 0;
        this._purpose = 'Compte à rebours';
        this._currentValue = 0;
        this._handle = -1;
        this._countDownRunning = false;
    }

    connectedCallback() {
        console.log('cc-countdown connected');
        this._root.innerHTML = `
            <style>
                #txtCurrentValue {
                    font-size: 24px;
                    font-weight: bold;
                }
            </style>
            <div>
                <h2 id="purpose"></h2>
                <button id="btnStart">démarrer</button>
                <button id="btnStop">arrêter</button>
                <span id="txtCurrentValue"></span> 
            </div>
        `;

        this._btnStart = this._root.querySelector('#btnStart');
        this._btnStart.addEventListener('click', event => {
            console.log('click');
            this._countDownRunning = !this._countDownRunning;
            if (this._countDownRunning === true) {
                this._startCountDown();
            } else {
                this._pauseCountDown();
            }
        });

        this._btnStop = this._root.querySelector('#btnStop');
        this._btnStop.addEventListener('click', event => {
            this._stopCountdown();
        });

        this._purposeTitle = this._root.querySelector('#purpose');
        this._purposeTitle.innerHTML = this.getAttribute('purpose') || this._purpose;

        this._currentValueParagraph = this._root.querySelector('#txtCurrentValue');
        this._currentValueParagraph.innerText = this._currentValue;
    }

    static get observedAttributes() {
        return ['duration', 'purpose'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('attribute changed', name, oldValue, newValue);

        if (name === 'duration') {
            this._setDuration(newValue);
        }

        if (name === 'purpose') {
            this._setPurpose(newValue);
        }
    }

    _setDuration(value) {
        if (value === null) return;
        this._duration = parseInt(value);
        this._currentValue = this._duration;
        if (this._currentValueParagraph) {
            this._currentValueParagraph.innerText = value;
        }
    }

    _setPurpose(value) {
        if (value === null) return;
        this._purpose = value;
        if(this._purposeTitle) {
            this._purposeTitle.innerHTML = value;
        }
    }

    _startCountDown() {
        if (this._currentValue === 0) return;
        this._btnStart.innerText = 'pause';
        this._handle = setInterval(() => {
            console.log('_currentValue ', this._currentValue);
            this._currentValue = this._currentValue - 1;
            this._currentValueParagraph.innerText = this._currentValue;
            if (this._currentValue === 0) {
                clearInterval(this._handle);
                this._currentValueParagraph.innerText = 'terminé';
                this._countDownRunning = false;
                this._currentValue = parseInt(this.getAttribute('duration'));
                this._btnStart.innerText = 'démarrer';
            }
        }, 1000);
    }

    _pauseCountDown() {
        this._btnStart.innerText = 'reprendre';
        clearInterval(this._handle);
        this._duration = this._currentValue;
    }

    _stopCountdown() {
        clearInterval(this._handle);
        this._countDownRunning = false;
        if (this.getAttribute('duration')) {
            this._currentValue = parseInt(this.getAttribute('duration'));
        } else {
            this._currentValue = 0;
        }
        this._currentValueParagraph.innerText = this._currentValue;
        this._btnStart.innerText = 'démarrer';
    }

} // end class
window.customElements.define('cc-countdown', CcCountDown);