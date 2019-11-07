'use strict';

(function () {

  var PINS_QUANTITY = 5;

  var priceTypes = {
    any: {min: 0, max: 100000000},
    low: {min: 0, max: 10000},
    middle: {min: 10000, max: 50000},
    high: {min: 50000, max: 100000000}
  };

  var mapElement = document.querySelector('.map');
  var pinsElement = document.querySelector('.map__pins');
  var fragmentPin = document.createDocumentFragment();
  var mainPinElement = document.querySelector('#pin');
  var houseTypeElement = document.querySelector('#housing-type');
  var housePriceElement = document.querySelector('#housing-price');
  var houseRoomsElement = document.querySelector('#housing-rooms');
  var houseGuestsElement = document.querySelector('#housing-guests');
  var mapCheckbox = document.querySelectorAll('.map__checkbox');

  var wifiFeature = mapCheckbox[0];
  var dishwasherFeature = mapCheckbox[1];
  var parkingFeature = mapCheckbox[2];
  var washerFeature = mapCheckbox[3];
  var elevatorFeature = mapCheckbox[4];
  var conditionerFeature = mapCheckbox[5];

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
    errorHandler: errorHandler
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

  var successHandler = function (data) {
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
      var ok = isFirstTime || (houseTypeElement.value === window.data.ads[i].offer.type || houseTypeElement.value === 'any')
        && (priceTypes[housePriceElement.value].min < window.data.ads[i].offer.price && priceTypes[housePriceElement.value].max > window.data.ads[i].offer.price)
        && (Number.parseInt(houseRoomsElement.value, 10) === window.data.ads[i].offer.rooms || houseRoomsElement.value === 'any')
        && (Number.parseInt(houseGuestsElement.value, 10) === window.data.ads[i].offer.guests || houseGuestsElement.value === 'any');

      ok = wifiFeature.checked ? ok && window.data.ads[i].offer.features.includes('wifi') : ok;
      ok = dishwasherFeature.checked ? ok && window.data.ads[i].offer.features.includes('dishwasher') : ok;
      ok = parkingFeature.checked ? ok && window.data.ads[i].offer.features.includes('parking') : ok;
      ok = washerFeature.checked ? ok && window.data.ads[i].offer.features.includes('washer') : ok;
      ok = elevatorFeature.checked ? ok && window.data.ads[i].offer.features.includes('elevator') : ok;
      ok = conditionerFeature.checked ? ok && window.data.ads[i].offer.features.includes('conditioner') : ok;

      if (ok) {
        k++;
        insertPin(window.data.ads[i]);
      }
    }

    window.map = {
      pinsElement: pinsElement,
      fragmentPin: fragmentPin
    };

  };

  var drawPins = function () {
    pinsElement.innerHTML = '';
    pinsElement.appendChild(window.movement.mainMapPinElement);
    pinsElement.appendChild(window.map.fragmentPin);
  };

  houseTypeElement.addEventListener('change', function () {
    successHandler();
    drawPins();
  });

  housePriceElement.addEventListener('change', function () {
    successHandler();
    drawPins();
  });

  houseRoomsElement.addEventListener('change', function () {
    successHandler();
    drawPins();
  });

  houseGuestsElement.addEventListener('change', function () {
    successHandler();
    drawPins();
  });

  wifiFeature.addEventListener('change', function () {
    successHandler();
    drawPins();
  });

  dishwasherFeature.addEventListener('change', function () {
    successHandler();
    drawPins();
  });

  parkingFeature.addEventListener('change', function () {
    successHandler();
    drawPins();
  });

  washerFeature.addEventListener('change', function () {
    successHandler();
    drawPins();
  });

  elevatorFeature.addEventListener('change', function () {
    successHandler();
    drawPins();
  });

  conditionerFeature.addEventListener('change', function () {
    successHandler();
    drawPins();
  });


  window.backend.load(successHandler, errorHandler);

})();
