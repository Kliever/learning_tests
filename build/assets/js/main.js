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

const body = document.querySelector('body');
const startBlock = document.querySelector('.start-block');
const startBtn = document.querySelector('.start-block__start-btn');
const typesOfTasks = document.querySelector('.js-types-of-tasks');
const typesOfTasksBtns = typesOfTasks.querySelectorAll('.js-types-of-tasks__item');
const quizBlock = document.querySelector('.quiz-block');
const headerBackBtn = document.querySelector('.header__back-btn');

const questionsSections = document.querySelector('.js-types-of-questions');
const questionsSectionsBtns = questionsSections.querySelectorAll('.js-types-of-questions__item');

const questionQuizArea = document.querySelector('.quiz-block__question');
const testAnswerArea = document.querySelector('.quiz-answer');
const testBlockNextBtn = document.querySelector('.quiz-block__next-btn');
testBlockNextBtn.disabled = true;
const testBlockReloadBtn = document.querySelector('.quiz-block__reload-btn');
testBlockReloadBtn.disabled = true;
const testBlockResultsTitle = document.querySelector('.quiz-block__results-title');
const testBlockResultsDescr = document.querySelector('.quiz-block__results-descr');
const testBlockResultsLink = document.querySelector('.quiz-block__results-link');
const quizBlockSerialNumber = document.querySelector('.quiz-block__info-num-question');
const answeredQuizBlock = document.querySelector('.quiz-block__info-questions-answered');
const totalQuizBlock = document.querySelector('.quiz-block__info-questions-total');
const correctAnswerBlock = document.querySelector('.quiz-block__info-correct-answer-count');
const incorrectAnswerBlock = document.querySelector('.quiz-block__info-incorrect-answer-count');
const mainBlock = document.querySelector('.main');
const loadingBlock = document.querySelector('.loading');

//questions block
const questionsBlock = document.querySelector('.questions-block');
const answeredBlockSerialNumber = document.querySelector('.questions-block__info-num-question');
const answeredQuestionsBlock = document.querySelector('.questions-block__info-questions-answered');
const totalQuestionsBlock = document.querySelector('.questions-block__info-questions-total');
const questionArea = document.querySelector('.questions-block__question');
const questionsResultDescr = document.querySelector('.questions-block__results-descr');
const questionsResultLink = document.querySelector('.questions-block__results-link');
const resultQuestionsBtn = document.querySelector('.questions-block__answer-btn');
const questionsNextBtn = document.querySelector('.questions-block__next-btn');
const questionsReloadBtn = document.querySelector('.questions-block__reload-btn');

//admin-block
const admin = body.classList.contains('_admin');
const questionNumber = document.querySelector('.start-block__number-of-question');

// Глобальные переменные
let listOfQuestionsNumbers; //вопросы в перемешанном виде
let currentQuestion;//текущий вопрос от общего количества
let juniorJsQuizLoad = false;
let HTMLQuizLoad = false;
let CSSQuizLoad = false;

let juniorJsQuestionsFileLoad = false;
let HTMLQuestionsFileLoad = false;
let CSSQuestionsFileLoad = false;

//Загрузка и инициализация файлов
const juniorJsQuizFile = new XMLHttpRequest();
juniorJsQuizFile.open('GET', "./assets/files/juniorJsQuiz.json");
juniorJsQuizFile.responseType = 'json';
juniorJsQuizFile.send();
let juniorJsQuiz = false;
juniorJsQuizFile.onload = () => {
  juniorJsQuiz = juniorJsQuizFile.response;
  juniorJsQuizLoad = true;
};

const HTMLQuizFile = new XMLHttpRequest();
HTMLQuizFile.open('GET', "./assets/files/HTMLQuiz.json");
HTMLQuizFile.responseType = 'json';
HTMLQuizFile.send();
let HTMLQuiz = false;
HTMLQuizFile.onload = () => {
  HTMLQuiz = HTMLQuizFile.response;
  HTMLQuizLoad = true;
}

const CSSQuizFile = new XMLHttpRequest();
CSSQuizFile.open('GET', "./assets/files/CSSQuiz.json");
CSSQuizFile.responseType = 'json';
CSSQuizFile.send();
let CSSQuiz = false;
CSSQuizFile.onload = () => {
  CSSQuiz = CSSQuizFile.response;
  CSSQuizLoad = true;
}

const juniorJsQuestionsFile = new XMLHttpRequest();
juniorJsQuestionsFile.open('GET', "./assets/files/juniorJsQuestions.json");
juniorJsQuestionsFile.responseType = 'json';
juniorJsQuestionsFile.send();
let JunioJsQuestions = false;
juniorJsQuestionsFile.onload = () => {
  juniorJsQuestions = juniorJsQuestionsFile.response;
  juniorJsQuestionsFileLoad = true;
}

const HTMLQuestionsFile = new XMLHttpRequest();
HTMLQuestionsFile.open('GET', "./assets/files/HTMLQuestions.json");
HTMLQuestionsFile.responseType = 'json';
HTMLQuestionsFile.send();
let HTMLQuestions = false;
HTMLQuestionsFile.onload = () => {
  HTMLQuestions = HTMLQuestionsFile.response;
  HTMLQuestionsFileLoad = true;
}

