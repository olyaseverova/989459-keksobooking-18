'use strict';

(function () {

  var PINS_QUANTITY = 5;

  var PriceTypes = {
    ANY: {min: 0, max: 100000000},
    LOW: {min: 0, max: 10000},
    MIDDLE: {min: 10000, max: 50000},
    HIGH: {min: 50000, max: 100000000}
  };

  var formElement = document.querySelector('.map__filters');
  var mapElement = document.querySelector('.map');
  var pinsElement = document.querySelector('.map__pins');
  var fragmentPin = document.createDocumentFragment();
  var mainPinElement = document.querySelector('#pin');

  var houseTypeElement = document.querySelector('#housing-type');
  var housePriceElement = document.querySelector('#housing-price');
  var houseRoomsElement = document.querySelector('#housing-rooms');
  var houseGuestsElement = document.querySelector('#housing-guests');
  var mapCheckbox = document.querySelectorAll('.map__checkbox');

  var errorHandler = function () {
    var errorElement = document.querySelector('#error');
    var cloneErrorElement = errorElement.content.cloneNode(true);
    var errorContentElement = cloneErrorElement.querySelector('div');
    document.body.append(errorContentElement);

    document.addEventListener('click', function () {
      document.body.removeChild(errorContentElement);
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.universal.ESC_KEYCODE) {
        document.body.removeChild(errorContentElement);
      }
    });
  };

  window.data = {
    ads: null,
    mapElement: mapElement,
    errorHandler: errorHandler,
    formElement: formElement
  };

  var insertPin = function (ad) {
    var clonePin = mainPinElement.content.cloneNode(true);
    var clonePinElement = clonePin.querySelector('.map__pin');
    var pinImageElement = clonePinElement.querySelector('img');
    clonePinElement.style.left = ad.location.x + 'px';
    clonePinElement.style.top = ad.location.y + 'px';
    pinImageElement.src = ad.author.avatar;
    pinImageElement.alt = ad.offer.title;
    clonePinElement.ad = ad;
    fragmentPin.appendChild(clonePinElement);

    clonePinElement.addEventListener('mousedown', function () {
      var mapCard = pinsElement.querySelector('.map__card');
      if (mapCard !== null) {
        pinsElement.removeChild(mapCard);
      }
      window.card.activateAd(clonePinElement.ad);
    });

    clonePinElement.addEventListener('keydown', function (evt) {
      var mapCard = pinsElement.querySelector('.map__card');
      if (evt.keyCode === window.universal.ENTER_KEYCODE) {
        window.card.activateAd(clonePinElement.ad);
      }
      if (mapCard !== null && evt.keyCode === window.universal.ENTER_KEYCODE) {
        pinsElement.removeChild(mapCard);
      }
      if (mapCard !== null && evt.keyCode === window.universal.ESC_KEYCODE) {
        pinsElement.removeChild(mapCard);
      }
    });
  };

  var isAdOk = function (ad) {
    var ok = true;
    ok = ok && (houseTypeElement.value === ad.offer.type || houseTypeElement.value === 'any');
    ok = ok && (PriceTypes[housePriceElement.value.toUpperCase()].min < ad.offer.price && PriceTypes[housePriceElement.value.toUpperCase()].max > ad.offer.price);
    ok = ok && (Number.parseInt(houseRoomsElement.value, 10) === ad.offer.rooms || houseRoomsElement.value === 'any');
    ok = ok && (Number.parseInt(houseGuestsElement.value, 10) === ad.offer.guests || houseGuestsElement.value === 'any');

    for (var j = 0; j < mapCheckbox.length; j++) {
      ok = mapCheckbox[j].checked ? ok && ad.offer.features.includes(mapCheckbox[j].value) : ok;
    }
    return ok;
  };

  var successHandler = window.debounce(function (data) {
    var isFirstTime = false;
    if (!window.data.ads) {
      isFirstTime = true;
      window.data.ads = data;
    }

    var k = 0;
    for (var i = 0; i < window.data.ads.length; i++) {
      if (k >= PINS_QUANTITY) {
        break;
      }
      if (isFirstTime || isAdOk(window.data.ads[i])) {
        k++;
        insertPin(window.data.ads[i]);
      }
    }

    window.map = {
      pinsElement: pinsElement,
      fragmentPin: fragmentPin
    };

  });

  var drawPins = window.debounce(function () {
    pinsElement.innerHTML = '';
    pinsElement.appendChild(window.movement.mainMapPinElement);
    pinsElement.appendChild(window.map.fragmentPin);
  });

  formElement.addEventListener('change', function (evt) {
    if (evt.target.classList.contains('map__filter') || evt.target.classList.contains('map__checkbox')) {
      successHandler();
      drawPins();
    }
  });

  window.backend.load(successHandler, errorHandler);

})();
