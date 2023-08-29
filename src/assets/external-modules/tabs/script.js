document.querySelectorAll('.tabs').forEach((tab) => {
  let btns = tab.querySelectorAll('.tabs__btn');
  let blocks = tab.querySelectorAll('.tabs__block');

  btns.forEach((btn) => {
    btn.addEventListener('click', function () {
      if (!btn.classList.contains('_active')) {
        for (let i = 0; i < btns.length; i++) {
          btns[i].classList.remove('_active');
        }
        btn.classList.add('_active');
      }
      for (let i = 0; i < blocks.length; i++) {
        if (btn.getAttribute('tab-name') === blocks[i].getAttribute('tab-name')) {
          blocks[i].classList.add('_active');
        } else {
          blocks[i].classList.remove('_active');
        }
      }
    })
  })
})
