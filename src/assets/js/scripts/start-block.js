const startBlock = document.querySelector('.start-block');
const startBtn = document.querySelector('.start-block__start-btn');
const typesOfTasks = document.querySelector('.js-types-of-tasks');
const typesOfTasksBtns = typesOfTasks.querySelectorAll('.js-types-of-tasks__item');
const quizBlock = document.querySelector('.quiz-block');

const questionsSections = document.querySelector('.js-types-of-questions');
const questionsSectionsBtns = questionsSections.querySelectorAll('.js-types-of-questions__item')

let quiz = false;
let typesOfQuestions = []; //собирает атрибуты нажатых кнопок разделов (под вопросом)

let quizFiles = []; //массив файлов json, которые будут учавствовать в тестировании
let taskArrey; //Массив вопросов
//Кнопка запуска заданий
startBtn.addEventListener('click', () => {
  selectingTaskType();
  selectQuestionsSection();
  if (quiz) {
    typesOfQuestions.forEach((typesOfQuestion) => {
      if (typesOfQuestion === 'juniorJs') {
        quizFiles.push(juniorJsQuiz);
      } else if (typesOfQuestion === 'middleJs') {
        quizFiles.push(middleJsQuiz);
      } else if (typesOfQuestion === 'seniorJs') {
        quizFiles.push(seniorJsQuiz);
      }
    })

    for (let i = 0; i < quizFiles.length; i++) {
      if (i === 0) {
        taskArrey = quizFiles[i]['Test'];
      } else {
        taskArrey = taskArrey.concat(quizFiles[i]['Test']);
      }
    }
    
    correctAnswerBlock.innerText = counterOfCorrectAnswers = 0;
    incorrectAnswerBlock.innerText = wrongAnswerCounter = 0;
    startQuiz(taskArrey);
  }
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
          break;
        case 'questions':
          // console.log(13);
          quiz = false;
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
