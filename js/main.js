'use strict';

(function () {

  var ENTER_KEYCODE = 13;

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
    window.card.activateAd(window.map.firstPin);
    window.address.changeAddressCoordinates();
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

  window.address.mainMapPinElement.addEventListener('mousedown', function () {
    pushMainPin();
  });

  window.address.mainMapPinElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      pushMainPin();
    }
  });

  window.main = {
    ENTER_KEYCODE: ENTER_KEYCODE
  };

})();
