const questionArea = document.querySelector('.question');
const testAnswerArea = document.querySelector('.quiz-answer');
const testBlockNextBtn = document.querySelector('.quiz-block__next-btn');
testBlockNextBtn.disabled = true;
const testBlockReloadBtn = document.querySelector('.quiz-block__reload-btn');
testBlockReloadBtn.disabled = true;
const testBlockResultsTitle = document.querySelector('.quiz-block__results-title');
const testBlockResultsDescr = document.querySelector('.quiz-block__results-descr');
const testBlockResultsLink = document.querySelector('.quiz-block__results-link');
const answeredQuestionsBlock = document.querySelector('.quiz-block__info-questions-answered');
const totalQuestionsBlock = document.querySelector('.quiz-block__info-questions-total');
const correctAnswerBlock = document.querySelector('.quiz-block__info-correct-answer-count');
const incorrectAnswerBlock = document.querySelector('.quiz-block__info-incorrect-answer-count');
let testOutputResult = '';
let counterOfCorrectAnswers; // счетчик правильных ответов
let wrongAnswerCounter; // счетчик неправильных ответов

let juniorJsLoad = false;
let middleJsLoad = false;
let seniorJsLoad = false;

//Загрузка и инициализация файлов
const juniorJsQuizFile = new XMLHttpRequest();
juniorJsQuizFile.open('GET', "./assets/files/juniorJsQuiz.json");
juniorJsQuizFile.responseType = 'json';
juniorJsQuizFile.send();
let juniorJsQuiz = false;
juniorJsQuizFile.onload = () => {
  juniorJsQuiz = juniorJsQuizFile.response;
  juniorJsLoad = true;
};

const middleJsQuizFile = new XMLHttpRequest();
middleJsQuizFile.open('GET', "./assets/files/middleJsQuiz.json");
middleJsQuizFile.responseType = 'json';
middleJsQuizFile.send();
let middleJsQuiz = false;
middleJsQuizFile.onload = () => {
  middleJsQuiz = middleJsQuizFile.response;
  middleJsLoad = true;
}

const seniorJsQuizFile = new XMLHttpRequest();
seniorJsQuizFile.open('GET', "./assets/files/seniorJsQuiz.json");
seniorJsQuizFile.responseType = 'json';
seniorJsQuizFile.send();
let seniorJsQuiz = false;
seniorJsQuizFile.onload = () => {
  seniorJsQuiz = seniorJsQuizFile.response;
  seniorJsLoad = true;
}

//ПРоверка, что файлы с заданиями загружены и можно начинать работу
let checkLoadFile = setInterval(() => {
  if (juniorJsLoad, middleJsLoad, seniorJsLoad) {

    clearTimeout(checkLoadFile);
  }
}, 200);

//Начать тест заново
testBlockReloadBtn.addEventListener('click', () => {
  correctAnswerBlock.innerText = counterOfCorrectAnswers = 0;
  incorrectAnswerBlock.innerText = wrongAnswerCounter = 0;
  testBlockResultsTitle.innerText = '';
  testBlockResultsTitle.classList.remove('_red');
  testBlockResultsTitle.classList.remove('_green');
  startQuiz(taskArrey);
  testBlockReloadBtn.classList.remove('_visible');
})

//Функция запуска отдельного теста
function startQuiz(quizFiles) {
  //Выводим текущий вопрос от общего количества
  let currentQuestion = 1;
  answeredQuestionsBlock.innerHTML = currentQuestion;
  //Добавляет на страницу общее количество вопросов 
  totalQuestionsBlock.innerHTML = `${quizFiles.length}`
  //Вывод вопросов и вариантов ответа на страницу
  let listOfQuestionsNumbers = randomCicle(quizFiles.length);
  outputQuestionsAndAnswers(quizFiles, listOfQuestionsNumbers);
  //переход к следующему вопросу по клику кнопки
  testBlockNextBtn.addEventListener('click', () => {
    testBlockNextBtn.disabled = true;
    listOfQuestionsNumbers.shift();
    if (listOfQuestionsNumbers.length > 0) {
      outputQuestionsAndAnswers(quizFiles, listOfQuestionsNumbers);
      //Обновление счетчика
      currentQuestion += 1;
      answeredQuestionsBlock.innerHTML = currentQuestion;
      //Обнуление описания ответа и пояснения к нему в виде ссылки
      testBlockResultsTitle.innerText = '';
      testBlockResultsTitle.classList.remove('_red');
      testBlockResultsTitle.classList.remove('_green');
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

  //Определение и вывод рандомного вопроса в HTML
  let questionNumber = questionsArrey[0];
  questionArea.innerHTML = `${quizFile[questionNumber]["question"]}`;
  //Вывод ответов в HTML
  let listOfAnswersNumbers = randomCicle(quizFile[questionNumber]["answers"].length) //перемешивание ответов в рандомном порядке
  for (let i = 0; i < quizFile[questionNumber]["answers"].length; i++) {
    testOutputResult += fillingAnswerArea(quizFile, questionNumber, listOfAnswersNumbers[i]);
  }
  testAnswerArea.innerHTML = testOutputResult;
  checkValidResultTest(quizFile, questionNumber, questionsArrey);
}
//Функция генерации кода для одного ответа
function fillingAnswerArea(questionFile, questionNumber, responseNumber) {
  return `<label class="quiz-answer__checkbox checkbox"><input class="quiz-answer__check checkbox__check" type="radio" name="answer" data-status="${questionFile[questionNumber]["answers"][responseNumber]['status']}"><span class="checkbox__box"></span><span class="checkbox__info">${questionFile[questionNumber]["answers"][responseNumber]['answer']}</span></label>`;
}
//функция проверки ответа на правильность с последующим выводом результата
function checkValidResultTest(questionFile, questionNumber, questionsArrey) {
  let radios = document.querySelectorAll('.quiz-answer__check');
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
        testBlockReloadBtn.disabled = false;
        testBlockReloadBtn.classList.add('_visible');
      }

      //Результат проверки отевта на правильность с его выводом
      if (this.getAttribute('data-status') === 'true') {
        testBlockResultsTitle.innerText = "Ответ правильный";
        testBlockResultsTitle.classList.remove('_red');
        testBlockResultsTitle.classList.add('_green');
      } else {
        testBlockResultsTitle.innerText = "Ответ неправильный";
        testBlockResultsTitle.classList.remove('_green');
        testBlockResultsTitle.classList.add('_red');
      }
      //Публикация описания ответа
      testBlockResultsDescr.innerText = questionFile[questionNumber]["explanation"];
      //Публикация ссылки к ответу
      testBlockResultsLink.innerHTML = `<a href="${questionFile[questionNumber]["links"]}" target="_blank">Читать подробнее</a>`;

    })
  })

}
//Функция цикла с рандомным проходом
function randomCicle(maxNumber) {
  let numberArr = [];
  for (let i = 0; i < maxNumber; i++) {
    numberArr.push(i);
  }
  let randomNumberArr = numberArr.sort(() => Math.random() - 0.5);
  return randomNumberArr;
}















