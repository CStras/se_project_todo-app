class Popup {
    constructor({ popupSelector }) {
        this._popupSelector = document.querySelector(popupSelector);
        // could I get more clarification on the issue with using this._popupSelector?
        this._popupCloseBtn = this._popupSelector.querySelector(".popup__close");
    }

    _handleEscapeClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    open() {
        this._popupSelector.classList.add("popup_visible");
        document.addEventListener("keyup", this._handleEscapeClose);
    }

    close() {
        this._popupSelector.classList.remove("popup_visible");
        document.removeEventListener("keyup", this._handleEscapeClose);
    }

    setEventListeners() {

        this._popupSelector.addEventListener("mousedown", (evt) => {
            if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close")) {
                this.close();
            }
        })
    }
}

export default Popup;