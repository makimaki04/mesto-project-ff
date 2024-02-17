import { deleteCardById, putLikeCard, romoveLikeCard } from "./api.js";
import { closePopup, openPopup } from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const cardElement = cardTemplate.querySelector(".card");
const imgPopup = document.querySelector(".popup_type_image");
const imgPopupPicture = imgPopup.querySelector(".popup__image");
const imgPopupCaption = imgPopup.querySelector(".popup__caption");
const popupDeleteCard = document.querySelector(".popup_card-delete");
const popupDeleteCardBtn = popupDeleteCard.querySelector(".popup__button");

export function createCard(cardConfig, deleteCard, likeCard, clickImage) {
  const card = cardElement.cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const cardImg = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const likeButton = card.querySelector(".card__like-button");
  const likeCount = card.querySelector(".card__like-counter");

  cardImg.src = cardConfig.link;
  cardImg.alt = cardConfig.name;
  cardTitle.textContent = cardConfig.name;
  likeCount.textContent = cardConfig.likes.length;

  if (cardConfig.owner !== cardConfig.user) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => {
      deleteCard(card, cardConfig.cardID);
    });
  }

  likeButton.addEventListener("click", () => {
    likeCard(likeButton, cardConfig.cardID, likeCount);
  });

  cardConfig.likes.forEach((item) => {
    if (item._id === cardConfig.user) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });

  cardImg.addEventListener("click", () => {
    clickImage(cardImg.src, cardImg.alt, cardTitle.textContent);
  });

  return card;
}

export function clickImage(link, alt, caption) {
  openPopup(imgPopup);
  imgPopupPicture.src = link;
  imgPopupPicture.alt = alt;
  imgPopupCaption.textContent = caption;
}

export function deleteCard(card, cardId) {
  openPopup(popupDeleteCard);

  const confirmDelete = () => {
    card.remove();
    deleteCardById(cardId)
      .then(() => {
        closePopup(popupDeleteCard);
        popupDeleteCardBtn.removeEventListener("click", confirmDelete);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  popupDeleteCardBtn.addEventListener("click", confirmDelete);
}

export function likeCard(likeButton, cardId, likeCount) {
  if (!likeButton.classList.contains("card__like-button_is-active")) {
    putLikeCard(cardId)
      .then((card) => {
        likeCount.textContent = card.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    romoveLikeCard(cardId)
      .then((card) => {
        likeCount.textContent = card.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
