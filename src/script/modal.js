export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  popup.addEventListener("click", closePopupOverlayClick);
  document.addEventListener("keydown", closePopupWithKey);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupWithKey);
  document.removeEventListener("click", closePopupOverlayClick);
}

function closePopupWithKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

function closePopupOverlayClick(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopup(evt.currentTarget);
  }
}
