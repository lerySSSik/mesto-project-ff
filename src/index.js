// поиск DOM-элементов на странице
// и навешивание на них обработчиков событий; 
// обработчики отправки форм, функция-обработчик 
// события открытия модального окна для редактирования профиля; 
// функция открытия модального окна изображения карточки. 
// Также код, который отвечает за отображение шести карточек при 
// открытии страницы.

import './pages/index.css';
import { createCard, deleteCard, cardLike } from './components/card.js';
import { openPopup, closePopup, listenerPopup } from './components/modal.js';
import { enableValidation, clearValidation } from "./components/validation.js";
import { fetchUserData, fetchCards, updateUserData, addCard, handleDeleteCard, updateAvatar } from './components/api.js';
//---------------------------------------- 1.поиск DOM-элементов на странице
const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const descrInput = popupTypeEdit.querySelector('.popup__input_type_description');

const profileFormElement = popupTypeEdit.querySelector('.popup__form');


const addNewCard = document.querySelector('.popup_type_new-card');
const popupForm = addNewCard.querySelector('.popup__form');
const cardNameInput = addNewCard.querySelector('.popup__input_type_card-name');
const cardLinkInput = addNewCard.querySelector('.popup__input_type_url');
const editProfileForm = popupTypeEdit.querySelector('.popup__form');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');

const closeButtons = document.querySelectorAll('.popup__close');
const imageModal = document.querySelector('.popup_type_image');
const modalImage = imageModal.querySelector('.popup__image');
const modalCaption = imageModal.querySelector('.popup__caption');
 
const avatarPopup = document.querySelector('.popup_type_avatar');
const editProfileButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarEditButtonElement = document.querySelector('.profile__image');

let currentUser;

// -----------------обновление аватара
const avatarImageElement = document.querySelector('.profile__avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarForm.querySelector('.popup__input_type_avatar');

async function fetchData() {
    try {
        const [userData, cardsData] = await Promise.all([fetchUserData(), fetchCards()]);
        renderUserData(userData);
        renderCards(cardsData);
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}


export const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

  const submitButtons = {
    editProfile: profileFormElement.querySelector('.popup__button'),
    addCard: editProfileForm.querySelector('.popup__button'),
    avatar: avatarForm.querySelector('.popup__button')
};




//---------------------------1. функция открытия модального окна изображения карточки
function openImagePopup(imageSrc, imageAlt) {
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    modalCaption.textContent = imageAlt;
    openPopup(imageModal);
}

function renderCards(cards) {
    if (!Array.isArray(cards)) {
        console.error('Данные карточек не являются массивом:', cards);
        return;
    }
    cards.forEach(card => {
        const cardElement = createCard(card, deleteCard, cardLike, openImagePopup, currentUser);
        placesList.appendChild(cardElement);
    });
}

//------------------------------5. Открытие попапа редактирования профиля с заполнением полей
editProfileButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    descrInput.value = profileDescr.textContent;
    openPopup(popupTypeEdit);
    clearValidation(popupForm, validationConfig);
});

// ---------------------------------Обработчик открытия попапа добавления карточки
addButton.addEventListener('click', () => {
    editProfileForm.reset();
    clearValidation(editProfileForm, validationConfig);
    openPopup(addNewCard);
});

// Обработчик открытия попапа редактирования аватара
avatarEditButtonElement.addEventListener('click', () => {
    avatarInput.value = '';
    clearValidation(avatarForm, validationConfig);
    openPopup(avatarPopup);
});
//------------------------------4. Изменение с Сохранить на Сохранение...
function toggleButtonState(button, isLoading) {
    if (isLoading) {
        button.textContent = 'Сохранение...';
        button.disabled = true;
        button.classList.add('button_loading');
    } else {
        button.textContent = 'Сохранить';
        button.disabled = false;
        button.classList.remove('button_loading');
    }
}
//------------------------------4. Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const name = nameInput.value.trim();
    const description = descrInput.value.trim();
    toggleButtonState(submitButtons.editProfile, true);

    updateUserData({ name, about: description })
        .then(updatedUserData => {
            renderUserData(updatedUserData);
            closePopup(popupTypeEdit);
        })
        .catch(error => {
            console.error('Ошибка при обновлении профиля:', error);
        })
        .finally(() => {
            toggleButtonState(submitButtons.editProfile, false);
        });
}

function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    const avatarUrl = avatarInput.value.trim();
    if (!avatarUrl) {
        alert('Введите URL для аватара');
        return;
    }
    toggleButtonState(submitButtons.avatar, true);
    updateAvatar(avatarUrl)
        .then(updatedUserData => {
            avatarImageElement.src = updatedUserData.avatar;
            closePopup(avatarPopup);
        })
        .catch(error => {
            console.error('Ошибка при обновлении аватара:', error);
            alert('Ошибка при обновлении аватара');
        })
        .finally(() => {
            toggleButtonState(submitButtons.avatar, false);
        });
}


// --------------------------------7.Обработчик отправки формы добавления карточки
function handleCardFormSubmit(event) {
    event.preventDefault();
    const cardName = cardNameInput.value.trim();
    const cardLink = cardLinkInput.value.trim();
    if (!cardName || !cardLink) return;

    toggleButtonState(submitButtons.addCard, true);
    const newCard = { name: cardName, link: cardLink };
    addCard(newCard)
        .then(addedCard => {
            const cardElement = createCard(addedCard, deleteCard, cardLike, openImagePopup, currentUser);
            placesList.prepend(cardElement);
            popupForm.reset();
            closePopup(addNewCard);
        })
        .catch(error => {
            console.error('Ошибка при добавлении карточки:', error);
        })
        .finally(() => {
            toggleButtonState(submitButtons.addCard, false);
        });


} // Задержка 2 секунды для симуляции асинхронной операции
function renderUserData(userData) {
    profileTitle.textContent = userData.name;
    profileDescr.textContent = userData.about;
    avatarImageElement.src = userData.avatar;
    currentUser = userData;
}

closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const popup = button.closest('.popup');
      if (popup) {
        closePopup(popup);
      }
    });
  });

// --------------------------------------------------------------------
avatarForm.addEventListener('submit', handleAvatarFormSubmit);
listenerPopup(popupTypeEdit);
listenerPopup(addNewCard);
listenerPopup(imageModal);
popupForm.addEventListener('submit', handleCardFormSubmit);
editProfileForm.addEventListener('submit', handleProfileFormSubmit);
openPopup();
closePopup();
document.addEventListener("DOMContentLoaded", () => enableValidation(validationConfig));
fetchData();