const CSSQuestionsFile = new XMLHttpRequest();
CSSQuestionsFile.open('GET', "./assets/files/CSSQuestions.json");
CSSQuestionsFile.responseType = 'json';
CSSQuestionsFile.send();
let CSSQuestions = false;
CSSQuestionsFile.onload = () => {
  CSSQuestions = CSSQuestionsFile.response;
  CSSQuestionsFileLoad = true;
}



//ПРоверка, что файлы с заданиями загружены и можно начинать работу
let checkLoadFile = setInterval(() => {
  if (juniorJsQuizLoad, HTMLQuizLoad, CSSQuizLoad, juniorJsQuestionsFileLoad, HTMLQuestionsFileLoad, CSSQuestionsFileLoad) {
    setTimeout(() => {
      loadingBlock.classList.remove('_visible');
      mainBlock.classList.add('_visible');
    }, 200);
    clearTimeout(checkLoadFile);
  }
}, 200);
//radio-type==================================================
const radioBlocks = document.querySelectorAll('.js-radio-type');
radioBlocks.forEach((radioBlock) => {
  const radioBlockBtns = radioBlock.querySelectorAll('.js-radio-type__btn');
  radioBlockBtns.forEach((radioBlockBtn) => {
    radioBlockBtn.addEventListener('click', () => {
      for (let i = 0; i < radioBlockBtns.length; i++) {
        radioBlockBtns[i].classList.remove('_active')
      }
      radioBlockBtn.classList.add('_active');
    })
  })
})

// switch-btn
const switchBtns = document.querySelectorAll('.js-switch-btn');

switchBtns.forEach((switchBtn) => {
  switchBtn.addEventListener('click', function () {
    if (this.classList.contains('_active')) {
      this.classList.remove('_active');
    } else {
      this.classList.add('_active');
    }
  })
})
let quiz = false;
let questions = false;
let typesOfQuestions = []; //собирает атрибуты нажатых кнопок разделов (под вопросом)

let questionsFiles = []; //массив файлов json, которые будут учавствовать в тестировании
let taskArrey = []; //Массив вопросов
//Кнопка запуска заданий
startBtn.addEventListener('click', () => {
  //Показ кнопки "К выбору категорий"
  headerBackBtn.classList.add('_visible');
  //
  selectingTaskType();
  selectQuestionsSection();
  if (quiz) {
    typesOfQuestions.forEach((typesOfQuestion) => {
      if (typesOfQuestion === 'juniorJs') {
        questionsFiles.push(juniorJsQuiz);
      } else if (typesOfQuestion === 'HTML') {
        questionsFiles.push(HTMLQuiz);
      } else if (typesOfQuestion === 'CSS') {
        questionsFiles.push(CSSQuiz);
      }
    })

    for (let i = 0; i < questionsFiles.length; i++) {
      taskArrey = taskArrey.concat(questionsFiles[i]['Test']);
    }

    correctAnswerBlock.innerText = counterOfCorrectAnswers = 0;
    incorrectAnswerBlock.innerText = wrongAnswerCounter = 0;
    startQuiz(taskArrey);

  } else if (questions) {
    typesOfQuestions.forEach((typesOfQuestion) => {
      if (typesOfQuestion === 'juniorJs') {
        questionsFiles.push(juniorJsQuestions);
      } else if (typesOfQuestion === 'HTML') {
        questionsFiles.push(HTMLQuestions);
      } else if (typesOfQuestion === 'CSS') {
        questionsFiles.push(CSSQuestions);
      }
    })

    for (let i = 0; i < questionsFiles.length; i++) {
      taskArrey = taskArrey.concat(questionsFiles[i]['Questions']);
    }

    startQuestions(taskArrey);
  }

})
//Возврат к выбору категорий
headerBackBtn.addEventListener('click', () => {
  startBlock.classList.add('_active');
  headerBackBtn.classList.remove('_visible');
  quizBlock.classList.remove('_active');
  questionsBlock.classList.remove('_active');
  taskArrey.length = 0;
  questionsFiles.length = 0;
  typesOfQuestions.length = 0;
  //обнуление состояния ответов
  testBlockResultsDescr.innerHTML = '';
  testBlockResultsLink.innerHTML = '';
  questionsResultDescr.innerHTML = '';
  questionsResultLink.innerHTML = '';
  //обнулениесостояния кнопок
  testBlockNextBtn.disabled = true;
  resultQuestionsBtn.disabled = false;
  questionsNextBtn.disabled = true;
  questionsReloadBtn.classList.remove('_visible');
})

