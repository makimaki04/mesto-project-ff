import { putLikeCard, romoveLikeCard } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;
const cardElement = cardTemplate.querySelector(".card");

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
