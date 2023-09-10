const questionArea = document.querySelector('.question');
const testAnswerArea = document.querySelector('.test-answer');
const testBlockNextBtn = document.querySelector('.test-block__next-btn');
testBlockNextBtn.disabled = true;
const testBlockResultsTitle = document.querySelector('.test-block__results-title');
const testBlockResultsDescr = document.querySelector('.test-block__results-descr');
const testBlockResultsLink = document.querySelector('.test-block__results-link');
const answeredQuestionsBlock = document.querySelector('.test-block__info-questions-answered');
const totalQuestionsBlock = document.querySelector('.test-block__info-questions-total');
const correctAnswerBlock = document.querySelector('.test-block__info-correct-answer-count');
const incorrectAnswerBlock = document.querySelector('.test-block__info-incorrect-answer-count');
let testOutputResult = '';
let counterOfCorrectAnswers = 0; // счетчик правильных ответов
correctAnswerBlock.innerText = counterOfCorrectAnswers;
let wrongAnswerCounter = 0; // счетчик неправильных ответов
incorrectAnswerBlock.innerText = wrongAnswerCounter;


const juniorJsTest = new XMLHttpRequest();
juniorJsTest.open('GET', "./assets/files/juniorJsTest.json");
juniorJsTest.responseType = 'json';
juniorJsTest.send();

juniorJsTest.onload = () => {
  startQuiz();
};

//Функция запуска отдельного теста
function startQuiz () {
  const juniorJsTestFile = juniorJsTest.response;
  //Выводим текущий вопрос от общего количества
  let currentQuestion = 1;
  answeredQuestionsBlock.innerHTML = currentQuestion;
  //Добавляет на страницу общее количество вопросов 
  totalQuestionsBlock.innerHTML = `${juniorJsTestFile["Test"].length}`
  //Вывод вопросов и вариантов ответа на страницу
  let listOfQuestionsNumbers = randomCicle(juniorJsTestFile["Test"].length);
  outputQuestionsAndAnswers(juniorJsTestFile, listOfQuestionsNumbers);
  //переход к следующему вопросу по клику кнопки
  testBlockNextBtn.addEventListener('click', () => {
    testBlockNextBtn.disabled = true;
    listOfQuestionsNumbers.shift();
    if (listOfQuestionsNumbers.length > 0) {
      outputQuestionsAndAnswers(juniorJsTestFile, listOfQuestionsNumbers);
      //Обновление счетчика
      currentQuestion += 1;
      answeredQuestionsBlock.innerHTML = currentQuestion;
      //Обнуление описания ответа и пояснения к нему в виде ссылки
      testBlockResultsTitle.innerText = '';
      testBlockResultsDescr.innerText = '';
      testBlockResultsLink.innerHTML = '';
    } else {
      testBlockNextBtn.disabled = true;
    }
  })
}

//Функция вывода вопросов и варинатов ответа на страницу
function outputQuestionsAndAnswers(quizFile, questionsArrey) {
  testAnswerArea.innerHTML = '';
  testOutputResult = '';

  console.log(quizFile["Test"][0]["answers"][0]["answer"]);
  //Определение и вывод рандомного вопроса в HTML
  let questionNumber = questionsArrey[0];
  questionArea.innerHTML = `${quizFile["Test"][questionNumber]["question"]}`;
  //Вывод ответов в HTML
  let listOfAnswersNumbers = randomCicle(quizFile["Test"][questionNumber]["answers"].length) //перемешивание ответов в рандомном порядке
  for (let i = 0; i < quizFile["Test"][questionNumber]["answers"].length; i++) {
    testOutputResult += fillingAnswerArea(quizFile, questionNumber, listOfAnswersNumbers[i]);
  }
  testAnswerArea.innerHTML = testOutputResult;
  checkValidResultTest(quizFile, questionNumber, questionsArrey);
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
function checkValidResultTest(questionFile, questionNumber, questionsArrey) {
  let radios = document.querySelectorAll('.test-answer__check');
  radios.forEach((radio) => {
    radio.addEventListener('click', function () {
      // Подсчет правильных и неправильных ответов
      if (this.getAttribute('data-status') === 'true') {
        counterOfCorrectAnswers += 1;
        correctAnswerBlock.innerText = counterOfCorrectAnswers;
      } else {
        wrongAnswerCounter += 1;
        incorrectAnswerBlock.innerText = wrongAnswerCounter;
      }
      //Преверка ответа на правильность c добавлением соответствующего класса
      for (let i = 0; i < radios.length; i++) {
        if (radios[i].getAttribute('data-status') === 'true') {
          radios[i].parentElement.classList.add('_win');
          radios[i].disabled = true;
        } else {
          radios[i].parentElement.classList.add('_lose');
          radios[i].disabled = true;
        }
      }
      //Включение кнопки далее при ответе на вопрос, не включение при ответе на последний вопрос
      if (questionsArrey.length > 1) {
        testBlockNextBtn.disabled = false;
      } else {
        testBlockNextBtn.disabled = true;
      }

      //Результат проверки отевта на правильность с его выводом
      if (this.getAttribute('data-status') === 'true') {
        testBlockResultsTitle.innerText = "Правильный ответ";
      } else {
        testBlockResultsTitle.innerText = "Неправильный ответ";
      }
      //Публикация описания ответа
      testBlockResultsDescr.innerText = questionFile["Test"][questionNumber]["explanation"];
      //Публикация ссылки к ответу
      testBlockResultsLink.innerHTML = `<a href="${questionFile["Test"][questionNumber]["links"]}" target="_blank">Читать подробнее</a>`;
      
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















