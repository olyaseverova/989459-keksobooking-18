'use strict';

(function () {

  var formElement = document.querySelector('.ad-form');
  window.form.addDisabled(window.form.fieldsetsElement);
  window.form.addDisabled(window.form.filterElement);

  var activateMap = function () {
    window.data.mapElement.classList.remove('map--faded');
  };

  var activateForm = function () {
    formElement.classList.remove('ad-form--disabled');
  };

  var pushMainPin = function () {
    activateMap();
    activateForm();
    window.form.removeDisabled(window.form.filterElement);
    window.form.removeDisabled(window.form.fieldsetsElement);
    window.data.pinsElement.appendChild(window.data.fragmentPin);

    window.form.roomsElement.addEventListener('change', window.form.onChangeRoomsOrCapacity);
    window.form.capacityElement.addEventListener('change', window.form.onChangeRoomsOrCapacity);
    window.form.typeElement.addEventListener('change', window.form.onChangePrice);
    window.form.priceElement.addEventListener('change', window.form.onChangePrice);
    window.form.timeInElement.addEventListener('change', window.form.onChangeTimeIn);
    window.form.timeOutElement.addEventListener('change', window.form.onChangeTimeOut);
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
