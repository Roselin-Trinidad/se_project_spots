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
];
// Profile Elements
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button")
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Edit Modal Element
const editModal = document.querySelector("#edit-modal");
const editFormElement = editModal.querySelector(".modal__form");
const editModalCloseButton = editModal.querySelector(".modal__close-button");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector("#profile-description-input");

// Card Elements
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

// Add Card Elements
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalForm = addCardModal.querySelector(".modal__form")
const addCardLinkInput = addCardModal.querySelector("#add-card-link-input");
const addCardNameInput = addCardModal.querySelector("#add-card-name-input");
const closeAddCardModalButton = addCardModal.querySelector(".modal__close-button");


// Card Element Information Functions
function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardNameElement = cardElement.querySelector(".card__title");

  const cardImageElement = cardElement.querySelector(".card__image");

  cardNameElement.textContent = data.Name;
  cardImageElement.textContent = data.Link;
  cardImageElement.src = data.Link;
  cardImageElement.alt = data.Name;
  return cardElement;
}

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
})

// Opening and Closing Modal Functions
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

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
    Link: addCardLinkInput.value
  };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  closeModal(addCardModal);
}

addCardModalForm.addEventListener("submit", handleAddCardSubmit);