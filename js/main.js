'use strict';

(function () {

  var activateMap = function () {
    var mapElement = document.querySelector('.map');
    mapElement.classList.remove('map--faded');
  };

  var activateForm = function () {
    var formElement = document.querySelector('.ad-form');
    formElement.classList.remove('ad-form--disabled');
  };

  var pushMainPin = function () {
    activateMap();
    activateForm();
    window.map.pinsElement.appendChild(window.map.fragmentPin);

    window.form.roomsElement.addEventListener('change', function () {
      window.form.changeRoomsOrCapacity();
    });

    window.form.capacityElement.addEventListener('change', function () {
      window.form.changeRoomsOrCapacity();
    });

    window.form.typeElement.addEventListener('change', function () {
      window.form.changeTypeOrPrice();
    });

    window.form.priceElement.addEventListener('change', function () {
      window.form.changeTypeOrPrice();
    });

    window.form.timeInElement.addEventListener('change', function () {
      window.form.changeTime();
    });

    window.form.timeOutElement.addEventListener('change', function () {
      window.form.changeTime();
    });

  };

  window.movement.mainMapPinElement.addEventListener('mousedown', function () {
    if (window.isMainPinUsed) {
      return;
    }
    window.isMainPinUsed = true;
    pushMainPin();
  });

  window.movement.mainMapPinElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.universal.ENTER_KEYCODE) {
      pushMainPin();
    }
  });

})();
