document.querySelectorAll('.custom-select').forEach((customSelect) => {
  const customSelectBtn = customSelect.querySelector('.custom-select__button');
  const customSelectOptions = customSelect.querySelector('.custom-select__options');
  const customSelectItem = customSelectOptions.querySelectorAll('.custom-select__option');
  const customSelectInput = customSelect.querySelector('.custom-select__input');

  // add button value default
  for (let i = 0; i < customSelectItem.length; i++) {
    if (customSelectItem[i].hasAttribute('active')) {
      customSelectBtn.innerText = customSelectItem[i].innerText;
      break;
    } else {
      customSelectBtn.innerText = customSelectItem[0].innerText;
    }
  }

  //add input value default
  for (let i = 0; i < customSelectItem.length; i++) {
    if (customSelectItem[i].hasAttribute('active')) {
      customSelectInput.value = customSelectItem[i].dataset.value;
      customSelectItem[i].classList.add('_active');
      break;
    } else {
      customSelectInput.value = customSelectItem[0].dataset.value;
    }
  }

  //event click
  customSelectBtn.addEventListener('click', () => {
    customSelectBtn.classList.toggle('_active');
    customSelectBtn.classList.add('_focus');
    customSelectOptions.classList.toggle('_active');
  })

  customSelectItem.forEach((item) => {

    item.addEventListener('click', () => {

      customSelectItem.forEach((item) => {
        item.classList.remove('_active');
      });

      customSelectBtn.innerText = item.innerText;
      customSelectInput.value = item.dataset.value;
      customSelectBtn.classList.remove('_active');
      customSelectBtn.focus();
      customSelectOptions.classList.remove('_active');
      customSelectBtn.classList.add('_focus');
      item.classList.add('_active');
    })

  })

  document.addEventListener('click', (e) => {
    if (!e.composedPath().includes(customSelect)) {
      customSelectBtn.classList.remove('_active');
      customSelectOptions.classList.remove('_active');
      customSelectBtn.classList.remove('_focus');
    } else {
      customSelectBtn.focus();
      customSelectBtn.classList.add('_focus');
    }
  })


  document.addEventListener('keydown', (e) => {
    if (customSelectBtn.classList.contains('_active')) {
      e.preventDefault();
    }
    // tab click
    if (e.code === 'Tab' && customSelectBtn == document.activeElement) {
      customSelectBtn.classList.remove('_focus');
      customSelectBtn.classList.remove('_active');
      customSelectOptions.classList.remove('_active');
    }

    if (customSelectOptions.classList.contains('_active')) {
      for (let i = 0; i < customSelectItem.length; i++) {
        // ArrowDown click
        if (customSelectItem[i].classList.contains('_active') && e.code === 'ArrowDown' && i < customSelectItem.length - 1) {
          customSelectItem[i].classList.remove('_active');
          customSelectItem[i + 1].classList.add('_active');
          customSelectInput.value = customSelectItem[i + 1].dataset.value;
          customSelectBtn.innerText = customSelectItem[i + 1].innerText;
          break;
        }
        //ArrowUp click
        if (customSelectItem[i].classList.contains('_active') && e.code === 'ArrowUp' && i > 0) {
          customSelectItem[i].classList.remove('_active');
          customSelectItem[i - 1].classList.add('_active');
          customSelectInput.value = customSelectItem[i - 1].dataset.value;
          customSelectBtn.innerText = customSelectItem[i - 1].innerText;
          break;
        }
      }
    }
  })
})