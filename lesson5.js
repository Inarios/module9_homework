/*Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:

Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.
Пример. Если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
После получения данных вывести список картинок на экран.

Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).*/



let buttonStartRequest = document.getElementById('requestBtn');
let number1 = document.getElementById('pageNumber');
let number2 = document.getElementById('limit');
const imageContainer = document.getElementById('imageContainer');


buttonStartRequest.addEventListener('click', () => {
    if ((isNaN(number1.value) && isNaN(number2.value))||((number1.value < 1 || number1.value > 10) && (number2.value < 1 || number2.value > 10))) {
        imageContainer.innerText = 'Номер страницы и лимит вне диапазона от 1 до 10';
        return;
      }
    if (isNaN(number1.value)||(number1.value < 1 || number1.value > 10) ) {
        imageContainer.innerText = 'Номер страницы вне диапазона от 1 до 10';
        return;
      }
      if (isNaN(number2.value)||(number2.value < 1 || number2.value > 10) ) {
        imageContainer.innerText = 'лимит вне диапазона от 1 до 10';
        return;
      }

  fetch(`https://picsum.photos/v2/list?page=${number1.value}&limit=${number2.value}`)
  .then(response => response.json())
  .then(data => {
      localStorage.setItem('lastRequest', JSON.stringify({ pageNumber, limit, data }));
      displayImages(data);
  })
  .catch(error => {
      console.error('Error fetching images:', error);
  });
}
)

function displayImages(images) {
    let imagesHTML = '';
    images.forEach(image => {
        imagesHTML += `<img src="${image.download_url}" alt="Picsum Photo">`;
    });
    imageContainer.innerHTML = imagesHTML;
}


const lastRequest = JSON.parse(localStorage.getItem('lastRequest'));
if (lastRequest) {
    pageNumberInput.value = lastRequest.pageNumber;
    limitInput.value = lastRequest.limit;
    displayImages(lastRequest.data);
}