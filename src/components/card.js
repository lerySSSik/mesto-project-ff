// функция создания карточки, функции-обработчики событий удаления
// и лайка карточки

// ----------------------------------------------LIKE
export function toggleLikeButtons() {
    const likeButtons = document.querySelectorAll('.card__like-button');
    likeButtons.forEach(function (like) {
        like.addEventListener('click', function () {
            like.classList.toggle('card__like-button_is-active');
        });
    });
  }
