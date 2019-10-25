'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var cardElement = document.querySelector('#card');
  var cloneCard = cardElement.content.cloneNode(true);
  var mapCard = cloneCard.querySelector('.map__card');
  var cardCloseElement = mapCard.querySelector('.popup__close');

  cardCloseElement.addEventListener('click', function () {
    // alert(1);
    cardElement.removeChild(cloneCard);
  });

  cardCloseElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      cardElement.removeChild(cloneCard);
    }
  });

})();
