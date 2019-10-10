'use strict';

(function () {

  var pinsElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var mainPinElement = document.querySelector('#pin');

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

  window.pins = {
    pinsElement: pinsElement,
    fragment: fragment
  };

})();
