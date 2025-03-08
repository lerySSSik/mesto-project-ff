// функция создания карточки, функции-обработчики событий удаления
// и лайка карточки
import { handleDeleteCard, toggleLikeCard } from './api.js';

export function createCard(cardData, deleteCard, cardLike, handleImageClick, currentUser) {
    const cardTemplate = document.querySelector('#card-template').content; 
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');
    const cardTitle = cardElement.querySelector('.card__title');


    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likeCount.textContent = cardData.likes.length;

    if (cardData.likes.some(like => like._id === currentUser._id)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', () => {
        cardLike(likeButton, likeCount, cardData._id);
    });

    if (cardData.owner._id === currentUser._id) {
        deleteButton.addEventListener('click', () => deleteCard(cardElement, cardData._id));
    } else {
        deleteButton.remove();
    }

    cardImage.addEventListener('click', () => handleImageClick(cardData.link, cardData.name));

    return cardElement;
}

// ---------------------------------------Функция удаления карточки
export function deleteCard(cardElement, cardId) {
    handleDeleteCard(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch(error => {
            console.error('Ошибка при удалении карточки:', error);
        });
}

// ---------------------------------------Функция лайка карточки
export function cardLike(likeButton, likeCountElement, cardId) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');

    toggleLikeCard(cardId, !isLiked)
        .then(updatedCard => {
            likeCountElement.textContent = updatedCard.likes.length;
            likeButton.classList.toggle('card__like-button_is-active', !isLiked);
        })
        .catch(error => {
            console.error('Ошибка при лайке/дизлайке карточки:', error);
        });
}