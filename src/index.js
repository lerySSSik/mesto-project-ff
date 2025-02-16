// поиск DOM-элементов на странице
// и навешивание на них обработчиков событий; 
// обработчики отправки форм, функция-обработчик 
// события открытия модального окна для редактирования профиля; 
// функция открытия модального окна изображения карточки. 
// Также код, который отвечает за отображение шести карточек при 
// открытии страницы.


import './pages/index.css';
import initialCards from './scripts/cards';
import {toggleLikeButtons}  from './components/card';
import {openPopup, closePopup, handleEscape, handleClickOutside } from './components/modal'

// // @todo: Темплейт карточки                                            ЭТА ЗАЛУПА ОСТАЕТСЯ НА СВОЕМ МЕСТЕ!!!!!!
const galleryContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard(name,link) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

// сслыка на изображение
    const cardImage = cardElement.querySelector('.card__image');

 // заполним данные
    cardElement.querySelector('.card__title').textContent = name;
    cardImage.setAttribute('src', link);
    cardImage.setAttribute('alt', name);

// обработчик клика по корзинке удаления
    const buttonDelete = cardElement.querySelector('.card__delete-button');
    buttonDelete.addEventListener('click', handDeleteCard);

    return cardElement;
}

// @todo: Функция удаления карточки

function handDeleteCard(event) {
    const card = event.target.closest('.places__item');
    card.remove();
  }
// @todo: Вывести карточки на страницу

  function renderCard(cardElement) {
    galleryContainer.append(cardElement);
  }

  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData.name, cardData.link);
    renderCard(cardElement);
  });                                                            
                                                                          //  ЭТА ЗАЛУПА ТУТ ЗАКАНЧИВАЕТСЯ !!!!!!


// // ----------------------------------------------------Модалка открытые и закрытие 
document.addEventListener('DOMContentLoaded', function () {

    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');
  
    // Элементы попапа
    const editButton = document.querySelector('.profile__edit-button'); // Кнопка открытия попапа
    const editPopup = document.querySelector('.popup_type_edit'); // Сам попап
    const closeButton = editPopup.querySelector('.popup__close'); // Кнопка закрытия внутри попапа
    const popupForm = editPopup.querySelector('.popup__form'); // Форма попапа
    const nameInput = editPopup.querySelector('.popup__input_type_name'); // Поле ввода имени
    const descriptionInput = editPopup.querySelector('.popup__input_type_description'); // Поле ввода занятия
  
    // Обработчик отправки формы
    function handleFormSubmit(evt) {
      evt.preventDefault(); // Отменяем стандартное поведение формы
      profileTitle.textContent = nameInput.value; // Обновляем имя
      profileDescription.textContent = descriptionInput.value; // Обновляем занятие
      closePopup(editPopup); // Закрываем попап
    }
  
    // Слушатели событий
    editButton.addEventListener('click', () => openPopup(editPopup)); // Открытие попапа
    closeButton.addEventListener('click', () => closePopup(editPopup)); // Закрытие попапа
    popupForm.addEventListener('submit', handleFormSubmit); // Сохранение изменений
  });

// // --------------------------------------------------------------------------модалка на +
// Находим элементы
// document.addEventListener('DOMContentLoaded', function () {
//   const profileButton = document.querySelector('.profile__add-button'); // Кнопка открытия попапа
//   const newCardPopup = document.querySelector('.popup_type_new-card'); // Попап
//   const AutClose = newCardPopup.querySelector('.popup__close'); // Кнопка закрытия попапа
//   const form = newCardPopup.querySelector('.popup__form'); // Форма
//   const cardsContainer = document.querySelector('.places__list'); // Контейнер для карточек

//   // Функция для открытия попапа
//   function openCardPopup() {
//     newCardPopup.classList.add('popup_is-opened'); // Добавляем класс для отображения попапа
//     document.addEventListener('keydown', closeEsc); // Закрытие по Esc
//     document.addEventListener('mousedown', closePopup); // Закрытие по клику вне попапа
//   }

