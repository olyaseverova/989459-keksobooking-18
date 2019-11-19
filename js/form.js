'use strict';

(function () {

  var formElement = document.querySelector('.ad-form');
  var formResetElement = document.querySelector('.ad-form__reset');
  var mainPinLeft = window.movement.mainMapPinElement.style.left;
  var mainPinTop = window.movement.mainMapPinElement.style.top;
  var fieldsetsElement = formElement.querySelectorAll('fieldset');
  var mapOverlayElement = window.data.pinsElement.querySelector('.map__overlay');

  var addErrorValidity = function (element) {
    element.setCustomValidity('error');
  };

  var removeErrorValidity = function (element) {
    element.setCustomValidity('');
  };

  var roomsElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');

  var onChangeRoomsOrCapacity = function () {
    if (
      (Number.parseInt(roomsElement.value, 10) <= 3 && Number.parseInt(roomsElement.value, 10) > 0
      && (capacityElement.value > roomsElement.value || capacityElement.value === '0'))
      || (roomsElement.value === '100' && capacityElement.value !== '0')) {
      addErrorValidity(capacityElement);
      addErrorValidity(roomsElement);
    } else {
      removeErrorValidity(capacityElement);
      removeErrorValidity(roomsElement);
    }
  };

  var typeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');

  var PriceLimit = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var onChangePrice = function () {
    priceElement.placeholder = PriceLimit[typeElement.value.toUpperCase()];
    if (Number.parseInt(priceElement.value, 10) < PriceLimit[typeElement.value.toUpperCase()]) {
      addErrorValidity(priceElement);
    } else {
      removeErrorValidity(priceElement);
    }
  };

  var timeInElement = document.querySelector('#timein');
  var timeOutElement = document.querySelector('#timeout');

  var onChangeTimeIn = function () {
    timeOutElement.value = timeInElement.value;
  };

  var onChangeTimeOut = function () {
    timeInElement.value = timeOutElement.value;
  };

  var filterFormElement = document.querySelector('.map__filters');
  var filterElement = Array.from(filterFormElement.children);

  var addDisabled = function (element) {
    element.forEach(function (fieldset) {
      fieldset.setAttribute('disabled', '');
    });
  };

  var removeDisabled = function (element) {
    element.forEach(function (fieldset) {
      fieldset.removeAttribute('disabled');
    });
  };

  var onFormElementChange = function (elem, funct) {
    elem.removeEventListener('change', funct);
  };

  var updateForm = function () {
    onFormElementChange(roomsElement, onChangeRoomsOrCapacity);
    onFormElementChange(capacityElement, onChangeRoomsOrCapacity);
    onFormElementChange(typeElement, onChangePrice);
    onFormElementChange(priceElement, onChangePrice);
    onFormElementChange(timeInElement, onChangeTimeIn);
    onFormElementChange(timeOutElement, onChangeTimeOut);
    window.avatar.removePhoto();
    window.data.successHandler();
    addDisabled(filterElement);
    addDisabled(fieldsetsElement);
    formElement.reset();
    window.data.formElement.reset();
    window.movement.mainMapPinElement.style.left = mainPinLeft;
    window.movement.mainMapPinElement.style.top = mainPinTop;
    window.movement.addressElement.value = (Number.parseInt(mainPinLeft, 10) + window.movement.CENTER_OF_MAIN_PIN) + ', ' + (Number.parseInt(mainPinTop, 10) + window.movement.BOTTOM_OF_MAIN_PIN);
    formElement.classList.add('ad-form--disabled');
    window.data.mapElement.classList.add('map--faded');
    var mapPinElement = window.data.pinsElement.querySelectorAll('.map__pin');
    mapPinElement.forEach(function (pin) {
      window.data.pinsElement.removeChild(pin);
    });
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

    var onSuccessAdClick = function () {
      document.body.removeChild(successContentElement);
      document.body.removeEventListener('click', onSuccessAdClick);
    };

    var onSuccessAdKeydown = function (evt) {
      if (evt.keyCode === window.universal.ESC_KEYCODE) {
        document.body.removeChild(successContentElement);
        document.body.removeEventListener('keydown', onSuccessAdKeydown);
      }
    };

    document.body.addEventListener('click', onSuccessAdClick);
    document.body.addEventListener('keydown', onSuccessAdKeydown);
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

  window.form = {
    filterElement: filterElement,
    fieldsetsElement: fieldsetsElement,

    addDisabled: addDisabled,
    removeDisabled: removeDisabled,

    onChangeRoomsOrCapacity: onChangeRoomsOrCapacity,
    roomsElement: roomsElement,
    capacityElement: capacityElement,

    typeElement: typeElement,
    priceElement: priceElement,
    onChangePrice: onChangePrice,

    timeInElement: timeInElement,
    timeOutElement: timeOutElement,
    onChangeTimeIn: onChangeTimeIn,
    onChangeTimeOut: onChangeTimeOut
  };

})();
