'use strict';

(function () {

  var houseTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  var activateAd = function (pin) {
    var fragmentCard = document.createDocumentFragment();

    var cardElement = document.querySelector('#card');
    var cloneCard = cardElement.content.cloneNode(true);

    var cardTitleElement = cloneCard.querySelector('.popup__title');
    cardTitleElement.textContent = pin.offer.title;

    var cardAddressElement = cloneCard.querySelector('.popup__text--address');
    cardAddressElement.textContent = pin.offer.address;

    var cardPriceElement = cloneCard.querySelector('.popup__text--price');
    cardPriceElement.textContent = pin.offer.price + '₽/ночь.';

    var cardTypeElement = cloneCard.querySelector('.popup__type');
    cardTypeElement.textContent = houseTypes[pin.offer.type];

    var stringRoom = pin.offer.rooms + '';
    stringRoom = stringRoom.substr(stringRoom.length - 1);

    var rooms = ' комнат';
    if (stringRoom > '1' && stringRoom < '5') {
      rooms = ' комнаты';
    } else if (stringRoom === '1') {
      rooms = ' комнатa';
    }
    var cardCapacityElement = cloneCard.querySelector('.popup__text--capacity');
    cardCapacityElement.textContent = pin.offer.rooms + rooms + ' для ' + pin.offer.guests + ' гост' + (pin.offer.guests === 1 ? 'я' : 'ей');

    var cardTimeElement = cloneCard.querySelector('.popup__text--time');
    cardTimeElement.textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;

    var cardFeaturesElement = cloneCard.querySelector('.popup__features');

    for (var k = cardFeaturesElement.children.length - 1; k >= 0; k--) {
      var comparison = false;
      pin.offer.features.forEach(function (feature) {
        if (('popup__feature popup__feature--' + feature) === cardFeaturesElement.children[k].className) {
          comparison = true;
        }
      });
      if (!comparison) {
        cardFeaturesElement.removeChild(cardFeaturesElement.children[k]);
      }
    }

    var cardDescriptionElement = cloneCard.querySelector('.popup__description');
    cardDescriptionElement.textContent = pin.offer.description;

    var cardPhotosElement = cloneCard.querySelector('.popup__photos');
    cardPhotosElement.innerHTML = '';
    for (var j = 0; j < pin.offer.photos.length; j++) {
      cardPhotosElement.innerHTML += '<img src="' + pin.offer.photos[j] + '" class="popup__photo" alt="Фотография жилья" width="45" height="40"></img>';
    }

    var cardAvatarElement = cloneCard.querySelector('.popup__avatar');
    cardAvatarElement.src = pin.author.avatar;

    fragmentCard.appendChild(cloneCard);
    window.map.pinsElement.appendChild(fragmentCard);
    window.data.mapElement.appendChild(cloneCard);

    var mapCard = window.map.pinsElement.querySelector('.map__card');
    var cardCloseElement = mapCard.querySelector('.popup__close');

    cardCloseElement.addEventListener('click', function () {
      window.map.pinsElement.removeChild(mapCard);
    });

    cardCloseElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.universal.ENTER_KEYCODE) {
        window.map.pinsElement.removeChild(mapCard);
      }
    });
  };

  window.card = {
    activateAd: activateAd
  };

})();
