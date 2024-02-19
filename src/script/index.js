import "/src/pages/index.css";
import { createCard, likeCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enebaleValidation, clearValidation } from "./validation.js";
import {
  getUserData,
  getInitialCards,
  editProfile,
  addNewCard,
  changeAvatar,
  deleteCardById,
} from "./api.js";

const cardList = document.querySelector(".places__list");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");
const profilePopup = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const avatarChangePopup = document.querySelector(".popup_change-avatar");
const popupCloseBtns = document.querySelectorAll(".popup__close");
const profileForm = document.forms["edit-profile"];
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const name = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");
const avatar = document.querySelector(".profile__image");
const newCardForm = document.forms["add-place"];
const placeInput = newCardForm.elements["place-name"];
const linkInput = newCardForm.elements.link;
const popups = document.querySelectorAll(".popup");
const avatarIcon = document.querySelector(".profile__image-container");
const avatarChangeForm = document.forms["avatar-change"];
const avatarLink = avatarChangeForm.elements["avatar-link"];
const imgPopup = document.querySelector(".popup_type_image");
const imgPopupPicture = imgPopup.querySelector(".popup__image");
const imgPopupCaption = imgPopup.querySelector(".popup__caption");
export const validationConfig = {
  formElement: ".popup__form",
  inputElement: ".popup__input",
  submitButtonElement: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  popupErrorElement: "popup__error ",
  errorClass: "popup__error_visible",
};

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, cards]) => {
    setUserData(userData);
    initialCards(cards, userData);
  })
  .catch((err) => {
    console.log(err);
  });

const setUserData = (userData) => {
  name.textContent = userData.name;
  description.textContent = userData.about;
  avatar.src = userData.avatar;
};

const initialCards = (cards, userData) => {
  cards.forEach((card) => {
    const cardConfig = {
      link: card.link,
      name: card.name,
      likes: card.likes,
      owner: card.owner._id,
      user: userData._id,
      cardID: card._id,
    };
    cardList.append(createCard(cardConfig, deleteCard, likeCard, clickImage));
  });
};

popups.forEach((item) => {
  item.classList.add("popup_is-animated");
});

profileEditBtn.addEventListener("click", () => {
  nameInput.value = name.textContent;
  jobInput.value = description.textContent;

  openPopup(profilePopup);
  clearValidation(profileForm, validationConfig);
});

profileAddBtn.addEventListener("click", () => {
  openPopup(popupAddCard);
  clearValidation(newCardForm, validationConfig);

  newCardForm.reset();
});

popupCloseBtns.forEach((item) => {
  item.addEventListener("click", () => {
    closePopup(item.closest(".popup"));
  });
});

function clickImage(link, alt, caption) {
  openPopup(imgPopup);
  imgPopupPicture.src = link;
  imgPopupPicture.alt = alt;
  imgPopupCaption.textContent = caption;
}

// к сожалению, не смог реализовать с попапом подтверждения удаления
// и настапвник ничем не помог
// буду рад, если укажите направленрие в котором думать
function deleteCard(card, cardId) {
  deleteCardById(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

newCardForm.addEventListener("submit", handleNewCardFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt.submitter);
  editProfile(nameInput.value, jobInput.value)
    .then(() => {
      name.textContent = nameInput.value;
      description.textContent = jobInput.value;

      closePopup(evt.target.closest(".popup"));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt.submitter);
  addNewCard(placeInput.value, linkInput.value)
    .then((card) => {
      const cardConfig = {
        link: card.link,
        name: card.name,
        likes: card.likes,
        owner: card.owner._id,
        user: card.owner._id,
        cardID: card._id,
      };
      cardList.prepend(
        createCard(cardConfig, deleteCard, likeCard, clickImage)
      );
      newCardForm.reset();
      clearValidation(newCardForm, validationConfig);
      closePopup(evt.target.closest(".popup"));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
}

function renderLoading(isLoading, button) {
  const loading = "Сохранение...";
  const uploaded = "Сохранить";
  if (isLoading) {
    button.textContent = loading;
  } else {
    button.textContent = uploaded;
  }
}

avatarIcon.addEventListener("click", () => {
  openPopup(avatarChangePopup);
  clearValidation(avatarChangeForm, validationConfig);

  avatarLink.value = "";
});

avatarChangeForm.addEventListener("submit", changeAvatarFormSubmit);

function changeAvatarFormSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, evt.submitter);

  changeAvatar(avatarLink.value)
    .then(() => {
      avatar.src = avatarLink.value;
      closePopup(evt.target.closest(".popup"));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
}

enebaleValidation(validationConfig);
