'use strict';

(function () {

  var formElement = document.querySelector('.ad-form');
  var mainPinLeft = window.movement.mainMapPinElement.style.left;
  var mainPinTop = window.movement.mainMapPinElement.style.top;

  var updateForm = function () {
    formElement.reset();
    window.map.pinsElement.innerHTML = '';
    window.movement.mainMapPinElement.style.left = mainPinLeft;
    window.movement.mainMapPinElement.style.top = mainPinTop;
    window.movement.addressElement.value = (Number.parseInt(mainPinLeft, 10) + window.movement.CENTER_OF_MAIN_PIN) + ', ' + (Number.parseInt(mainPinTop, 10) + window.movement.BOTTOM_OF_MAIN_PIN);
    window.map.pinsElement.appendChild(window.movement.mainMapPinElement);
  };

  var successHandler = function () {
    var successElement = document.querySelector('#success');
    var cloneSuccessElement = successElement.content.cloneNode(true);
    var successContentElement = cloneSuccessElement.querySelector('div');
    document.body.append(successContentElement);

    document.addEventListener('click', function () {
      document.body.removeChild(successContentElement);
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.universal.ESC_KEYCODE) {
        document.body.removeChild(successContentElement);
      }
    });
  };

  formElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(formElement), function () {
      updateForm();
      successHandler();
    }, window.data.errorHandler);
    evt.preventDefault();
  });

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

  var priceLimit = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var changeTypeOrPrice = function () {
    if (Number.parseInt(priceElement.value, 10) < priceLimit[typeElement.value]) {
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
