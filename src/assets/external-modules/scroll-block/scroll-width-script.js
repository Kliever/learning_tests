let marginScrollBody = document.querySelector('body');
let marginFixedElement = document.querySelectorAll('.js-scroll-padding');
marginScrollBody.style.position = 'relative';

//color scroll block
let marginScrollBgColor = '#ffffff';
if (marginScrollBody.hasAttribute('data-margin-scroll-color')) {
  marginScrollBgColor = marginScrollBody.getAttribute('data-margin-scroll-color');
}

//width scroll block
let marginScrollWidth = window.innerWidth - marginScrollBody.clientWidth;
if (marginScrollBody.hasAttribute('data-margin-scroll-width')) {
  marginScrollWidth = marginScrollBody.getAttribute('data-margin-scroll-width');
}

//create and add scroll block
let newMarginScrollBar = document.createElement('div');
newMarginScrollBar.style.height = '0';
newMarginScrollBar.style.width = '0';
newMarginScrollBar.style.top = '0';
newMarginScrollBar.style.right = '0';
newMarginScrollBar.style.position = 'fixed';
newMarginScrollBar.style.zIndex = '100';
newMarginScrollBar.style.backgroundColor = marginScrollBgColor;
marginScrollBody.append(newMarginScrollBar);

//add padding for fixed element
function addScrollPaddingFixedElement() {
  if (marginFixedElement.length > 0) {
    for (let i = 0; i < marginFixedElement.length; i++) {
      marginFixedElement[i].style.paddingRight = `${marginScrollWidth}px`;
    }
  }
}

//remove padding for fixed element
function removeScrollPaddingFixedElement() {
  if (marginFixedElement.length > 0) {
    for (let i = 0; i < marginFixedElement.length; i++) {
      marginFixedElement[i].style.removeProperty('padding-right');
    }
  }
}

//add margin for body
function addScrollMargin() {
  newMarginScrollBar.style.height = `100vh`;
  newMarginScrollBar.style.width = `${marginScrollWidth}px`;
  marginScrollBody.style.marginRight = `${marginScrollWidth}px`;
  addScrollPaddingFixedElement();
}

//remove margin for body
function removeScrollMargin() {
  newMarginScrollBar.style.height = `0`;
  newMarginScrollBar.style.width = `0`;
  marginScrollBody.style.removeProperty('margin-right');
  removeScrollPaddingFixedElement();
}