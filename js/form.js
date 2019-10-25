'use strict';

(function () {

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

  var typeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');

  var changeTypeOrPrice = function () {
    if ((typeElement.value === 'bungalo' && Number.parseInt(priceElement.value, 10) < 0)
    || (typeElement.value === 'flat' && Number.parseInt(priceElement.value, 10) < 1000)
    || (typeElement.value === 'house' && Number.parseInt(priceElement.value, 10) < 5000)
    || (typeElement.value === 'palace' && Number.parseInt(priceElement.value, 10) < 10000)) {
      priceElement.setCustomValidity('error');
    } else {
      priceElement.setCustomValidity('');
    }
  };

  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');

  var changeTime = function () {
    if (timeInElement.value !== timeOutElement.value) {
      timeInElement.setCustomValidity('error');
      timeOutElement.setCustomValidity('error');
    } else {
      timeInElement.setCustomValidity('');
      timeOutElement.setCustomValidity('');
    }
  };

  window.form = {
    changeRoomsOrCapacity: changeRoomsOrCapacity,
    roomsElement: roomsElement,
    capacityElement: capacityElement,

    typeElement: typeElement,
    priceElement: priceElement,
    changeTypeOrPrice: changeTypeOrPrice,

    timeInElement: timeInElement,
    timeOutElement: timeOutElement,
    changeTime: changeTime
  };

})();
