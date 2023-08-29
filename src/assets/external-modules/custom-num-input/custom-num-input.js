document.querySelectorAll('.num-input').forEach((numInput) => {
  const btnUp = numInput.querySelector('.num-input-btn-up');
  const btnDown = numInput.querySelector('.num-input-btn-down');
  const input = numInput.querySelector('.num-input-area');

  let inputMaxValue = 999999999999999;


  if (input.getAttribute('max')) {
    inputMaxValue = +input.getAttribute('max');
  }
  let inputMinValue = 0;
  if (input.getAttribute('min')) {
    inputMinValue = +input.getAttribute('min');
  }


  btnUp.addEventListener('click', () => {
    if (+input.value < inputMaxValue) {
      input.value = +input.value + 1;
    }

  })

  btnDown.addEventListener('click', () => {
    if (+input.value > inputMinValue) {
      input.value = +input.value - 1;
    }
  })

  input.addEventListener('input', () => {
    if (isNaN(input.value)) {
      input.value = input.value.replace(/\D/g, '');
    } else if (!isNaN(input.value)) {
      if (input.value > inputMaxValue) {
        input.value = inputMaxValue;
      }
    }

  })

  input.addEventListener('change', () => {
    if (input.value <= 0) {
      input.value = inputMinValue;
    }
  })
});

