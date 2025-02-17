// функция открытия модального окна, 
// функция закрытия модального окна,
// функция-обработчик события нажатия Esc 
// и функция-обработчик события клика по оверлею;

// ---------------------------------------------------------Функция для открытия попапа карандаш

// Функция открытия модального окна
export function openPopup(editPopup) {
    editPopup.style.display = 'flex'; // Открываем попап
  
    // Добавляем обработчики для закрытия на Esc и клик вне попапа
    document.addEventListener('keydown', handleEscape.bind(null, editPopup));
    document.addEventListener('mousedown', handleClickOutside.bind(null, editPopup));
  }
  
  // Функция закрытия модального окна
  export function closePopup(editPopup) {
    editPopup.style.display = 'none'; // Закрываем попап
  
    // Удаление обработчиков, чтобы они не срабатывали, когда попап закрыт
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('mousedown', handleClickOutside);
  }
  
  // Обработчик нажатия на Esc
  export function handleEscape(editPopup, evt) {
    if (evt.key === 'Escape') {
      closePopup(editPopup);
    }
  }
  
  // Обработчик клика вне попапа
  export function handleClickOutside(editPopup, evt) {
    if (evt.target === editPopup) {
      closePopup(editPopup);
    }
  }
  // ---------------------------------------------------------Функция для открытия попапа Плюсик
// Функция для открытия попапа
// Функция для открытия попапа
export function openPopupPlus(newCardPopup, popupForm) {
  newCardPopup.style.display = 'flex';
  document.addEventListener('keydown', (event) => handleEscClose(event, newCardPopup, popupForm)); // Добавляем обработчик Esc
}

// Функция для закрытия попапа
export function closePopupPlus(newCardPopup, popupForm) {
  newCardPopup.style.display = 'none';
  popupForm.reset(); // Очистка формы
  document.removeEventListener('keydown', (event) => handleEscClose(event, newCardPopup, popupForm)); // Убираем обработчик Esc
}

// Функция для обработки нажатия Esc
export function handleEscClose(event, newCardPopup, popupForm) {
  if (event.key === 'Escape') {
    closePopupPlus(newCardPopup, popupForm);
  }
}
// Функция открытия попапа
