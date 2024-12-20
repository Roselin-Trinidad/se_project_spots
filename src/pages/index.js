import "./index.css";
import {enableValidation, settings, disableButton, resetValidation } from "../scripts/validation.js";
import profileAvatar from "../images/avatar.jpg";

const profileImage = document.querySelector("profile-avatar");
profileImage.src = profileAvatar;

const initialCards = [
  {
    Name: "Val Thorens",
    Link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
  },
  {
    Name: "Restaurant terrace",
    Link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    Name: "An outdoor cafe",
    Link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    Name: "A very long bridge, over the forest and through the trees",
    Link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    Name: "Tunnel with morning light",
    Link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    Name: "Mountain house",
    Link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    Name: "Golden Gate Bridge",
    Link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"
  },
];

// Nodes List
const modalElements = document.querySelectorAll(".modal");
const modalPopUps = document.querySelectorAll(".modal__container");


// Profile Elements
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button")
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Edit Modal Element
const editModal = document.querySelector("#edit-modal");
const editFormElement = editModal.querySelector("#edit-profile-modal");
const editModalCloseButton = editModal.querySelector(".modal__close-button");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector("#profile-description-input");
const editModalSubmitButton = editModal.querySelector(".modal__submit-button");

// Card Elements
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
const cardNameElement = cardElement.querySelector(".card__title");
const cardImageElement = cardElement.querySelector(".card__image");
const cardLikeButton = cardElement.querySelector(".card__like-button");
const cardDeleteButton = cardElement.querySelector(".card__delete-button");

// Add-Card Elements
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalForm = addCardModal.querySelector("#add-card-modal")
const addCardLinkInput = addCardModal.querySelector("#add-card-link-input");
const addCardNameInput = addCardModal.querySelector("#add-card-name-input");
const closeAddCardModalButton = addCardModal.querySelector(".modal__close-button");
const addCardModalSubmitButton = addCardModal.querySelector(".modal__submit-button");

// Preview Modal Elements
const previewModal = document.querySelector("#preview-modal");
const previewImageElement = previewModal.querySelector(".modal__image");
const previewCaptionElement = previewModal.querySelector(".modal__caption");
const previewCloseButton = previewModal.querySelector(".modal__close-button_type_preview");

// Card Element Information Functions
function getCardElement(data) {
 const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardNameElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardNameElement.textContent = data.Name;
  cardImageElement.src = data.Link;
  cardImageElement.alt = data.Name;

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_liked");
  });

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    openModal(previewModal);
    previewImageElement.src = data.Link;
    previewImageElement.alt = data.Name;
    previewCaptionElement.textContent = data.Name;
  });

  return cardElement;
};

// Render Card Function
/*function renderCard(item, method = "append") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}; */


// Initial Card Array forEach Loop
initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

// Opening and Closing Modal Functions
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
};

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
};


//Preview Closing Listener
previewCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

// Closing with Overlay Listener
modalElements.forEach(modal => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

// Escape Function and EventListener
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  };

};


// Profile Submission Function
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
}

// Profile Edit Button Event Listeners
profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(editFormElement, [editModalNameInput, editModalDescriptionInput]);
  openModal(editModal);
});

editModalCloseButton.addEventListener("click", () => {
  closeModal(editModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);

// Add Card Event Button Listener
addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

closeAddCardModalButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

// Add Card Submission Function and Listener
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    Name: addCardNameInput.value,
    Link: addCardLinkInput.value,
  };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  addCardModalForm.reset();
  disableButton(addCardModalSubmitButton, settings);
  closeModal(addCardModal);
  };
  addCardModalForm.addEventListener("submit", handleAddCardSubmit);

  enableValidation(settings);
