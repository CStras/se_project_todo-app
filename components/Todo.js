class Todo {
    constructor(data, selector, handleCheck, handleDelete) {
        this._data = data;
        this._completed = data.completed;
        this._templateElement = document.querySelector(selector);
        this._handleCheck = handleCheck;
        this._handleDelete = handleDelete;
    }

    _generateCheckboxEl() {
        this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
        this._todoLabel = this._todoElement.querySelector(".todo__label");
        this._todoCheckboxEl.id = `todo-${this._data.id}`;
        this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
        this._todoCheckboxEl.checked = this._data.completed;
    }

    _generateDates() {
        const dueDate = new Date(this._data.date);
        if (!isNaN(dueDate)) {
            this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })}`;
        }
    }

    _setEventListeners() {
        this._todoCheckboxEl.addEventListener("change", () => {
            this._completed = !this._completed;

            if (this._todoCheckboxEl.checked) {
                this._handleCheck(true);
            } else {
                this._handleCheck(false);
            }

        });

        this._todoDeleteBtn.addEventListener("click", () => {
            if (!this._todoCheckboxEl.checked) {
                this._handleDelete(true);
            } else {
                this._handleDelete(false);
            }

            this._todoElement.remove();
        });
    }

    getView() {
        this._todoElement = this._templateElement.content
            .querySelector(".todo")
            .cloneNode(true);

        const todoNameEl = this._todoElement.querySelector(".todo__name");
        this._todoDate = this._todoElement.querySelector(".todo__date");
        this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

        todoNameEl.textContent = this._data.name;

        this._generateDates();
        this._generateCheckboxEl();
        this._setEventListeners();

        return this._todoElement;
    }

}

export default Todo;