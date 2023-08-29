document.querySelectorAll('.js-form-valid').forEach((form) => {
  const inputs = form.querySelectorAll('.js-form-valid-input');
  const checks = form.querySelectorAll('.js-form-valid-check');
  const passInputs = form.querySelectorAll('.js-form-valid-pass');
  const confirmPassInputs = form.querySelectorAll('.js-form-valid-confirm-pass');
  const submitBtn = form.querySelector('.js-form-valid-submit');
  const alertPopup = document.querySelector('.js-form-error');

  let timerIdCheck = [];
  let timerIdInputs = [];
  let timerIdPassInputs = [];
  let timerIdConfirmPassInputs = [];
  let timerIdPassInputsValidChar = [];
  let timerIdPassLimitSymbol = [];
  let timerIdPassComparable = [];

  //a switch responsible for the possibility of activating the informing popup
  let isActive = true;

  //centering first element with error
  let centering = true;

  //shutdown timeout in seconds
  let timeout = +form.getAttribute('data-timeout') * 1000;

  //Only latin numbers and letters are allowed in the password
  let onlyLatine;
  //Additional allowed characters in the password
  let validSymbol;
  //Checking for the number of characters entered
  let limitSymbol;
  if (passInputs.length !== 0) {
    onlyLatine = passInputs[0].hasAttribute('data-latin');

    validSymbol = passInputs[0].getAttribute('data-latin');
    if (validSymbol) {
      validSymbol = validSymbol.split('');
    }

    limitSymbol = +passInputs[0].getAttribute('data-limit');
  }

  submitBtn.addEventListener('click', (event) => {
    //Check for completeness
    addRemoveErrorInput(event, inputs, timerIdInputs);
    addRemoveErrorCheck(event, checks, timerIdCheck);
    addRemoveErrorInput(event, passInputs, timerIdPassInputs);
    addRemoveErrorInput(event, confirmPassInputs, timerIdConfirmPassInputs);
    //Checking the password for prohibited characters
    checkValidSymbol(event, passInputs, timerIdPassInputsValidChar);
    //Checking the password for the minimum allowed number of characters
    if (limitSymbol) {
      checkLimitSymbol(event, passInputs, timerIdPassLimitSymbol);
    }
    //checks the confirm password isnupt against the password field
    checkСonfirmSymbol(event, confirmPassInputs, timerIdPassComparable, passInputs)


    isActive = true;
    centering = true;
  })


  //if there is no timeout, remove the _error class on the input event
  if (!timeout) {
    removeErrorOnEventInput(inputs);
    removeErrorOnEventInput(checks);
    removeErrorOnEventInput(passInputs);
    removeErrorOnEventInput(confirmPassInputs);
  }

  // adds an error and removes it from the inputs depending on whether the field is filled or not and the presence of a timeout disables the error
  function addRemoveErrorInput(clickEvent, targetInputs, timerId) {
    removeDeleteTimer(timerId);

    targetInputs.forEach((input) => {
      if (input.value.length === 0) {
        clickEvent.preventDefault();
        input.classList.add('_error');
        
        centeringErrorBlock(input);

        //Вывод сообщения об ошибке
        if (alertPopup && isActive) {
          openErrorPopup ();
          //Вставить функцию отключения скролла
          isActive = false;
        }

        if (timeout) {
          timerId.push(setTimeout(() => {
            input.classList.remove('_error');
          }, timeout));
        }
      } else {
        input.classList.remove('_error');
      }
    })
  }
  // adds an error and removes it from the checkbox depending on the checkbox
  function addRemoveErrorCheck(clickEvent, targetCheckboxes, timerId) {
    removeDeleteTimer(timerId);

    targetCheckboxes.forEach((check) => {
      if (!check.checked) {
        clickEvent.preventDefault();
        check.classList.add('_error');

        centeringErrorBlock(check);

        //Вывод сообщения об ошибке
        if (alertPopup && isActive) {
          openErrorPopup ();
          //Вставить функцию отключения скролла
          isActive = false;
        }

        if (timeout) {
          timerId.push(setTimeout(() => {
            check.classList.remove('_error');
          }, timeout));
        }
      } else {
        check.classList.remove('_error');
      }
    })
  }
  //disables error on input event
  function removeErrorOnEventInput(targetInputs) {
    targetInputs.forEach((input) => {
      input.addEventListener('input', () => {
        if (input.classList.contains('_error')) {
          input.classList.remove('_error');
        }
      })
    })
  }
  //Checks the password input for illegal characters
  function checkValidSymbol(clickEvent, targetInputs, timerId) {
    removeDeleteTimer(timerId);

    if (onlyLatine) {
      for (let i = 0; i < targetInputs.length; i++) {
        let inputValueArrey = targetInputs[0].value.split('');
        for (let k = 0; k < inputValueArrey.length; k++) {
          //если символ не цифра и не латиница
          if (!/\w/.test(inputValueArrey[k]) && !/\d/.test(inputValueArrey[k])) {
            //если есть перечень допустимых символов
            if (validSymbol) {
              if (validSymbol.indexOf(inputValueArrey[k]) === -1) {
                clickEvent.preventDefault();
                targetInputs[i].classList.add('_error');

                centeringErrorBlock(targetInputs[i]);

                if (alertPopup && isActive) {
                  openErrorPopup ();
                  isActive = false;
                }

                if (timeout) {
                  timerId.push(setTimeout(() => {
                    targetInputs[i].classList.remove('_error');
                  }, timeout));
                }
                break;
              }
              //если нет перечня допустимых символов
            } else {
              clickEvent.preventDefault();
              targetInputs[i].classList.add('_error');

              centeringErrorBlock(targetInputs[i]);

              if (alertPopup && isActive) {
                openErrorPopup ();
                isActive = false;
              }

              if (timeout) {
                timerId.push(setTimeout(() => {
                  targetInputs[i].classList.remove('_error');
                }, timeout));
              }
              break;
            }

          }
        }
      }
    }

  }
  //Checks the password input for the number of characters
  function checkLimitSymbol(clickEvent, targetInputs, timerId) {
    removeDeleteTimer(timerId);

    for (let i = 0; i < targetInputs.length; i++) {
      if (targetInputs[0].value.length < limitSymbol) {
        clickEvent.preventDefault();
        targetInputs[i].classList.add('_error');

        centeringErrorBlock(targetInputs[i]);

        if (alertPopup && isActive) {
          openErrorPopup ();
          isActive = false;
        }

        if (timeout) {
          timerId.push(setTimeout(() => {
            targetInputs[i].classList.remove('_error');
          }, timeout));
        }
      }
    }
  }
  //checks the password confirmation input against the password field
  function checkСonfirmSymbol(clickEvent, targetInputs, timerId, comparableInputs) {
    removeDeleteTimer(timerId);

    if (targetInputs[0] && targetInputs[0].value !== comparableInputs[0].value) {
      clickEvent.preventDefault();
      targetInputs[0].classList.add('_error');

      centeringErrorBlock(targetInputs[0]);

      if (alertPopup && isActive) {
        openErrorPopup ();
        isActive = false;
      }

      if (timeout) {
        timerId.push(setTimeout(() => {
          targetInputs[0].classList.remove('_error');
        }, timeout));
      }
    }
  }
  //Deleting an expired timer
  function removeDeleteTimer(timerId) {
    if (timeout && timerId.length !== 0) {
      for (let i = 0; i < timerId.length; i++) {
        clearTimeout(timerId[i]);
      }
      timerId.splice(0);
    }
  }
  //open error popup
  function openErrorPopup () {
    alertPopup.classList.add('_active');
    //Еnter block scroll code
  }
  //centering error block / input
  function centeringErrorBlock(errorBlock) {
    if(centering) {
      errorBlock.scrollIntoView({block: "center", behavior: "smooth"})
      centering = false;
    }
  }

})

