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