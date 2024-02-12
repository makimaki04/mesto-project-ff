import { cardElement, imgPopup, popupDeleteCard } from "./index.js";
import { deleteCardById, putLikeCard, romoveLikeCard } from "./api.js";
import { openCardDeletePopup } from "./modal.js";

export function createCard (img, title, deleteCard, likeCard, openPopup, likes, ownerId, userId, cardId) {
    const card = cardElement.cloneNode(true);
    const deleteButton = card.querySelector('.card__delete-button');
    const cardImg = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const likeButton = card.querySelector('.card__like-button');
    const likeCount = card.querySelector('.card__like-counter');

    cardImg.src = img;
    cardImg.alt = title;
    cardTitle.textContent = title;
    likeCount.textContent = likes.length;
    
    if ( ownerId !== userId ) {
        deleteButton.remove();
    } else {
        deleteButton.addEventListener( 'click', () => {
            openCardDeletePopup(popupDeleteCard, card, cardId, deleteCard);
        } );
    }

    likeButton.addEventListener( 'click', () => {
        likeCard(likeButton, cardId, likeCount);
    });

    likes.forEach( item => {
        if (item._id === userId) {
            likeButton.classList.add('card__like-button_is-active');
        }
    })

    cardImg.addEventListener( 'click', () => {
        openPopup(imgPopup);
        imgPopup.querySelector('.popup__image').src = cardImg.src;
        imgPopup.querySelector('.popup__image').alt = cardImg.alt;
        imgPopup.querySelector('.popup__caption').textContent = cardTitle.textContent;
    } );

    return card;
}

export function deleteCard(card, cardId) {
    card.remove();
    deleteCardById(cardId);
}

export function likeCard(likeButton, cardId, likeCount) {
    if (!likeButton.classList.contains('card__like-button_is-active')) {
        putLikeCard(cardId)
            .then( card => {
                likeCount.textContent = card.likes.length;
                likeButton.classList.add('card__like-button_is-active');
            })
    } else {
        romoveLikeCard(cardId)
            .then( card => {
                likeCount.textContent = card.likes.length;
                likeButton.classList.remove('card__like-button_is-active');
            })
    }
}