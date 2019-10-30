'use strict';

(function () {

  var CENTER_OF_MAIN_PIN = 32;
  var BOTTOM_OF_MAIN_PIN = 75;

  var TOP_LIMIT = 130;
  var BOTTOM_LIMIT = 360;
  var LEFT_LIMIT = -31;
  var RIGHT_LIMIT = 1167;

  var mainMapPinElement = document.querySelector('.map__pin--main');
  var addressElement = document.querySelector('#address');

  addressElement.value = (Number.parseInt(mainMapPinElement.style.left, 10) + CENTER_OF_MAIN_PIN) + ', ' + (Number.parseInt(mainMapPinElement.style.top, 10) + CENTER_OF_MAIN_PIN);

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

      if (Number.parseInt(mainMapPinElement.style.top, 10) < TOP_LIMIT) {
        mainMapPinElement.style.top = TOP_LIMIT + 'px';
        return;
      }
      if (Number.parseInt(mainMapPinElement.style.top, 10) > BOTTOM_LIMIT) {
        mainMapPinElement.style.top = BOTTOM_LIMIT + 'px';
        return;
      }
      if (Number.parseInt(mainMapPinElement.style.left, 10) < LEFT_LIMIT) {
        mainMapPinElement.style.left = LEFT_LIMIT + 'px';
        return;
      }
      if (Number.parseInt(mainMapPinElement.style.left, 10) > RIGHT_LIMIT) {
        mainMapPinElement.style.left = RIGHT_LIMIT + 'px';
        return;
      }
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

      addressElement.value = (Number.parseInt(mainMapPinElement.style.left, 10) + CENTER_OF_MAIN_PIN) + ', ' + (Number.parseInt(mainMapPinElement.style.top, 10) + BOTTOM_OF_MAIN_PIN);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.movement = {
    mainMapPinElement: mainMapPinElement
  };

})();
