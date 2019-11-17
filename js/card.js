'use strict';

(function () {

  var HouseTypes = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец',
  };

  var fragmentCard = document.createDocumentFragment();
  var cardElement = document.querySelector('#card');

  var removeCard = function () {
    var mapCard = window.data.pinsElement.querySelector('.map__card');
    var cardCloseElement = mapCard.querySelector('.popup__close');

    var onCardCloseClick = function () {
      window.data.pinsElement.removeChild(mapCard);
      window.data.pinsElement.removeEventListener('click', onCardCloseClick);
    };

    var onCardCloseKeydown = function (evt) {
      if (evt.keyCode === window.universal.ENTER_KEYCODE) {
        window.data.pinsElement.removeChild(mapCard);
        window.data.pinsElement.removeEventListener('keydown', onCardCloseKeydown);
      }
    };

    cardCloseElement.addEventListener('click', onCardCloseClick);
    cardCloseElement.addEventListener('keydown', onCardCloseKeydown);
  };

  var activateAd = function (pin) {
    var cloneCard = cardElement.content.cloneNode(true);

    var cardTitleElement = cloneCard.querySelector('.popup__title');
    cardTitleElement.textContent = pin.offer.title;

    var cardAddressElement = cloneCard.querySelector('.popup__text--address');
    cardAddressElement.textContent = pin.offer.address;

    var cardPriceElement = cloneCard.querySelector('.popup__text--price');
    cardPriceElement.textContent = pin.offer.price + '₽/ночь.';

    var cardTypeElement = cloneCard.querySelector('.popup__type');
    cardTypeElement.textContent = HouseTypes[pin.offer.type];

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
    var cardFeaturesSrcElement = cardElement.content.cloneNode(true).querySelector('.popup__features');

    cardFeaturesElement.innerHTML = '';
    pin.offer.features.forEach(function (feature) {
      cardFeaturesElement.appendChild(cardFeaturesSrcElement.querySelector('.popup__feature--' + feature));
    });

    var cardDescriptionElement = cloneCard.querySelector('.popup__description');
    cardDescriptionElement.textContent = pin.offer.description;

    var cardPhotosElement = cloneCard.querySelector('.popup__photos');
    cardPhotosElement.innerHTML = '';

    pin.offer.photos.forEach(function (photo) {
      cardPhotosElement.innerHTML += '<img src="' + photo + '" class="popup__photo" alt="Фотография жилья" width="45" height="40"></img>';
    });

    var cardAvatarElement = cloneCard.querySelector('.popup__avatar');
    cardAvatarElement.src = pin.author.avatar;

    fragmentCard.appendChild(cloneCard);
    window.data.pinsElement.appendChild(fragmentCard);
    window.data.mapElement.appendChild(cloneCard);
    removeCard();
  };

  window.card = {
    activateAd: activateAd
  };

})();
