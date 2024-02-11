export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closePopupOverlayClick);
    document.addEventListener( 'keydown', closePopupWithKey);
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener( 'keydown', closePopupWithKey);
}

function closePopupWithKey(evt) {
    if (evt.key === 'Escape') {
        document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
    }
}

function closePopupOverlayClick(evt) {
    if ( evt.target.classList.contains('popup_is-opened') ) {
        evt.currentTarget.classList.remove('popup_is-opened');
    }openPopup
}