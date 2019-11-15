'use strict';

(function () {

  var formElement = document.querySelector('.ad-form');
  var formResetElement = document.querySelector('.ad-form__reset');
  var mainPinLeft = window.movement.mainMapPinElement.style.left;
  var mainPinTop = window.movement.mainMapPinElement.style.top;
  var fieldsetsElement = formElement.querySelectorAll('fieldset');
  var mapOverlayElement = window.data.pinsElement.querySelector('.map__overlay');

  var addDisabled = function () {
    for (var i = 0; i < fieldsetsElement.length; i++) {
      fieldsetsElement[i].setAttribute('disabled', '');
    }
  };

  var removeDisabled = function () {
    for (var l = 0; l < fieldsetsElement.length; l++) {
      fieldsetsElement[l].removeAttribute('disabled');
    }
  };

  var updateForm = function () {
    window.avatar.removePhoto();
    window.insert.successHandler();
    addDisabled();
    formElement.reset();
    window.data.formElement.reset();
    window.movement.mainMapPinElement.style.left = mainPinLeft;
    window.movement.mainMapPinElement.style.top = mainPinTop;
    window.movement.addressElement.value = (Number.parseInt(mainPinLeft, 10) + window.movement.CENTER_OF_MAIN_PIN) + ', ' + (Number.parseInt(mainPinTop, 10) + window.movement.BOTTOM_OF_MAIN_PIN);
    formElement.classList.add('ad-form--disabled');
    window.data.mapElement.classList.add('map--faded');
    var mapPinElement = window.data.pinsElement.querySelectorAll('.map__pin');
    for (var i = 1; i < mapPinElement.length; i++) {
      window.data.pinsElement.removeChild(mapPinElement[i]);
    }
    var mapCardElement = window.data.pinsElement.querySelector('.map__card');
    if (mapCardElement !== null) {
      window.data.pinsElement.removeChild(mapCardElement);
    }
    window.data.pinsElement.appendChild(mapOverlayElement);
    window.data.pinsElement.appendChild(window.movement.mainMapPinElement);
  };

  var successHandler = function () {
    var successElement = document.querySelector('#success');
    var cloneSuccessElement = successElement.content.cloneNode(true);
    var successContentElement = cloneSuccessElement.querySelector('div');
    document.body.append(successContentElement);

    var closeAd = function () {
      document.body.removeChild(successContentElement);
      document.body.removeEventListener('click', closeAd);
      document.body.removeEventListener('keydown', closeAd);
    };

    document.body.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.universal.ESC_KEYCODE) {
        document.body.removeChild(successContentElement);
      }
    });

    document.body.addEventListener('click', closeAd);
  };

  formElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(formElement), function () {
      updateForm();
      successHandler();
    }, window.data.errorHandler);
    evt.preventDefault();
  });

  formResetElement.addEventListener('click', function () {
    updateForm();
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
    addDisabled: addDisabled,
    removeDisabled: removeDisabled,

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
