let quiz = false;
let questions = false;
let typesOfQuestions = []; //собирает атрибуты нажатых кнопок разделов (под вопросом)

let questionsFiles = []; //массив файлов json, которые будут учавствовать в тестировании
let taskArrey; //Массив вопросов
//Кнопка запуска заданий
startBtn.addEventListener('click', () => {
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
      if (i === 0) {
        taskArrey = questionsFiles[i]['Test'];
      } else {
        taskArrey = taskArrey.concat(questionsFiles[i]['Test']);
      }
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
      if (i === 0) {
        taskArrey = questionsFiles[i]['Questions'];
      } else {
        taskArrey = taskArrey.concat(questionsFiles[i]['Questions']);
      }
    }

    startQuestions(taskArrey);
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