document.querySelectorAll('.js-spoller').forEach((spoller) => {
  const btns = spoller.querySelectorAll('.js-spoller-btn');
  const spollerAreas = spoller.querySelectorAll('.js-spoller-area');
  let blockHeight = 0;
  let hasActive = true;
  let minBreakpoint = 0;
  let maxBreakpoint = true;
  if (spoller.hasAttribute('data-min-width')) {
    minBreakpoint = +spoller.getAttribute('data-min-width');
  }

  if (spoller.hasAttribute('data-max-width')) {
    maxBreakpoint = +spoller.getAttribute('data-max-width');
  }

  if (window.innerWidth > minBreakpoint && moreMaxBreakpoint() && hasActive) {
    // start
    for (let k = 0; k < spollerAreas.length; k++) {
      closeSpollerBlock(spollerAreas, k);
    }

    for (let i = 0; i < btns.length; i++) {
      btns[i].classList.remove('_active');
      for (let k = 0; k < spollerAreas.length; k++) {
        if (btns[i].getAttribute('data-spoller-name') === spollerAreas[k].getAttribute('data-spoller-name') && btns[i].hasAttribute('data-active')) {
          openSpollerBlock(btns, i, spollerAreas, k);
        }
      }
    }
    // start end
  } else if (window.innerWidth <= minBreakpoint || lessMaxBreakpoint()) {
    hasActive = false;
    for (let i = 0; i < btns.length; i++) {
      btns[i].classList.add('_active');
    }
    for (let k = 0; k < spollerAreas.length; k++) {
      spollerAreas[k].classList.add('_active');
      blockHeight = spollerAreas[k].querySelector('.js-spoller-area-inner').offsetHeight;
      spollerAreas[k].style.height = `${blockHeight}px`;
    }
  }

  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', () => {
      if (hasActive) {
        if (spoller.hasAttribute('data-accordion')) {
          for (let k = 0; k < btns.length; k++) {
            btns[k].classList.remove('_active');
            closeSpollerBlock(spollerAreas, k);
          }
          for (let k = 0; k < spollerAreas.length; k++) {
            if (btns[i].getAttribute('data-spoller-name') === spollerAreas[k].getAttribute('data-spoller-name')) {
              openSpollerBlock(btns, i, spollerAreas, k);
            }
          }
        } else {
          for (let k = 0; k < spollerAreas.length; k++) {
            if (btns[i].getAttribute('data-spoller-name') === spollerAreas[k].getAttribute('data-spoller-name')) {
              if (btns[i].classList.contains('_active')) {
                btns[i].classList.remove('_active');
                closeSpollerBlock(spollerAreas, k);
              } else {
                openSpollerBlock(btns, i, spollerAreas, k);
              }
            }
          }
        }
      }
    })
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth <= minBreakpoint || lessMaxBreakpoint()) {
      hasActive = false;
      for (let i = 0; i < btns.length; i++) {
        btns[i].classList.add('_active');
      }
      for (let k = 0; k < spollerAreas.length; k++) {
        spollerAreas[k].classList.add('_active');
        blockHeight = spollerAreas[k].querySelector('.js-spoller-area-inner').offsetHeight;
        spollerAreas[k].style.height = `${blockHeight}px`;
      }
    } else if (window.innerWidth > minBreakpoint && moreMaxBreakpoint()) {
      hasActive = true;
      for (let k = 0; k < spollerAreas.length; k++) {
        closeSpollerBlock(spollerAreas, k);
      }

      for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove('_active');
        for (let k = 0; k < spollerAreas.length; k++) {
          if (btns[i].getAttribute('data-spoller-name') === spollerAreas[k].getAttribute('data-spoller-name') && btns[i].hasAttribute('data-active')) {
            openSpollerBlock(btns, i, spollerAreas, k);
          }
        }
      }
    }
  })

  function moreMaxBreakpoint() {
    if (typeof maxBreakpoint === 'number') {
      if (window.innerWidth < maxBreakpoint) {
        return true;
      } else {
        return false;
      }
    } else if (typeof maxBreakpoint === 'boolean') {
      return true;
    }
  }

  function lessMaxBreakpoint() {
    if (typeof maxBreakpoint === 'number') {
      if (window.innerWidth >= maxBreakpoint) {
        return true;
      } else {
        return false;
      }
    } else if (typeof maxBreakpoint === 'boolean') {
      return false;
    }
  }

  function openSpollerBlock(btns, i, spollerAreas, k) {
    btns[i].classList.add('_active');
    spollerAreas[k].classList.add('_active');
    blockHeight = spollerAreas[k].querySelector('.js-spoller-area-inner').offsetHeight;
    spollerAreas[k].style.height = `${blockHeight}px`;
  }

  function closeSpollerBlock(spollerAreas, k) {
    spollerAreas[k].classList.remove('_active');
    spollerAreas[k].style.removeProperty('height');
  }


})




