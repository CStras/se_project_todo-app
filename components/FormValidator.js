class FormValidator {
    constructor(settings, formEl) {
        this._formEl = formEl;
        this._formSelector = settings.formSelector;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._errorClass = settings.errorClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._inactiveButtonClass = settings.inactiveButtonClass;
    }

    _showInputError(formElement, inputElement, errorMessage) {
        const errorElementId = `#${inputElement.id}-error`;
        const errorElement = formElement.querySelector(errorElementId);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(formElement, inputElement) {
        const errorElementId = `#${inputElement.id}-error`;
        const errorElement = formElement.querySelector(errorElementId);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    }

    _setEventListeners() {
        this._inputList = Array.from(this._formEl.querySelectorAll(this._inputSelector));
        this._buttonEl = this._formEl.querySelector(this._submitButtonSelector);

        this._toggleButtonState(this._inputList, this._buttonEl);

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputList, this._buttonEl);
            });
        });
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(
                this._formEl,
                inputElement,
                inputElement.validationMessage,
            );
        } else {
            this._hideInputError(this._formEl, inputElement);
        }
    }

    _hasInvalidInput() {

        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState() {


        if (this._hasInvalidInput(this._inputList)) {
            this._buttonEl.classList.add(this._inactiveButtonClass);
            this._buttonEl.disabled = true;
        } else {
            this._buttonEl.classList.remove(this._inactiveButtonClass);
            this._buttonEl.disabled = false;
        }
    }

    resetValidation() {
        this._toggleButtonState(this._inputList, this._submitButtonSelector);

        this._inputList.forEach((input) => {
            this._hideInputError(input);
        });
    }

    enableValidation() {

        this._formEl.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners();
    }
}



export default FormValidator;