//   // Функция для закрытия попапа
//   function closeCardPopup() {
//     newCardPopup.classList.remove('popup_is-opened'); // Убираем класс для скрытия попапа
//     document.removeEventListener('keydown', closeEsc); // Убираем обработчик Esc
//     document.removeEventListener('mousedown', closePopup); // Убираем обработчик клика вне попапа
//   }

//   // Функция для закрытия попапа по Esc
//   function closeEsc(event) {
//     if (event.key === 'Escape') {
//       closeCardPopup();
//     }
//   }

//   // Функция для закрытия попапа по клику вне его области
//   function closePopup(event) {
//     if (event.target === newCardPopup) {
//       closeCardPopup();
//     }
//   }

//   // Обработчик отправки формы
//   function handleFormSubmit(event) {
//     event.preventDefault(); // Отменяем стандартное поведение формы

//     const placeName = form.elements['place-name'].value; // Получаем значение поля "Название"
//     const imageLink = form.elements['link'].value; // Получаем значение поля "Ссылка на картинку"

//     console.log('Название:', placeName);
//     console.log('Ссылка на картинку:', imageLink);

//     // Создаем новую карточку
//     const newCard = generateCard(placeName, imageLink);

//     // Добавляем карточку в контейнер
//     if (cardsContainer && newCard) {
//       cardsContainer.prepend(newCard); // Добавляем в начало списка
//     }

//     // Закрываем попап
//     closeCardPopup();

//     // Очищаем форму
//     form.reset();
//   }

//   // Функция для создания карточки
//   function generateCard(name, link) {
//     // Находим шаблон карточки
//     const cardTemplate = document.getElementById('card-template');
//     if (!cardTemplate) {
//       console.error('Шаблон карточки не найден!');
//       return null;
//     }

//     // Клонируем содержимое шаблона
//     const cardElement = cardTemplate.content.querySelector('.places__item').cloneNode(true);

//     // Заполняем карточку данными
//     const cardImage = cardElement.querySelector('.card__image');
//     const cardTitle = cardElement.querySelector('.card__title');

//     if (cardImage && cardTitle) {
//       cardImage.src = link; // Устанавливаем ссылку на изображение
//       cardImage.alt = name; // Устанавливаем альтернативный текст
//       cardTitle.textContent = name; // Устанавливаем название
//     } else {
//       console.error('Элементы карточки не найдены!');
//       return null;
//     }

//     return cardElement;
//   }

//   // Добавляем обработчики событий
//   profileButton.addEventListener('click', openCardPopup); // Открытие попапа
//   AutClose.addEventListener('click', closeCardPopup); // Закрытие попапа
//   form.addEventListener('submit', handleFormSubmit); // Обработка отправки формы
// });


// // ----------------------------------------------------------------------карточка открыть
// // ---------------------------------------------------------редактируем имя и еще что-то 
// // Находим все изображения в карточках
// const cardImages = document.querySelectorAll('.card__image');
// const formElement = document.querySelector('.popup__form');
// const nameInput = formElement.querySelector('.popup__input_type_name'); // Поле "Имя"
// const jobInput = formElement.querySelector('.popup__input_type_description'); // Поле "Занятие"


// // Находим попап и его элементы
// const imagePopup = document.querySelector('.popup_type_image');
// const popupImage = imagePopup.querySelector('.popup__image');
// const popupCaption = imagePopup.querySelector('.popup__caption');
// const popupClose = imagePopup.querySelector('.popup__close');

// // Добавляем обработчик события для каждого изображения
// cardImages.forEach(function (image) {
//   image.addEventListener('click', function () {
//     // Устанавливаем источник и описание для изображения в попапе
//     popupImage.src = image.src;
//     popupImage.alt = image.alt;
//     popupCaption.textContent = image.alt; // Используем alt как подпись

//     // Открываем попап
//     imagePopup.classList.add('popup_is-opened');

//     // Закрытие попапа по клику на кнопку закрытия
//     popupClose.addEventListener('click', closeImagePopup);

