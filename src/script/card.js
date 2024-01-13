import { cardElement } from "./index.js";
import { openPopup } from "./modal.js";

export function createCard (img, title, deleteCard, likeCard) {
    const card = cardElement.cloneNode(true);
    const deleteButton = card.querySelector('.card__delete-button');
    const cardImg = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const likeButton = card.querySelector('.card__like-button');

    cardImg.src = img;
    cardImg.alt = title;
    cardTitle.textContent = title;
    
    deleteButton.addEventListener( 'click', () => {
        deleteCard(card);
    } )

    likeButton.addEventListener( 'click', likeCard );

    card.addEventListener( 'click', openPopup );

    return card;
}

export function deleteCard(card) {
    card.remove();
}

export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}
