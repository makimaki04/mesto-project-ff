const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.card');

function createCard (img, title, deleteCard) {
    const card = cardElement.cloneNode(true);
    const deleteButton = card.querySelector('.card__delete-button');
    const cardImg = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');

    cardImg.src = img;
    cardImg.alt = title;
    cardTitle.textContent = title;

    deleteButton.addEventListener( 'click', () => {
        deleteCard(card);
    } )

    return card;
}

function deleteCard(card) {
    card.remove();
}

initialCards.forEach( item => {
    cardList.append(createCard(item.link, item.name, deleteCard));
} );
