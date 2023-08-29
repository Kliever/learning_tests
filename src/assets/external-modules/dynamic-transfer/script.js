

document.querySelectorAll('.dynamic-transfer').forEach((transferItem) => {
  const itemAttr = transferItem.getAttribute('data-dt');
  const itemAttrTriggerPoints = itemAttr.split('/');

  itemAttrTriggerPoints.forEach((triggerPoints) => {
    const itemAttrArr = triggerPoints.split(',');
    const transferPlace = document.querySelector(`#${itemAttrArr[0]}`);
    let transferOrder = +itemAttrArr[1];

    if (isNaN(transferOrder)) {
      transferOrder = (itemAttrArr[1] === 'after') ? 'after' :
        (itemAttrArr[1] === 'before') ? 'before' :
          (itemAttrArr[1] === 'firstChild') ? 'firstChild' :
            (itemAttrArr[1] === 'lastChild') ? 'lastChild' :
              false;
    }

    const transferBreakpoint = itemAttrArr[2];
    const transferMethod = itemAttrArr[3];

    let startPosition;
    let startPositionType;



    if (window.matchMedia(`(${transferMethod}-width: ${transferBreakpoint}px)`).matches) {
      moveBlock();
    } else {
      returnBlock();
    }


    window.matchMedia(`(${transferMethod}-width: ${transferBreakpoint}px)`).
      addEventListener('change', () => {
        if (window.matchMedia(`(${transferMethod}-width: ${transferBreakpoint}px)`).matches) {
          moveBlock();
        } else {
          returnBlock();
        }
      })

    function moveBlock() {
      //search start position
      if (transferItem.previousElementSibling) {
        startPosition = transferItem.previousElementSibling;
        startPositionType = 'previos';
      } else if (transferItem.parentElement) {
        startPosition = transferItem.parentElement;
        startPositionType = 'parent';
      }


      //move block
      if (!isNaN(transferOrder)) {
        if (transferOrder === 1) {
          transferPlace.prepend(transferItem);
        } else {
          if (transferPlace.childNodes.length >= transferOrder) {
            transferPlace.childNodes[transferOrder - 1].after(transferItem);
          } else {
            transferPlace.childNodes[transferPlace.childNodes.length - 1].after(transferItem);
          }

        }
      } else {
        if (transferOrder === 'after') {
          transferPlace.after(transferItem);
        } else if (transferOrder === 'before') {
          transferPlace.before(transferItem);
        } else if (transferOrder === 'firstChild') {
          transferPlace.prepend(transferItem);
        } else if (transferOrder === 'lastChild') {
          transferPlace.append(transferItem);
        }
      }
    }

    function returnBlock() {
      if (startPositionType === 'previos') {
        startPosition.after(transferItem);
      } else if (startPositionType === 'parent') {
        startPosition.prepend(transferItem);
      }
    }


  })



});

