//validation code of profile popup, to organize
function showInputError(element, errorMessage) {
  const errorElement = document.querySelector(`#${element.id}-error`);
  element.classList.add("popup__input_type_error");
  errorElement.classList.add("popup__error_visible");
  errorElement.textContent = errorMessage;
}
function hideInputError(element) {
  const errorElement = document.querySelector(`#${element.id}-error`);
  element.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__error_visible");
  errorElement.textContent = "";
}
function toggleButtonState(form) {
  const inputs = form.querySelectorAll(".popup__input");
  const submitButton = form.querySelector(".popup__button");
  const allValidInput = Array.from(inputs).every(
    (input) => input.validity.valid,
  );
  submitButton.disabled = !allValidInput;
}
function checkInputValidity({ target: input }, form) {
  if (!input.validity.valid) {
    showInputError(input, input.validationMessage);
  } else {
    hideInputError(input);
  }
  toggleButtonState(form);
}
function addHandleCheckFormValidity(form) {
  //setEventListeners
  toggleButtonState(form);
  const inputs = form.querySelectorAll(".popup__input");
  inputs.forEach((input) => {
    input._checkValidityHandler = (e) => checkInputValidity(e, form);
    input.addEventListener("input", input._checkValidityHandler);
  });
}
function removeHandleCheckFormValidity(form) {
  //resetValidation
  const inputs = form.querySelectorAll(".popup__input");
  inputs.forEach((input) => {
    input.removeEventListener("input", input._checkValidityHandler);
  });
}

export {
  addHandleCheckFormValidity as setEventListeners,
  removeHandleCheckFormValidity as resetValidation,
};
