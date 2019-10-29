'use strict';

(function () {

  var mainMapPinElement = document.querySelector('.map__pin--main');
  var addressElement = document.querySelector('#address');

  var centerOfMainPin = 32;
  var bottomOfMainPinY = 75;

  addressElement.value = (Number.parseInt(mainMapPinElement.style.left, 10) + centerOfMainPin) + ', ' + (Number.parseInt(mainMapPinElement.style.top, 10) + centerOfMainPin);

  mainMapPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainMapPinElement.style.top = (mainMapPinElement.offsetTop - shift.y) + 'px';
      mainMapPinElement.style.left = (mainMapPinElement.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();
          mainMapPinElement.removeEventListener('click', onClickPreventDefault);
        };
        mainMapPinElement.addEventListener('click', onClickPreventDefault);
      }

      addressElement.value = (Number.parseInt(mainMapPinElement.style.left, 10) + centerOfMainPin) + ', ' + (Number.parseInt(mainMapPinElement.style.top, 10) + bottomOfMainPinY);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.movement = {
    mainMapPinElement: mainMapPinElement
  };

})();
