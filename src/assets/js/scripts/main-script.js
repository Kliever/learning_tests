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
