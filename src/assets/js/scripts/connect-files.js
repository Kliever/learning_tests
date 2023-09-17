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