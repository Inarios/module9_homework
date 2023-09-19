//Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;


const parser = new DOMParser();
const xmlDom = parser.parseFromString(xmlString, "text/xml");


const studentElements = xmlDom.getElementsByTagName("student");


const students = [];
for (let i = 0; i < studentElements.length; i++) {
  const studentElement = studentElements[i];
  const nameElement = studentElement.querySelector("name");
  const firstName = nameElement.querySelector("first").textContent;
  const lastName = nameElement.querySelector("second").textContent;
  const age = parseInt(studentElement.querySelector("age").textContent);
  const prof = studentElement.querySelector("prof").textContent;
  const lang = nameElement.getAttribute("lang");

  const student = {
    name: `${firstName} ${lastName}`,
    age,
    prof,
    lang,
  };
  students.push(student);
}


const result = {
  list: students,
};


console.log(result);