'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var mainMapPinElement = document.querySelector('.map__pin--main');

  var roomsElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');

  var changeRoomsOrCapacity = function () {
    if (
      (Number.parseInt(roomsElement.value, 10) <= 3 && Number.parseInt(roomsElement.value, 10) > 0
      && (capacityElement.value > roomsElement.value || capacityElement.value === '0'))
      || (roomsElement.value === '100' && capacityElement.value !== '0')) {
      capacityElement.setCustomValidity('error');
      roomsElement.setCustomValidity('error');
    } else {
      capacityElement.setCustomValidity('');
      roomsElement.setCustomValidity('');
    }
  };

  var addressElement = document.querySelector('#address');

  var centerOfMainPin = 32;
  var bottomOfMainPinY = 75;

  var addressX = Number.parseInt(mainMapPinElement.style.left, 10) + centerOfMainPin;
  var addressY = Number.parseInt(mainMapPinElement.style.top, 10) + centerOfMainPin;
  var addressBottomY = Number.parseInt(mainMapPinElement.style.top, 10) + bottomOfMainPinY;

  addressElement.value = addressX + ', ' + addressY;

  var changeAddressCoordinates = function () {
    addressElement.value = addressX + ', ' + addressBottomY;
  };

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
    changeAddressCoordinates();
    window.pins.pinsElement.appendChild(window.pins.fragment);

    roomsElement.addEventListener('change', function () {
      changeRoomsOrCapacity();
    });

    capacityElement.addEventListener('change', function () {
      changeRoomsOrCapacity();
    });
  };

  mainMapPinElement.addEventListener('mousedown', function () {
    pushMainPin();
  });

  mainMapPinElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      pushMainPin();
    }
  });

})();
