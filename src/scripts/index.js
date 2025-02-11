// @todo: Темплейт карточки
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