import "./index.css";
import {enableValidation, settings, disableButton, resetValidation } from "../scripts/validation.js";
import profileAvatar from "../images/avatar.jpg";
import Api from "../utils/API.js";

const profileImage = document.getElementById("profile-avatar");
profileImage.src = profileAvatar;

import valThorenImage from "../images/1-photo-by-moritz-feldmann-from-pexels.jpg";
import restaurantTerraceImage from "../images/2-photo-by-ceiline-from-pexels.jpg";
import anOutdoorCafeImage from "../images/3-photo-by-tubanur-dogan-from-pexels.jpg";
import aVeryLongBridgeImage from "../images/4-photo-by-maurice-laschet-from-pexels.jpg";
import tunnelMorningImage from "../images/5-photo-by-van-anh-nguyen-from-pexels.jpg";
import mountainHouseImage from "../images/6-photo-by-moritz-feldmann-from-pexels.jpg";
const goldenGateBridgeImage = new URL("https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg", import.meta.url);

/*const initialCards = [
  {
    Name: "Val Thorens",
    Link: valThorenImage,
  },
  {
    Name: "Restaurant terrace",
    Link: restaurantTerraceImage,
  },
  {
    Name: "An outdoor cafe",
    Link: anOutdoorCafeImage,
  },
  {
    Name: "A very long bridge, over the forest and through the trees",
    Link: aVeryLongBridgeImage,
  },
  {
    Name: "Tunnel with morning light",
    Link: tunnelMorningImage,
  },
  {
    Name: "Mountain house",
    Link: mountainHouseImage,
  },
  {
    Name: "Golden Gate Bridge",
    Link: goldenGateBridgeImage,
  },
]; */

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f7be2880-58ac-44a1-9646-7bf8ba324cd8",
    "Content-Type": "application/json"
  }
});

// Destructure the second item in the callback of the .then()

api.getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach((card) => {
      const cardElement = getCardElement(card);
      cardsList.append(cardElement);
    });
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileImage.src = userInfo.avatar;
  })
  .catch((err) => {
    console.error(err);
  });

// Nodes List
const modalElements = document.querySelectorAll(".modal");
const modalPopUps = document.querySelectorAll(".modal__container");


// Profile Elements
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const avatarModalButton = document.querySelector(".profile__avatar-button")
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

// Avatar Edit Modal Elements
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector("#edit-avatar-form");
const avatarCloseButton = avatarModal.querySelector(".modal__close-button");
const avatarSubmitButton = avatarModal.querySelector("modal__submit-button");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

//Card Delete Modal Elements
const deleteModal = document.querySelector("#delete-modal");
const deleteModalCloseButton = deleteModal.querySelector(".modal__close-button");
const deleteModalDeleteButton = deleteModal.querySelector(".modal__submit-button");
const deleteModalCancelButton = deleteModal.querySelector(".modal__cancel-button");

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
    openModal(deleteModal);
    deleteModalDeleteButton.addEventListener("click", () => {
      cardElement.remove();
      closeModal(deleteModal);
    });
    deleteModalCancelButton.addEventListener("click", () => {
      closeModal(deleteModal);
    });
    deleteModalCloseButton.addEventListener("click", () => {
      closeModal(deleteModal);
    });
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
  api.editUserInfo({
    name: editModalNameInput.value,
    about: editModalDescriptionInput.value
  })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(editModal);
    })
    .catch((err) => {
      console.error(err);
    });
};

// Avatar Submisson Function
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  api.editAvatarInfo(avatarInput.value)
    .then((data) => {
      profileImage.src = data.avatar;
      closeModal(avatarModal)
    })
    .catch((err) => {
      console.error(err)
    })
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

//avatarSubmitButton.addEventListener("submit", handleAvatarSubmit);

// Add Card Event Button Listener
addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

closeAddCardModalButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

// Avatar Edit Modal Button Event Listener
avatarModalButton.addEventListener("click", () => {
  openModal(avatarModal);
})

avatarCloseButton.addEventListener("click", () => {
  closeModal(avatarModal);
})

avatarForm.addEventListener("submit", handleAvatarSubmit);

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
