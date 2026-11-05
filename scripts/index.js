const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// Edit PopUp
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const closeButtonEditPopup = editPopup.querySelector(".popup__close");
const formEditPopup = editPopup.querySelector("#edit-profile-form");
const nameInputFormEditPopup = formEditPopup.querySelector(
  ".popup__input_type_name",
);
const descriptionInputFormEditPopup = formEditPopup.querySelector(
  ".popup__input_type_description",
);

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}
function fillProfileForm() {
  nameInputFormEditPopup.value = profileTitle.textContent;
  descriptionInputFormEditPopup.value = profileDescription.textContent;
}
function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInputFormEditPopup.value;
  profileDescription.textContent = descriptionInputFormEditPopup.value;
  closeModal(editPopup);
}

profileEditButton.addEventListener("click", handleOpenEditModal);
closeButtonEditPopup.addEventListener("click", () => closeModal(editPopup));
formEditPopup.addEventListener("submit", handleProfileFormSubmit);

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
  toggleButtonState(form); //checkear en el input o en el form?
}
function checkFormValidity(form) {
  const inputs = form.querySelectorAll(".popup__input");
  inputs.forEach((input) => {
    input.addEventListener("input", (e) => checkInputValidity(e, form));
  });
}

checkFormValidity(formEditPopup);

// Generate Cards Dinamically
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const cardImagePopup = document.querySelector("#image-popup");
const closeButtonImagePopup = cardImagePopup.querySelector(".popup__close");
const imageImagePopup = cardImagePopup.querySelector(".popup__image");
const captionImagePopup = cardImagePopup.querySelector(".popup__caption");

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsList);
});

function renderCard(name, link, container) {
  container.prepend(getCardElement(name, link));
}

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
  alt = name,
) {
  const cardClone = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardTitle = cardClone.querySelector(".card__title");
  const cardImage = cardClone.querySelector(".card__image");
  const cardDeleteButton = cardClone.querySelector(".card__delete-button");
  const cardLikeButton = cardClone.querySelector(".card__like-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = alt;

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_is-active");
  });
  cardDeleteButton.addEventListener("click", () => {
    cardClone.remove();
  });

  cardImage.addEventListener("click", () => {
    openModal(cardImagePopup);
    imageImagePopup.src = link;
    imageImagePopup.alt = alt;
    captionImagePopup.textContent = name;
  });

  return cardClone;
}

closeButtonImagePopup.addEventListener("click", () => {
  closeModal(cardImagePopup);
});

// Add new cards' pop-up
const profileAddButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const closeButtonNewCardPopup = newCardPopup.querySelector(".popup__close");
const formNewCardPopup = newCardPopup.querySelector("#new-card-form");
const nameInputFormNewCardPopup = formNewCardPopup.querySelector(
  ".popup__input_type_card-name",
);
const urlInputFormNewCardPopup = formNewCardPopup.querySelector(
  ".popup__input_type_url",
);

profileAddButton.addEventListener("click", handleOpenNewCardModal); //
function handleOpenNewCardModal() {
  openModal(newCardPopup);
}
closeButtonNewCardPopup.addEventListener("click", handleCloseNewCardModal); //
function handleCloseNewCardModal() {
  closeModal(newCardPopup);
}
formNewCardPopup.addEventListener("submit", handleCardFormSubmit);
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInputFormNewCardPopup.value;
  const url = urlInputFormNewCardPopup.value;
  renderCard(name, url, cardsList);
  closeModal(newCardPopup);
  formNewCardPopup.reset();
}
