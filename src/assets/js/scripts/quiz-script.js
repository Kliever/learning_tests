
let quizOutputResult = '';
let counterOfCorrectAnswers; // счетчик правильных ответов
let wrongAnswerCounter; // счетчик неправильных ответов
//Начать тест заново
testBlockReloadBtn.addEventListener('click', () => {
  correctAnswerBlock.innerText = counterOfCorrectAnswers = 0;
  incorrectAnswerBlock.innerText = wrongAnswerCounter = 0;
  startQuiz(taskArrey);
  testBlockReloadBtn.classList.remove('_visible');
})

//Функция запуска отдельного теста
function startQuiz(quizFiles) {
  //Выводим текущий вопрос от общего количества
  currentQuestion = 1;
  answeredQuizBlock.innerHTML = currentQuestion;
  //Добавляет на страницу общее количество вопросов 
  totalQuizBlock.innerHTML = `${quizFiles.length}`
  //Вывод вопросов и вариантов ответа на страницу
  listOfQuestionsNumbers = randomCicle(quizFiles.length);//Перемешивание вопросов
  outputQuizAndAnswers(quizFiles, listOfQuestionsNumbers);
}

//переход к следующему вопросу по клику кнопки
testBlockNextBtn.addEventListener('click', () => {
  testBlockNextBtn.disabled = true;
  listOfQuestionsNumbers.pop();
  if (listOfQuestionsNumbers.length > 0) {
    outputQuizAndAnswers(taskArrey, listOfQuestionsNumbers);
    //Обновление счетчика
    currentQuestion += 1;
    answeredQuizBlock.innerHTML = currentQuestion;
    //Обнуление описания ответа и пояснения к нему в виде ссылки
    testBlockResultsDescr.innerText = '';
    testBlockResultsLink.innerHTML = '';
  } else {
    testBlockNextBtn.disabled = true;
  }
})

//Функция вывода вопросов и варинатов ответа на страницу
function outputQuizAndAnswers(quizFile, questionsArrey) {
  testAnswerArea.innerHTML = '';
  quizOutputResult = '';

  //Определение и вывод рандомного вопроса в HTML
  let questionNumber = questionsArrey[questionsArrey.length - 1];
  questionQuizArea.innerHTML = `${quizFile[questionNumber]["question"]}`;
  //Вывод ответов в HTML
  let listOfAnswersNumbers = randomCicle(quizFile[questionNumber]["answers"].length) //перемешивание ответов в рандомном порядке
  for (let i = 0; i < quizFile[questionNumber]["answers"].length; i++) {
    quizOutputResult += fillingAnswerArea(quizFile, questionNumber, listOfAnswersNumbers[i]);
  }
  testAnswerArea.innerHTML = quizOutputResult;
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

      //Публикация описания ответа
      testBlockResultsDescr.innerText = questionFile[questionNumber]["explanation"];
      //Публикация ссылки к ответу
      testBlockResultsLink.innerHTML = `<a href="${questionFile[questionNumber]["link"]}" target="_blank">Читать подробнее</a>`;

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















