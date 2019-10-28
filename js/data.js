'use strict';

(function () {

  var PINS_QUANTITY = 5;

  var mapElement = document.querySelector('.map');
  var pinsElement = document.querySelector('.map__pins');
  var fragmentPin = document.createDocumentFragment();
  var mainPinElement = document.querySelector('#pin');
  var houseTypeElement = document.querySelector('#housing-type');
  var mapPinMainElement = document.querySelector('.map__pin--main');

  window.data = {
    ads: null,
    mapElement: mapElement
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
      window.card.activateAd(clonePinElement.ad);
    });

    clonePinElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.main.ENTER_KEYCODE) {
        window.card.activateAd(clonePinElement.ad);
      }
    });
  };

  var successHandler = function (data) {
    var isFirstTime = false;
    if (!window.data.ads) {
      isFirstTime = true;
      window.data.ads = data;
    }

    var pins = [];
    var k = 0;
    for (var i = 0; i < window.data.ads.length; i++) {
      if (k >= PINS_QUANTITY) {
        break;
      }
      if (isFirstTime || houseTypeElement.value === window.data.ads[i].offer.type || houseTypeElement.value === 'any') {
        pins.innerHTML = '';
        k++;
        insertPin(window.data.ads[i]);
        pins.push(window.data.ads[i]);

      }
    }

    var firstPin = pins[0];

    window.map = {
      firstPin: firstPin,
      pins: pins,
      pinsElement: pinsElement,
      fragmentPin: fragmentPin
    };
  };

  var drawPins = function () {
    window.map.pinsElement.innerHTML = '';
    window.card.activateAd(window.map.firstPin);
    window.map.pinsElement.appendChild(mapPinMainElement);
    window.map.pinsElement.appendChild(window.map.fragmentPin);
  };

  houseTypeElement.addEventListener('change', function () {
    successHandler();
    drawPins();
  });

  var errorHandler = function () {
    var errorElement = document.querySelector('#error');
    var cloneErrorElement = errorElement.content.cloneNode(true);
    var errorContentElement = cloneErrorElement.querySelector('div');
    document.body.append(errorContentElement);
  };

  window.backend.load(successHandler, errorHandler);

})();
