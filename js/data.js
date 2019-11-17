'use strict';

(function () {

  var PINS_QUANTITY = 5;

  var formElement = document.querySelector('.map__filters');
  var mapElement = document.querySelector('.map');
  var pinsElement = document.querySelector('.map__pins');
  var fragmentPin = document.createDocumentFragment();
  var mainPinElement = document.querySelector('#pin');
  var errorElement = document.querySelector('#error');
  var isFirstTime = false;

  var errorHandler = function () {
    var cloneErrorElement = errorElement.content.cloneNode(true);
    var errorContentElement = cloneErrorElement.querySelector('div');
    document.body.append(errorContentElement);

    var onErrorAdClick = function () {
      document.body.removeChild(errorContentElement);
      document.body.removeEventListener('click', onErrorAdClick);
    };

    var onErrorAdKeydown = function (evt) {
      if (evt.keyCode === window.universal.ESC_KEYCODE) {
        document.body.removeChild(errorContentElement);
        document.body.removeEventListener('keydown', onErrorAdKeydown);
      }
    };

    document.body.addEventListener('click', onErrorAdClick);
    document.addEventListener('keydown', onErrorAdKeydown);
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

  var successHandler = window.debounce(function (data) {
    if (!window.data.ads) {
      isFirstTime = true;
      window.data.ads = data;
    } else {
      isFirstTime = false;
    }
    window.filter.getPreparedData(window.data.ads).slice(0, PINS_QUANTITY).forEach(function (ad) {
      insertPin(ad);
    });
  });

  var drawPins = window.debounce(function () {
    pinsElement.innerHTML = '';
    pinsElement.appendChild(window.movement.mainMapPinElement);
    pinsElement.appendChild(fragmentPin);
  });

  formElement.addEventListener('change', function (evt) {
    if (evt.target.classList.contains('map__filter') || evt.target.classList.contains('map__checkbox')) {
      successHandler();
      drawPins();
    }
  });

  window.backend.load(successHandler, errorHandler);

  window.data = {
    ads: null,
    isFirstTime: isFirstTime,
    fragmentPin: fragmentPin,
    mapElement: mapElement,
    errorHandler: errorHandler,
    formElement: formElement,
    pinsElement: pinsElement,
    PINS_QUANTITY: PINS_QUANTITY,
    successHandler: successHandler
  };

})();
