import './styles/index.css'; 
// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
import jordanImage from './images/jordan.jpg';
import jamesImage from './images/james.jpg';
import bryantImage from './images/bryant.jpg';

const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'Michael Jordan', link: jordanImage },
  { name: 'Lebron James', link: jamesImage },
  { name: 'Kobe Bryant', link: bryantImage },
]; 


// ВТОРОЙ СПОСОБ РАБОТЫ С ИЗОБРАЖЕНИЯМИ(работает без запуска ВЕбпака)
// // теперь картинки можно импортировать,
// // вебпак добавит в переменные правильные пути
// const jordanImage = new URL('./images/jordan.jpg', import.meta.url);
// const jamesImage = new URL('./images/james.jpg', import.meta.url);
// const bryantImage = new URL('./images/bryant.jpg', import.meta.url)

// const whoIsTheGoat = [
//   // меняем исходные пути на переменные
//   { name: 'Michael Jordan', link: jordanImage },
//   { name: 'Lebron James', link: jamesImage },
//   { name: 'Kobe Bryant', link: bryantImage },
// ]; 

