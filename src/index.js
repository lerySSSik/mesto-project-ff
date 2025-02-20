// поиск DOM-элементов на странице
// и навешивание на них обработчиков событий; 
// обработчики отправки форм, функция-обработчик 
// события открытия модального окна для редактирования профиля; 
// функция открытия модального окна изображения карточки. 
// Также код, который отвечает за отображение шести карточек при 
// открытии страницы.

import './pages/index.css';
import initialCards from './scripts/cards';
import { createCard, deleteCard, cardLike } from './components/card.js';
import { openPopup, closePopup, listenerPopup } from './components/modal.js';

//---------------------------------------- 1.поиск DOM-элементов на странице
const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const nameInput = popupTypeEdit.querySelector('.popup__input_type_name');
const descrInput = popupTypeEdit.querySelector('.popup__input_type_description');
const profileFormElement = popupTypeEdit.querySelector('.popup__form');


const addNewCard = document.querySelector('.popup_type_new-card');
const popupForm = addNewCard.querySelector('.popup__form');
const cardNameInput = addNewCard.querySelector('.popup__input_type_card-name');
const cardLinkInput = addNewCard.querySelector('.popup__input_type_url');


const imageModal = document.querySelector('.popup_type_image');
const modalImage = imageModal.querySelector('.popup__image');
const modalCaption = imageModal.querySelector('.popup__caption');
 
const editProfileButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');


//---------------------------1. функция открытия модального окна изображения карточки
function openImagePopup(data) {
   
    modalImage.src = data.link;
    modalImage.alt = data.name;
    modalCaption.textContent = data.name;

    openPopup(imageModal);
}

initialCards.forEach((card) => {
    const cardElement = createCard(card, deleteCard, cardLike, openImagePopup);
    placesList.prepend(cardElement);
});

//---------------------------- 3.Функция для заполнения полей формы текущими значениями
function fillProfileInputs() {
    if (nameInput && profileTitle) {
        nameInput.value = profileTitle.textContent;
    }
    if (descrInput && profileDescr) {
        descrInput.value = profileDescr.textContent;
    }
}

//------------------------------4. Обработчик отправки формы редактирования профиля
function handleProfileFormSubmit(event) {
    event.preventDefault(); 

    profileTitle.textContent = nameInput.value;
    profileDescr.textContent = descrInput.value;

    closePopup(popupTypeEdit);
}

//------------------------------5. Открытие попапа редактирования профиля с заполнением полей
editProfileButton.addEventListener('click', () => {
    fillProfileInputs();
    openPopup(popupTypeEdit);
});

// ---------------------------------
addButton.addEventListener('click', () => {
    openPopup(addNewCard);
});


// --------------------------------7.Обработчик отправки формы добавления карточки
function handleCardFormSubmit(event) {
    event.preventDefault(); 

    const newCardName = cardNameInput.value; // Получаем название карточки из input
    const newCardLink = cardLinkInput.value; // Получаем ссылку на изображение из input

    // Создаем объект новой карточки
    const newCard = {
        name: newCardName,
        link: newCardLink,
    };

    // Создаем элемент карточки, передавая все необходимые функции
    const newCardElement = createCard(newCard, deleteCard, cardLike, openImagePopup);

    // Добавляем новую карточку в начало списка
    placesList.prepend(newCardElement); 

    // Закрываем попап и очищаем форму
    if (addNewCard) {
        closePopup(addNewCard);
    }
    if (popupForm) {
        popupForm.reset();
    }
}
// --------------------------------------------------------------------
listenerPopup(popupTypeEdit);
listenerPopup(addNewCard);
listenerPopup(imageModal);
popupForm.addEventListener('submit', handleCardFormSubmit);
profileFormElement.addEventListener('submit', handleProfileFormSubmit);