//     // Закрытие попапа по клику вне изображения
//     imagePopup.addEventListener('click', function (event) {
//       if (event.target === imagePopup) {
//         closeImagePopup();
//       }
//     });

//     // Закрытие попапа по нажатию Esc
//     document.addEventListener('keydown', function (event) {
//       if (event.key === 'Escape') {
//         closeImagePopup();
//       }
//     });
//   });
// });

// // Функция для закрытия попапа
// function closeImagePopup() {
//   imagePopup.classList.remove('popup_is-opened');

//   // Удаляем обработчики событий, чтобы избежать утечек памяти
//   popupClose.removeEventListener('click', closeImagePopup);
//   imagePopup.removeEventListener('click', closeImagePopup);
//   document.removeEventListener('keydown', closeImagePopup);
// }
// // Обработчик «отправки» формы
// function sendForms(evt) {
//   evt.preventDefault(); // Отменяем стандартную отправку формы

//   // Получаем значения полей из свойства value
//   const nameValue = nameInput.value; // Значение поля "Имя"
//   const jobValue = jobInput.value; // Значение поля "Занятие"

//   // Проверяем существование элементов
//   const profileName = document.querySelector('.profile__title'); // Элемент для имени
//   const profileJob = document.querySelector('.profile__description'); // Элемент для занятия

//   // Вставляем новые значения только если элементы найдены
//   if (profileName) {
//       profileName.textContent = nameValue; // Обновляем имя
//   }

//   if (profileJob) {
//       profileJob.textContent = jobValue; // Обновляем занятие
//   }
// }

// // Прикрепляем обработчик к форме
// if (formElement) { // Убедимся, что форма существует
//   formElement.addEventListener('submit', sendForms);
// }
// // --------------------------------------------------------------------------редактировать

// // Находим форму и контейнер для карточек
// const newCardForm = document.querySelector('.popup_type_new-card .popup__form');
// const cardsContainer = document.querySelector('.places__list'); // Исправлено: контейнер для карточек

// // Обработчик отправки формы
// function processNewCardSubmission(evt) {
//     evt.preventDefault(); // Отменяем стандартную отправку формы

//     // Получаем значения из формы
//     const placeName = newCardForm.elements['place-name'].value; // Название места
//     const imageLink = newCardForm.elements['link'].value; // Ссылка на изображение

//     // Создаем новую карточку
//     const newCard = generateCard(placeName, imageLink);

//     // Добавляем карточку в контейнер
//     if (cardsContainer && newCard) {
//         cardsContainer.prepend(newCard); // Добавляем в начало списка
//     }

//     // Закрываем попап
//     hidePopup(newCardForm.closest('.popup'));

//     // Очищаем форму
//     newCardForm.reset();
// }

// // Функция для создания карточки
// function generateCard(name, link) {
//     // Находим шаблон карточки
//     const cardTemplate = document.querySelector('#card-template');
//     if (!cardTemplate) {
//         console.error('Шаблон карточки не найден!');
//         return null;
//     }

//     // Клонируем содержимое шаблона
//     const cardElement = cardTemplate.content.querySelector('.places__item').cloneNode(true);

//     // Заполняем карточку данными
//     const cardImage = cardElement.querySelector('.card__image');
//     const cardTitle = cardElement.querySelector('.card__title');

//     if (cardImage && cardTitle) {
//         cardImage.src = link; // Устанавливаем ссылку на изображение
//         cardImage.alt = name; // Устанавливаем альтернативный текст
//         cardTitle.textContent = name; // Устанавливаем название
//     } else {
//         console.error('Элементы карточки не найдены!');
//         return null;
//     }

//     return cardElement;
// }

// // Функция для закрытия попапа
// function hidePopup(popup) {
//     if (popup) {
//         popup.classList.remove('popup_is-opened');
//     }
// }

// // Прикрепляем обработчик к форме
// if (newCardForm) {
//     newCardForm.addEventListener('submit', processNewCardSubmission);
// }
