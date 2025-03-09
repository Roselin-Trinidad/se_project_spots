import "./index.css";
import {enableValidation, settings, disableButton, resetValidation } from "../scripts/validation.js";
import profileAvatar from "../images/avatar.jpg";
import Api from "../utils/API.js";
import {handleSubmit} from "../utils/helper.js";

import valThorenImage from "../images/1-photo-by-moritz-feldmann-from-pexels.jpg";
import restaurantTerraceImage from "../images/2-photo-by-ceiline-from-pexels.jpg";
import anOutdoorCafeImage from "../images/3-photo-by-tubanur-dogan-from-pexels.jpg";
import aVeryLongBridgeImage from "../images/4-photo-by-maurice-laschet-from-pexels.jpg";
import tunnelMorningImage from "../images/5-photo-by-van-anh-nguyen-from-pexels.jpg";
import mountainHouseImage from "../images/6-photo-by-moritz-feldmann-from-pexels.jpg";
const goldenGateBridgeImage = new URL("https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg", import.meta.url);

const profileImage = document.getElementById("profile-avatar");
profileImage.src = profileAvatar;

/*const initialCards = [
  {
    name: "Val Thorens",
    link: valThorenImage,
  },
  {
    name: "Restaurant terrace",
    link: restaurantTerraceImage,
  },
  {
    name: "An outdoor cafe",
    link: anOutdoorCafeImage,
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: aVeryLongBridgeImage,
  },
  {
    name: "Tunnel with morning light",
    link: tunnelMorningImage,
  },
  {
    name: "Mountain house",
    link: mountainHouseImage,
  },
  {
    name: "Golden Gate Bridge",
    link: goldenGateBridgeImage,
  },
]; */

// API Instance

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f7be2880-58ac-44a1-9646-7bf8ba324cd8",
    "Content-Type": "application/json"
  }
});


api.getAppInfo()
  .then(([ cards, userInfo ]) => {
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
const closeButtons = document.querySelectorAll(".modal__close-button");

// Profile Elements
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const avatarModalButton = document.querySelector(".profile__avatar-button")
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Edit Modal Element
const editModal = document.querySelector("#edit-modal");
const editFormElement = document.forms["edit-profile-modal"];
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

let selectedCard, selectedCardId;

// Add-Card Elements
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalForm = document.forms["add-card-modal"];
const addCardLinkInput = addCardModal.querySelector("#add-card-link-input");
const addCardNameInput = addCardModal.querySelector("#add-card-name-input");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close-button");
const addCardModalSubmitButton = addCardModal.querySelector(settings.submitButtonSelector);


// Preview Modal Elements
const previewModal = document.querySelector("#preview-modal");
const previewImageElement = previewModal.querySelector(".modal__image");
const previewCaptionElement = previewModal.querySelector(".modal__caption");
const previewCloseButton = previewModal.querySelector(".modal__close-button_type_preview");

// Avatar Edit Modal Elements
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = document.forms["edit-avatar-form"];
const avatarCloseButton = avatarModal.querySelector(".modal__close-button");
const avatarSubmitButton = avatarModal.querySelector("#avatar-submit-button");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

//Card Delete Modal Elements
const deleteModal = document.querySelector("#delete-modal");
const deleteModalForm = document.forms["delete-card-form"];
const deleteModalCloseButton = deleteModal.querySelector(".modal__close-button");
const deleteModalDeleteButton = deleteModal.querySelector("#delete-button-submit");
const deleteModalCancelButton = deleteModal.querySelector(".modal__cancel-button");

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => {
    closeModal(modal);
  })
})


function handleLike(evt, id) {
  const isLiked = evt.target.classList.contains("card__like-button_liked");
  api.handleLikeStatus(id, isLiked)
  .then(() => {
        evt.target.classList.toggle("card__like-button_liked");
  })
  .catch((err) => {
    console.error(err);
  });
};

// Card Element Information Functions
function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardNameElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardNameElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;

  if (data.isLiked) {
    cardLikeButton.classList.add("card__like-button_liked");
  } else {
    cardLikeButton.classList.remove("card__like-button_liked");
  }

  cardLikeButton.addEventListener("click", (evt) => {
    handleLike(evt, data._id);
  });

  cardDeleteButton.addEventListener("click", () => {
    handleDeleteCard(cardElement, data._id)
  });

  cardImageElement.addEventListener("click", () => {
    openModal(previewModal);
    previewImageElement.src = data.link;
    previewImageElement.alt = data.name;
    previewCaptionElement.textContent = data.name;
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
  function makeRequest() {
    return api.editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value
    }).then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
    });
  }
  handleSubmit(makeRequest, evt);
};

editFormElement.addEventListener("submit", handleEditFormSubmit);

// Avatar Submisson Function
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  function makeRequest() {
    return api.editAvatarInfo(
      avatarInput.value
    ).then((data) => {
      profileImage.src = data.avatar;
    });
  }
  handleSubmit(makeRequest, evt);
}

// Card Delete Function and Delete Modal Event Listeners
function handleDeleteSubmit(evt) {
  evt.preventDefault();
  function makeRequest() {
    return api.deleteCard(
      selectedCardId
    ).then(() => {
      selectedCard.remove();
    });
  }
  handleSubmit(makeRequest, evt, "Deleting...");
}

deleteModalCancelButton.addEventListener("click", () => {
  closeModal(deleteModal);
})

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

deleteModalForm.addEventListener("submit", handleDeleteSubmit);


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

// Add Card Event Button Listener
addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardModalCloseButton.addEventListener("click", () => {
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
  const name = addCardNameInput.value;
  const link = addCardLinkInput.value;
  evt.preventDefault();
  function makeRequest() {
    return api.addCard({ name, link })
    .then((data) => {
      const cardElement = getCardElement(data);
      cardsList.prepend(cardElement);
      addCardModalForm.reset();
      disableButton(addCardModalSubmitButton, settings);
    })
  }
  handleSubmit(makeRequest, evt);
};

addCardModalForm.addEventListener("submit", handleAddCardSubmit);



enableValidation(settings);
