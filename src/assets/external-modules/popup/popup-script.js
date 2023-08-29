let openPopupBtns = document.querySelectorAll('.js-open-popup-btn');
let bodyPopup = document.querySelector('body');
let popups = document.querySelectorAll('.js-popup');
let switches = true;
let popupsWithTime = {};

if (popups.length > 0) {
  if (openPopupBtns.length > 0) {

    //open popup by click
    for (let i = 0; i < openPopupBtns.length; i++) {
      openPopupBtns[i].addEventListener('click', () => {
        let openPopupBtnAttr = openPopupBtns[i].getAttribute('data-popup-name')

        for (let k = 0; k < popups.length; k++) {
          if (popups[k].classList.contains(openPopupBtnAttr)) {

            for (let i = 0; i < popups.length; i++) {
              popups[i].classList.remove('_active')
            }

            popups[k].classList.add('_active');
            bodyPopup.classList.add('_active-popup');
            switches = false;
            //this place for input function for add body margin 
            if (popups[k].hasAttribute('data-open-time')) {
              popups[k].setAttribute('openedonclick', '');
            }
          }
        }
      })
    }

    //close popup
    popups.forEach((popup) => {
      let closePopupBtn = popup.querySelector('.js-popup-close');
      let popupBlackoutArea = popup.querySelector('.js-popup-area');
      let deleyOpenClose = 0.5;

      if (popup.hasAttribute('data-delay-open-close')) {
        deleyOpenClose = +popup.getAttribute('data-delay-open-close') * 1000;
      }

      //close popup for click on button
      closePopupBtn.addEventListener('click', () => {
        if (popup.classList.contains('_active')) {
          closePopUp(popup, deleyOpenClose);
        }
      })


      //close popup for click on area
      document.addEventListener('click', (e) => {
        if (e.target == popupBlackoutArea) {
          closePopUp(popup, deleyOpenClose);
        }
      })

      //close popup for click on escape
      document.addEventListener('keydown', (event) => {
        if (popup.classList.contains('_active') && (event.key == 'Escape' || event.code == "Escape")) {
          closePopUp(popup, deleyOpenClose);



        }
      })
    });

    //function close popup
    function closePopUp(popup, deleyOpenClose) {
      popup.classList.remove('_active');
      setTimeout(() => {
        bodyPopup.classList.remove('_active-popup');
        switches = true;
        //this place for input function for remove body margin 

        setTimeout(() => {
          if (switches) {
            openLazyPopup(popupsWithTime);
          }
        }, 5000);

      }, deleyOpenClose * 1000);

    }
  }

  //open popup for time
  popups.forEach(popup => {
    if (popup.hasAttribute('data-open-time')) {
      let popupOpenTime = +popup.getAttribute('data-open-time');
      setTimeout(() => {
        if (switches && !popup.hasAttribute('openedonclick')) {
          popup.classList.add('_active');
          bodyPopup.classList.add('_active-popup');
          popup.removeAttribute('data-open-time');
          switches = false;
          //this place for input function for add body margin 
          
        } else {
          if (!popup.hasAttribute('openedonclick')) {
            popupsWithTime[+popup.getAttribute('data-open-time')] = popup;
          }
        }
      }, popupOpenTime * 1000);
    }
  })

  function openLazyPopup(popupsWithTime) {

    for (let item in popupsWithTime) {
      if (switches && popupsWithTime.hasOwnProperty(item)) { // <--check for the presence of elements
        popupsWithTime[item].classList.add('_active');
        popupsWithTime[item].classList.add('_active-popup');
        delete popupsWithTime[item];
        switches = false;
      }
    }

  }

}
