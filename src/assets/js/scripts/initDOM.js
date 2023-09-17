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
const answeredQuizBlock = document.querySelector('.quiz-block__info-questions-answered');
const totalQuizBlock = document.querySelector('.quiz-block__info-questions-total');
const correctAnswerBlock = document.querySelector('.quiz-block__info-correct-answer-count');
const incorrectAnswerBlock = document.querySelector('.quiz-block__info-incorrect-answer-count');
const mainBlock = document.querySelector('.main');
const loadingBlock = document.querySelector('.loading');

//questions block
const questionsBlock = document.querySelector('.questions-block');
const answeredQuestionsBlock = document.querySelector('.questions-block__info-questions-answered');
const totalQuestionsBlock = document.querySelector('.questions-block__info-questions-total');
const questionArea = document.querySelector('.questions-block__question');
const questionsResultDescr = document.querySelector('.questions-block__results-descr');
const questionsResultLink = document.querySelector('.questions-block__results-link');
const resultQuestionsBtn = document.querySelector('.questions-block__answer-btn');
const questionsNextBtn = document.querySelector('.questions-block__next-btn');
const questionsReloadBtn = document.querySelector('.questions-block__reload-btn');

// Глобальные переменные
let listOfQuestionsNumbers; //вопросы в перемешанном виде
let currentQuestion;//текущий вопрос от общего количества
