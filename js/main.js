'use strict';

(function () {

  var formElement = document.querySelector('.ad-form');
  window.form.addDisabled();

  var activateMap = function () {
    window.data.mapElement.classList.remove('map--faded');
  };

  var activateForm = function () {
    formElement.classList.remove('ad-form--disabled');
  };

  var pushMainPin = function () {
    activateMap();
    activateForm();
    window.form.removeDisabled();
    window.data.pinsElement.appendChild(window.data.fragmentPin);

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
    pushMainPin();
  });

  window.movement.mainMapPinElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.universal.ENTER_KEYCODE) {
      pushMainPin();
    }
  });

})();
