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

    window.form.roomsElement.addEventListener('change', window.form.changeRoomsOrCapacity);
    window.form.capacityElement.addEventListener('change', window.form.changeRoomsOrCapacity);
    window.form.typeElement.addEventListener('change', window.form.changePrice);
    window.form.priceElement.addEventListener('change', window.form.changePrice);
    window.form.timeInElement.addEventListener('change', window.form.changeTime);
    window.form.timeOutElement.addEventListener('change', window.form.changeTime);
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
