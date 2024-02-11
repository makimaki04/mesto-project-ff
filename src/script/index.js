import '/src/pages/index.css';
import { createCard, deleteCard, likeCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { initialCards } from "./cards.js";
import { enebaleValidation, clearValidation } from './validation.js';

export const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
export const cardElement = cardTemplate.querySelector('.card');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');
export const profilePopup = document.querySelector('.popup_type_edit');
export const popupAddCard = document.querySelector('.popup_type_new-card');
export const imgPopup = document.querySelector('.popup_type_image');
const popupCloseBtns = document.querySelectorAll('.popup__close');
const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const name = document.querySelector('.profile__title');
const description = document.querySelector('.profile__description');
const newCardForm = document.forms['add-place'];
const placeInput = newCardForm.elements['place-name'];
const linkInput = newCardForm.elements.link;
const popups = document.querySelectorAll('.popup');
export const validationConfig = {
    formElement: '.popup__form',
    inputElement: '.popup__input',
    submitButtonElement: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    popupErrorElement: 'popup__error ',
    errorClass: 'popup__error_visible'
};

popups.forEach( item => {
    item.classList.add('popup_is-animated');
} )

profileEditBtn.addEventListener( 'click', () => {
    nameInput.value = name.textContent; 
    jobInput.value = description.textContent;
    
    openPopup(profilePopup);
    clearValidation(profileForm, validationConfig);
} );

profileAddBtn.addEventListener( 'click', () => {
    openPopup(popupAddCard);
    clearValidation(newCardForm, validationConfig);

    placeInput.value = '';
    linkInput.value = '';
} );

popupCloseBtns.forEach( item => {
    item.addEventListener( 'click', () => {
        closePopup( item.closest('.popup') );
    } )
} )

profileForm.addEventListener( 'submit', handleProfileFormSubmit );

newCardForm.addEventListener( 'submit', handleNewCardFormSubmit );

function handleProfileFormSubmit(evt) {
    name.textContent = nameInput.value;
    description.textContent = jobInput.value;
    
    evt.preventDefault();
    closePopup( evt.target.closest('.popup') );
}

function handleNewCardFormSubmit(evt) {
    evt.preventDefault();
    cardList.prepend( createCard(linkInput.value, placeInput.value, deleteCard, likeCard, openPopup) );

    placeInput.value = '';
    linkInput.value = '';
    
    clearValidation(newCardForm, validationConfig);
    closePopup( evt.target.closest('.popup') );
}

initialCards.forEach( item => {
    cardList.append( createCard( item.link, item.name, deleteCard, likeCard, openPopup ) );
} );

enebaleValidation(validationConfig);