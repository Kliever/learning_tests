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

function startTest() {
  const juniorJsTestFile = juniorJsTest.response;
  testAnswerArea.innerHTML = '';
  testOutputResult = '';
  //
  console.log(juniorJsTestFile["Test"][0]["answers"][0]["answer"]);
  //add question in html
  let questionNumber = calcRandomQuestionPosition(juniorJsTestFile);
  questionArea.innerHTML = `${juniorJsTestFile["Test"][questionNumber]["question"]}`;
  //add answers in html
  for (let i = 0; i < juniorJsTestFile["Test"][questionNumber]["answers"].length; i++) {

    testOutputResult += fillingAnswerArea(juniorJsTestFile, questionNumber, i);
    
  }
  testAnswerArea.innerHTML = testOutputResult;
  checkValidResultTest(juniorJsTestFile, questionNumber);
}

function calcRandomQuestionPosition(questionFile) {
  let questionNumber = Math.floor(Math.random() * questionFile["Test"].length);
  return questionNumber;
}

function fillingAnswerArea(questionFile, questionNumber, responseNumber) {
  return `<label class="test-answer__checkbox checkbox"><input class="test-answer__check checkbox__check" type="radio" name="answer" data-status="${questionFile["Test"][questionNumber]["answers"][responseNumber]['status']}"><span class="checkbox__box"></span><span class="checkbox__info">${questionFile["Test"][questionNumber]["answers"][responseNumber]['answer']}</span></label>`;
}

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

testBlockNextBtn.addEventListener('click', () => {
  startTest();
})














