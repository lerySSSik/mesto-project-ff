const projectMesto = [
  // меняем исходные пути на переменные
  { name: 'Jacques-Yves Cousteau', link: jacquesImage },
  { name: 'castle', link: castleImage },
  { name: 'sunset', link: sunsetImage },
  { name: 'mountain', link: mountainImage },

  { name: 'add-icon', link: addImage },
  { name: 'Close', link: closeImage },
  { name: 'delete-icon', link: deleteImage },
  { name: 'edit-icon', link: editImage },
  { name: 'like-active', link: likeImage },
  { name: 'like-inactive', link: inactiveImage }
]; 

const jacquesImage = new URL('./images/avatar.jpg', import.meta.url);
const castleImage = new URL('./images/card_1.jpg', import.meta.url);
const sunsetImage = new URL('./images/card_2.jpg', import.meta.url);
const mountainImage = new URL('./images/card_3.jpg', import.meta.url);

const addImage = new URL('./images/add-icon.svg', import.meta.url);
const closeImage = new URL('./images/close.svg', import.meta.url);
const deleteImage = new URL('./images/delete-icon.svg', import.meta.url);
const editImage = new URL('./images/edit-icon.svg', import.meta.url);
const likeImage = new URL('./images/like-active.svg', import.meta.url);
const inactiveImage = new URL('./images/like-inactive.svg', import.meta.url);


import './scripts/cards.js';
import './pages/index.css';
