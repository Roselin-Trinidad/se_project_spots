const showInputError = (formElement, inputElement, errorMessage) => {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorMessageElement.textContent = errorMessage;
  inputElement.classList.add("modal__input_type_error");
};

const hideInputError = (formElement, inputElement,) => {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorMessageElement.textContent = " ";
  inputElement.classList.remove("modal__input_type_error");
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  };
};

const hasInvalidInput = (inputList) => {
  inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("modal__submit-button_disable");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("modal__submit-button_disable");
  }
};

const disableButton = (buttonElement) => {
  buttonElement.disbled = true;
  buttonElement.classList.add("modal__submit-button_disable");
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelector(".modal__input"));
  const buttonElement = formElement.querySelector(".modal__submit-button");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};


const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      const inputElement = formElement.querySelectorAll(".modal__input");

      inputElement.forEach((input) => {
        if (!input.validity.valid) {
          showInputError(formElement, inputElement, input.validationMessage);
          evt.preventDefault();
        } else {
          hideInputError(formElement, inputElement);
        };
      });
    });
    setEventListeners(formElement);
  });
};

enableValidation();