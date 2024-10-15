const showInputError = (formElement, inputElement, errorMessage) => {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorMessageElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement,) => {
  const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorMessageElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  console.log(input.validity);
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  };
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelector(".modal__input"));
  const buttonElement = formElement.querySelector(".modal__submit-button");

  //toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      //toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formElement) => {
    /* formElement.addEventListener("submit", function (evt) {
      const inputElements = formElement.querySelectorAll(".modal__input");

      inputElements.forEach((input) => {
        if (!input.validity.valid) {
          showInputError(formElement, input, input.validationMessage);
          evt.preventDefault();
        } else {
          hideInputError(formElement, inputElement);
        };
      });
    }); */
    setEventListeners(formElement);
  });
};

enableValidation();