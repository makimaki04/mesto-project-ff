import { imgPopup, profilePopup, popupAddCard } from "./index.js";

export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closePopupOverlayClick);
    document.addEventListener( 'keydown', closePopupWithKey);
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
}

function closePopupWithKey(evt) {
    if (evt.key === 'Escape') {
        profilePopup.classList.remove('popup_is-opened');
        popupAddCard.classList.remove('popup_is-opened');
        imgPopup.classList.remove('popup_is-opened');
    }

    document.removeEventListener( 'keydown', closePopupWithKey)
}

function closePopupOverlayClick(evt) {
    if ( evt.target.classList.contains('popup_is-opened') ) {
        evt.currentTarget.classList.remove('popup_is-opened');
    }
}