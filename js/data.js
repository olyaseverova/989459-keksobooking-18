'use strict';

(function () {

  var ADS_QUANTITY = 8;

  var pinsElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var mainPinElement = document.querySelector('#pin');

  window.data = {
    ads: null,
    ADS_QUANTITY: ADS_QUANTITY
  };

  var successHandler = function (data) {
    window.data.ads = data;

    for (var i = 0; i < window.data.ADS_QUANTITY; i++) {
      var clonePin = mainPinElement.content.cloneNode(true);
      var clonePinElement = clonePin.querySelector('.map__pin');
      var pinImageElement = clonePinElement.querySelector('img');
      clonePinElement.style.left = window.data.ads[i].location.x + 'px';
      clonePinElement.style.top = window.data.ads[i].location.y + 'px';
      pinImageElement.src = window.data.ads[i].author.avatar;
      pinImageElement.alt = window.data.ads[i].offer.title;
      fragment.appendChild(clonePinElement);
    }

    window.map = {
      pinsElement: pinsElement,
      fragment: fragment
    };
  };

  var errorHandler = function () {
    var errorElement = document.querySelector('#error');
    var cloneErrorElement = errorElement.content.cloneNode(true);
    var errorContentElement = cloneErrorElement.querySelector('div');
    document.body.append(errorContentElement);
  };

  window.backend.load(successHandler, errorHandler);

})();
