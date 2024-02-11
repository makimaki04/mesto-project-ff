import { cardElement, imgPopup } from "./index.js";

export function createCard (img, title, deleteCard, likeCard, openPopup) {
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
    } );

    likeButton.addEventListener( 'click', likeCard );

    cardImg.addEventListener( 'click', () => {
        openPopup(imgPopup);
        imgPopup.querySelector('.popup__image').src = cardImg.src;
        imgPopup.querySelector('.popup__image').alt = cardImg.alt;
        imgPopup.querySelector('.popup__caption').textContent = cardTitle.textContent;
    } );

    return card;
}

export function deleteCard(card) {
    card.remove();
}

export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}
