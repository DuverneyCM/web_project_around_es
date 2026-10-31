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
submitButtonFormEditPopup.addEventListener("submit", handleProfileFormSubmit);

// Generate Cards Dinamically
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsList);
});

function renderCard(name, link, container) {
  container.append(getCardElement(name, link));
  //cardTemplate.after(getCardElement(name, link));
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

/* Others useful class names for futures tasks
profile__add-button
card__delete-button
card__like-button
popup__close 
popup__button
*/
