'use strict';

(function () {

  var PINS_QUANTITY = 5;

  var pinsElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var mainPinElement = document.querySelector('#pin');
  var typeElement = document.querySelector('#type');

  window.data = {
    ads: null,
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
      if (isFirstTime || typeElement.value === window.data.ads[i].offer.type) {
        k++;
        var clonePin = mainPinElement.content.cloneNode(true);
        var clonePinElement = clonePin.querySelector('.map__pin');
        var pinImageElement = clonePinElement.querySelector('img');
        clonePinElement.style.left = window.data.ads[i].location.x + 'px';
        clonePinElement.style.top = window.data.ads[i].location.y + 'px';
        pinImageElement.src = window.data.ads[i].author.avatar;
        pinImageElement.alt = window.data.ads[i].offer.title;
        fragment.appendChild(clonePinElement);
      }
    }

    window.map = {
      pinsElement: pinsElement,
      fragment: fragment
    };
  };

  typeElement.addEventListener('change', function () {
    successHandler();
    window.map.pinsElement.innerHTML = '';
    window.map.pinsElement.appendChild(window.map.fragment);
  });

  var errorHandler = function () {
    var errorElement = document.querySelector('#error');
    var cloneErrorElement = errorElement.content.cloneNode(true);
    var errorContentElement = cloneErrorElement.querySelector('div');
    document.body.append(errorContentElement);
  };

  window.backend.load(successHandler, errorHandler);

})();
