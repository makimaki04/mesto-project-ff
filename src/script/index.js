import '/src/pages/index.css';
import { createCard, deleteCard, likeCard } from "./card.js";
import { openPopup, handleFormSubmit, newCardFormSubmit } from "./modal.js";
import { initialCards } from "./cards.js";

export const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
export const cardElement = cardTemplate.querySelector('.card');
const profile = document.querySelector('.profile');
const profilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const imgPopup = document.querySelector('.popup_type_image')
export const popups = {
    'profile__edit-button': profilePopup,
    'profile__add-button': addCardPopup,
    'card__image': imgPopup
};
const profileForm = document.forms['edit-profile'];
export const nameInput = profileForm.elements.name;
export const jobInput = profileForm.elements.description;
export const name = document.querySelector('.profile__title');
export const description = document.querySelector('.profile__description')
const newCardForm = document.forms['add-place'];
export const placeInput = newCardForm.elements['place-name'];
export const linkInput = newCardForm.elements.link;

nameInput.value = name.textContent;
jobInput.value = description.textContent;

profile.addEventListener( 'click', openPopup );

profileForm.addEventListener( 'submit', handleFormSubmit );

newCardForm.addEventListener( 'submit', newCardFormSubmit );

initialCards.forEach( item => {
    cardList.append( createCard( item.link, item.name, deleteCard, likeCard, openPopup ) );
} );
