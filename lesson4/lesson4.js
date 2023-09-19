/*Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число.

При клике на кнопку происходит следующее:

Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.*/



let buttonStartRequest = document.getElementById('1to10');
let number1 = document.getElementById('number1');
let number2 = document.getElementById('number2');
const imageContainer = document.getElementById('resultPichers');






buttonStartRequest.addEventListener('click', () => {
  if (isNaN(number1.value) || isNaN(number2.value)) {
    imageContainer.innerText = 'Введите корректные числа!';
    return;
  }
  if ((number1.value < 100 || number1.value > 300) || (number2.value < 100 || number2.value > 300)) {
    imageContainer.innerText = 'Одно из чисел вне диапазона от 100 до 300';
    return;
  } 
  fetch(`https://picsum.photos/${number1.value}/${number2.value}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Ошибка при загрузке изображения');
    }
    return response.blob();
  })
  .then(blob => {
    const imgUrl = URL.createObjectURL(blob);
    const imgElement = document.createElement('img');
    imgElement.src = imgUrl;
    imageContainer.innerHTML = '';
    imageContainer.appendChild(imgElement);
  })
  .catch(error => {
    console.error(error.message);
  });
}

)