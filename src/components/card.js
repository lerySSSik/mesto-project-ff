// функция создания карточки, функции-обработчики событий удаления
// и лайка карточки

//-------------------------1. Функция создания карточки
// Функция создания карточки
export function createCard(cardData, deleteCard, likeCard, openPicture) {
    const cardTemplate = document.querySelector('#card-template').content; 
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    likeButton.addEventListener('click', () => likeCard(likeButton));
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
    cardImage.addEventListener('click', () => openPicture(cardData)); 

    return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardElement) {
    if (cardElement) {
        cardElement.remove(); 
    }
}

// Функция лайка карточки
export function cardLike(likeButton) {
    if (!likeButton) {
        return;
    }
    likeButton.classList.toggle('card__like-button_is-active');
}