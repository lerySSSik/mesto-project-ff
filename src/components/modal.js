// функция открытия модального окна, 
// функция закрытия модального окна,
// функция-обработчик события нажатия Esc 
// и функция-обработчик события клика по оверлею;

// ----------------------------1.Функция для открытия модального окна
export function openPopup(popup) {
  if (popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscape);
  }
}

// ----------------------------2.Функция для закрытия модального окна
export function closePopup(popup) {
  if (popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscape);
  }
}

// ---------------------------3.функция-обработчик события нажатия Esc 

function handleEscape(event) {
  if (event.key === "Escape") {
    const openPopups = document.querySelectorAll('.popup_is-opened');
    openPopups.forEach(popup => closePopup(popup));
  }
}

// ---------------------------4.Закрытие попапов по клику на оверлей
function handleOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
  }
}


export function listenerPopup() {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
      popup.addEventListener('mousedown', handleOverlayClick);
  });
}


// ------------------------------Закрытие на крестик
function handleCloseButtonClick(evt) {
  const popup = evt.target.closest('.popup');
  closePopup(popup);
}

export function addCloseButtonListeners() {
  const closeButtons = document.querySelectorAll('.popup__close');
  closeButtons.forEach(button => {
      button.addEventListener('click', handleCloseButtonClick);
  });
}
