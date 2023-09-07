// ПРоверка поддержки webpackStream, добавление класса webp или no-webp для HTML 
function isWebp() {
  // Проверка поддержки WebP 
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"
  }
  //Добавление класса _webp или _no-webp для HTML
  testWebP(function (support) {
    let className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
  });
}

isWebp();
const questionArea = document.querySelector('.question');
const testAnswerArea = document.querySelector('.test-answer');
const testBlockNextBtn = document.querySelector('.test-block__next-btn');
const testBlockResultsTitle = document.querySelector('.test-block__results-title');
const testBlockResultsDescr = document.querySelector('.test-block__results-descr');
let testOutputResult = '';



const juniorJsTest = new XMLHttpRequest();
juniorJsTest.open('GET', "./assets/files/juniorJsTest.json");
juniorJsTest.responseType = 'json';
juniorJsTest.send();

juniorJsTest.onload = startTest;
//Функция запуска отдельного теста
function startTest() {
  const juniorJsTestFile = juniorJsTest.response;
  testAnswerArea.innerHTML = '';
  testOutputResult = '';
  //
  console.log(juniorJsTestFile["Test"][0]["answers"][0]["answer"]);
  //Определение и вывод вопроса в HTML
  let questionNumber = calcRandomNumber(juniorJsTestFile["Test"].length);
  questionArea.innerHTML = `${juniorJsTestFile["Test"][questionNumber]["question"]}`;
  //Вывод ответов в HTML
  let listOfQuestionNumbers = randomCicle(juniorJsTestFile["Test"][questionNumber]["answers"].length) //перемешивание вопросов в рандомном порядке
  for (let i = 0; i < juniorJsTestFile["Test"][questionNumber]["answers"].length; i++) {
    testOutputResult += fillingAnswerArea(juniorJsTestFile, questionNumber, listOfQuestionNumbers[i]);
  }
  testAnswerArea.innerHTML = testOutputResult;
  checkValidResultTest(juniorJsTestFile, questionNumber);
}
//функция генерации рандомного числа
function calcRandomNumber(maxNumber) {
  let randomNumber = Math.floor(Math.random() * maxNumber);
  return randomNumber;
}
//Функция генерации кода для одного ответа
function fillingAnswerArea(questionFile, questionNumber, responseNumber) {
  return `<label class="test-answer__checkbox checkbox"><input class="test-answer__check checkbox__check" type="radio" name="answer" data-status="${questionFile["Test"][questionNumber]["answers"][responseNumber]['status']}"><span class="checkbox__box"></span><span class="checkbox__info">${questionFile["Test"][questionNumber]["answers"][responseNumber]['answer']}</span></label>`;
}
//функция проверки ответа на правильность с последующим выводом результата
function checkValidResultTest(questionFile, questionNumber) {
  let radios = document.querySelectorAll('.test-answer__check');
  radios.forEach((radio) => {
    radio.addEventListener('click', function () {
      //Преврка ответа на правильность
      for (let i = 0; i < radios.length; i++) {
        if (radios[i].getAttribute('data-status') === 'true') {
          radios[i].parentElement.classList.add('_win');
          radios[i].disabled = true;
        } else {
          radios[i].parentElement.classList.add('_lose');
          radios[i].disabled = true;
        }
      }
      //Результат проверки отевта на правильность с его выводом
      if (this.getAttribute('data-status') === 'true') {
        testBlockResultsTitle.innerText = "Правильный ответ";
      } else {
        testBlockResultsTitle.innerText = "Неправильный ответ";
      }
      //Публикуем пояснение к ответу
      testBlockResultsDescr.innerText = questionFile["Test"][questionNumber]["explanation"];
    })
  })

}
//Функция цикла с рандомным проходом
function randomCicle (maxNumber) {
  let numberArr = [];
  for (let i = 0; i < maxNumber; i++) {
    numberArr.push(i);
  }
  let randomNumberArr = numberArr.sort(() => Math.random() - 0.5); 
  return randomNumberArr;
}
//Нажатие на кнопку "Далее"
testBlockNextBtn.addEventListener('click', () => {
  startTest();
})