const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function addCard (img, title, func) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').src = img;
    cardElement.querySelector('.card__title').textContent = title;
    cardList.append(cardElement);
    
    deleteButton.addEventListener( 'click', () => {
        const cardListItem = deleteButton.closest('.card');

        func(cardListItem);
    } )
}

function deleteCard(card) {
    card.remove();
}

initialCards.forEach( item => {
    addCard(item.link, item.name, deleteCard);
} );