//Функция определения, какой тип задания выбран (тестирование или вопросы)
function selectingTaskType() {
  for (let i = 0; i < typesOfTasksBtns.length; i++) {
    if (typesOfTasksBtns[i].classList.contains('_active')) {
      let typesOfTasksBtnAttr = typesOfTasksBtns[i].getAttribute('data-type');
      switch (typesOfTasksBtnAttr) {
        case 'quiz':
          startBlock.classList.remove('_active');
          quizBlock.classList.add('_active');
          quiz = true;
          questions = false;
          break;
        case 'questions':
          startBlock.classList.remove('_active');
          questionsBlock.classList.add('_active');
          quiz = false;
          questions = true;
          break;
      }
    }
  }
}
//Функция определения, по каким разделам будут задания 
function selectQuestionsSection() {
  questionsSectionsBtns.forEach((questionsSectionsBtn) => {
    if (questionsSectionsBtn.classList.contains('_active')) {
      typesOfQuestions.push(questionsSectionsBtn.getAttribute('data-type'));
    }
  })
  if (typesOfQuestions.length === 0) {
    for (let i = 0; i < questionsSectionsBtns.length; i++) {
      typesOfQuestions.push(questionsSectionsBtns[i].getAttribute('data-type'));
    }
  }
}

let quizOutputResult = '';
let counterOfCorrectAnswers; // счетчик правильных ответов
let wrongAnswerCounter; // счетчик неправильных ответов
//Начать тест заново
testBlockReloadBtn.addEventListener('click', () => {
  correctAnswerBlock.innerText = counterOfCorrectAnswers = 0;
  incorrectAnswerBlock.innerText = wrongAnswerCounter = 0;
  //Прверка на администратора
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
  if (admin) {
    //Обычная последовательность вопросов
    listOfQuestionsNumbers = [+questionNumber.value - 1];
  } else {
    //Перемешивание вопросов
    listOfQuestionsNumbers = randomCicle(quizFiles.length);
  }
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
    testBlockResultsDescr.innerHTML = '';
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
  //Вывод порядкового номера задания для админов
  if (admin) {
    quizBlockSerialNumber.innerHTML = `Порядковый номер вопроса: ${quizFile[questionNumber]["number"]}`;
  }
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
      testBlockResultsDescr.innerHTML = questionFile[questionNumber]["explanation"];
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
questionsNextBtn.disabled = true;
questionsReloadBtn.classList.remove('_visible');

//Пройти задания заново
questionsReloadBtn.addEventListener('click', () => {
  startQuestions(taskArrey);
  //Обнуление описания ответа и пояснения к нему в виде ссылки
  questionsResultDescr.innerHTML = '';
  questionsResultLink.innerHTML = '';
  resultQuestionsBtn.disabled = false;
  questionsReloadBtn.classList.remove('_visible');
})

function startQuestions(questionsFiles) {
  //Выводим текущий вопрос от общего количества
  currentQuestion = 1;
  answeredQuestionsBlock.innerHTML = currentQuestion;
  //Добавляет на страницу общее количество вопросов 
  totalQuestionsBlock.innerHTML = `${questionsFiles.length}`;
  //Вывод вопросов на страницу

  if (admin) {
    //Обычная последовательность вопросов
    listOfQuestionsNumbers = [+questionNumber.value - 1];
  } else {
    //перемешивание вопросов в рандомном порядке
    listOfQuestionsNumbers = randomCicle(questionsFiles.length);
  }
  outputQuestions(questionsFiles, listOfQuestionsNumbers)
}

//Показь ответ на вопрос по клику кнопки
resultQuestionsBtn.addEventListener('click', () => {
  outputAnswers(taskArrey, listOfQuestionsNumbers);
})

//Переход к следующему вопросу по клику кнопки
questionsNextBtn.addEventListener('click', () => {
  questionsNextBtn.disabled = true;
  listOfQuestionsNumbers.pop();
  if (listOfQuestionsNumbers.length > 0) {
    outputQuestions(taskArrey, listOfQuestionsNumbers);
    //Обновление счетчика
    currentQuestion += 1;
    answeredQuestionsBlock.innerHTML = currentQuestion;
    //Обнуление описания ответа и пояснения к нему в виде ссылки
    questionsResultDescr.innerHTML = '';
    questionsResultLink.innerHTML = '';
    //Обновление состояния кнопки
    resultQuestionsBtn.disabled = false;
  }
})




//Функция определения и вывода рандомного вопроса в HTML
function outputQuestions(questionsFile, questionsArrey) {
  let questionNumber = questionsArrey[questionsArrey.length - 1];

  //Вывод порядкового номера задания для админов
  if (admin) {
    answeredBlockSerialNumber.innerHTML = `Порядковый номер вопроса: ${questionsFile[questionNumber]["number"]}`;
  }

  questionArea.innerHTML = `${questionsFile[questionNumber]["question"]}`;
}
//Ыункция вывода ответа на вопрос
function outputAnswers(questionsFile, questionsArrey) {
  let questionNumber = questionsArrey[questionsArrey.length - 1];
  questionsResultDescr.innerHTML = `${questionsFile[questionNumber]["explanation"]}`;
  questionsResultLink.innerHTML = `<a href="${questionsFile[questionNumber]["link"]}" target="_blank">Читать подробнее</a>`;
  questionsNextBtn.disabled = false;
  resultQuestionsBtn.disabled = true;
  if (questionsArrey.length <= 1) {
    questionsNextBtn.disabled = true;
    questionsReloadBtn.classList.add('_visible');
  }
}