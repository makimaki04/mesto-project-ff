import { nameInput, jobInput, popups, name, description, cardList, placeInput, linkInput } from "./index.js";
import { createCard, deleteCard, likeCard } from "./card.js";

export function openPopup(evt) {
    const targetClassList = evt.target.classList;

    for (const className in popups) {
        if ( targetClassList.contains(className) ) {
            popups[className].classList.add('popup_is-opened');
            popups[className].classList.add('popup_is-animated');
            popups[className].addEventListener( 'click', closePopup );

            if ( className === 'card__image' ) {
                popups[className].querySelector('.popup__image').src = evt.target.src;
                popups[className].querySelector('.popup__caption').textContent = evt.currentTarget.querySelector('.card__title').textContent;
            }
        }
    }

    document.addEventListener('keydown', closePopup);
}

export function closePopup (evt) {
    if ( evt.key === "Escape" || evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__button') ) {
        for ( const popup of Object.values(popups) ) {
            if ( popup.classList.contains('popup_is-opened') ) {
                popup.classList.remove('popup_is-opened');
            }
        }
    }
    
    document.removeEventListener('keydown', closePopup);
}

export function handleFormSubmit(evt) {
    name.textContent = nameInput.value;
    description.textContent = jobInput.value;

    evt.preventDefault();
    closePopup(evt)
}

export function newCardFormSubmit(evt) {
    evt.preventDefault();
    cardList.prepend( createCard(linkInput.value, placeInput.value, deleteCard, likeCard, openPopup) );

    placeInput.value = '';
    linkInput.value = '';
    
    closePopup(evt);
}
