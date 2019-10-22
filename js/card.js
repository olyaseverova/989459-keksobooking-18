'use strict';

(function () {

  var houseTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };


  var activateCard = function () {
    var fragmentCard = document.createDocumentFragment();

    var cardElement = document.querySelector('#card');
    var cloneCard = cardElement.content.cloneNode(true);

    var cardTitleElement = cloneCard.querySelector('.popup__title');
    cardTitleElement.textContent = window.map.firstPin.offer.title;

    var cardAddressElement = cloneCard.querySelector('.popup__text--address');
    cardAddressElement.textContent = window.map.firstPin.offer.address;

    var cardPriceElement = cloneCard.querySelector('.popup__text--price');
    cardPriceElement.textContent = window.map.firstPin.offer.address + '₽/ночь.';

    var cardTypeElement = cloneCard.querySelector('.popup__type');
    cardTypeElement.textContent = houseTypes[window.map.firstPin.offer.type];

    var cardCapacityElement = cloneCard.querySelector('.popup__text--capacity');
    cardCapacityElement.textContent = window.map.firstPin.offer.rooms + ' комнаты для ' + window.map.firstPin.offer.guests + ' гостей.';

    var cardTimeElement = cloneCard.querySelector('.popup__text--time');
    cardTimeElement.textContent = 'Заезд после ' + window.map.firstPin.offer.checkin + ', выезд до ' + window.map.firstPin.offer.checkout;

    var cardFeaturesElement = cloneCard.querySelector('.popup__features');
    for (var k = cardFeaturesElement.children.length - 1; k >= 0; k--) {
      var comparison = false;
      for (var i = 0; i < window.map.firstPin.offer.features.length; i++) {
        if (('popup__feature popup__feature--' + window.map.firstPin.offer.features[i]) === cardFeaturesElement.children[k].className) {
          comparison = true;
        }
      }
      if (!comparison) {
        cardFeaturesElement.removeChild(cardFeaturesElement.children[k]);
      }
    }

    var cardDescriptionElement = cloneCard.querySelector('.popup__description');
    cardDescriptionElement.textContent = window.map.firstPin.offer.description;

    var cardPhotosElement = cloneCard.querySelector('.popup__photos');
    cardPhotosElement.innerHTML = '';
    for (var j = 0; j < window.map.firstPin.offer.photos.length; j++) {
      cardPhotosElement.innerHTML += '<img src="' + window.map.firstPin.offer.photos[j] + '" class="popup__photo" alt="Фотография жилья" width="45" height="40"></img>';
    }

    var cardAvatarElement = cloneCard.querySelector('.popup__avatar');
    cardAvatarElement.src = window.map.firstPin.author.avatar;

    fragmentCard.appendChild(cloneCard);
    window.map.pinsElement.appendChild(fragmentCard);
    window.data.mapElement.appendChild(cloneCard);
  };

  window.card = {
    activateCard: activateCard
  };

})();
