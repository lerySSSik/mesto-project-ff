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


// ---------------------------4.функция-обработчик события клика по оверлею
export function listenerPopup(popup) {
  const closeButton = popup.querySelector('.popup__close');

  if (closeButton) {
    closeButton.addEventListener('click', () => closePopup(popup));
  }

  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
}