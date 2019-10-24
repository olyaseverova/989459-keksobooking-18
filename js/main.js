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
    window.card.activateCard(window.map.firstPin);
    window.address.changeAddressCoordinates();
    window.map.pinsElement.appendChild(window.map.fragmentPin);

    window.form.roomsElement.addEventListener('change', function () {
      window.form.changeRoomsOrCapacity();
    });

    window.form.capacityElement.addEventListener('change', function () {
      window.formchangeRoomsOrCapacity();
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

})();
