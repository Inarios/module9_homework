/*Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.*/

let buttonStartRequest = document.getElementById('1to10');
let number = document.getElementById('number');
let falseResult = 'число вне диапазона от 1 до 10'
const divResult = document.getElementById('resultPichers');

function useRequest(url, callback, number) {
    if (number.value < 0 || number.value > 10) {
        divResult.innerHTML = falseResult;
    } 
    else {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        if (xhr.status =! 200) {
            console.log('статус = ', xhr.status);
        }
        else {
            let result = JSON.parse(xhr.response);
            console.log(result);
            console.log(url);
            if (callback) {
                callback(result)
            }
        }
    }
    xhr.send();
    }
}




function displayResult(apiData) {
    let cards = '';
    
    apiData.forEach(item => {
      const cardBlock = `
        <div class="card">
          <img
            src="${item.download_url}"
            class="card-image"
          />
          <p>${item.author}</p>
        </div>
      `;
      cards = cards + cardBlock;
    });
    
    divResult.innerHTML = cards;
  }

buttonStartRequest.addEventListener('click', () => {
  useRequest(`https://picsum.photos/v2/list/?limit=${number.value}`, displayResult, number); 
})