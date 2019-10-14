'use strict';

(function () {

  var mainMapPinElement = document.querySelector('.map__pin--main');
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

  window.address = {
    changeAddressCoordinates: changeAddressCoordinates,
    mainMapPinElement: mainMapPinElement
  };

})();
