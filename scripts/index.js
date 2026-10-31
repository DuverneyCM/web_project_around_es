//alert("connected!");
//console.log("connected!");

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

initialCards.forEach((element) => {
  console.log(element.name);
});

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
const submitButtonFormEditPopup = formEditPopup.querySelector(".popup__button");

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

// Generate Cards Dinamically
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsList);
});

function renderCard(name, link, container) {
  container.prepend(getCardElement(name, link)); //append
  //cardTemplate.after(getCardElement(name, link)); // before
}

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
  alt = name,
) {
  const cardClone = cardTemplate.content.querySelector(".card").cloneNode(true);
  //const cardClone = cardTemplate.content.cloneNode(true); // se puede clonar el template.content directamente
  const cardTitle = cardClone.querySelector(".card__title");
  const cardImage = cardClone.querySelector(".card__image");
  const cardDeleteButton = cardClone.querySelector(".card__delete-button");
  const cardLikeButton = cardClone.querySelector(".card__like-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = alt;

  //cardDeleteButton.addEventListener("click", handleCardDeleteButton);
  //cardLikeButton.addEventListener("click", handleCardLikeButton);

  return cardClone;
}

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
const submitButtonFormNewCardPopup =
  formNewCardPopup.querySelector(".popup__button");

profileAddButton.addEventListener("click", handleOpenNewCardModal); //
function handleOpenNewCardModal() {
  //fillProfileForm();
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
  initialCards.push({ name, url });
  renderCard(name, url, cardsList);
  closeModal(newCardPopup);
  formNewCardPopup.reset();
}
