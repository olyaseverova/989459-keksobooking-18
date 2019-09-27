'use strict';

var ADS_QUANTITY = 8;
var ads = [];

var randomInteger = function (uBound) {
  return Math.round(Math.random() * uBound);
};

var randomArrayItem = function (arr) {
  return arr[randomInteger(arr.length - 1)];
};

var randomArrayItems = function (arr) {
  var a = [];
  for (var i = 0; i < arr.length; i++) {
    if (Math.random() > 0.5) {
      a.push(arr[i]);
    }
  }
  return a;
};

var populateAds = function (blockSize) {
  for (var i = 0; i < ADS_QUANTITY; i++) {
    var ad = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': 'строка, заголовок предложения',
        'address': '600, 350',
        'price': 100,
        'type': randomArrayItem(['palace', 'flat', 'house', 'bungalo']),
        'rooms': randomInteger(9) + 1,
        'guests': randomInteger(49) + 1,
        'checkin': randomArrayItem(['12:00', '13:00', '14:00']),
        'checkout': randomArrayItem(['12:00', '13:00', '14:00']),
        'features': randomArrayItems(['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']),
        'description': 'строка с описанием',
        'photos': randomArrayItems(['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'])
      },

      'location': {
        'x': randomInteger(blockSize - 1),
        'y': randomInteger(630 - 130) + 130
      }
    };
    ads.push(ad);
  }
};

populateAds(1200);

var activeMap = document.querySelector('.map');
activeMap.classList.remove('map--faded');

var pins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var pin = document.querySelector('#pin');

for (var i = 0; i < ADS_QUANTITY; i++) {
  var clonePin = pin.content.cloneNode(true);
  var clonePinElement = clonePin.querySelector('.map__pin');
  clonePinElement.style.left = ads[i].location.x + 'px';
  clonePinElement.style.top = ads[i].location.y + 'px';
  clonePinElement.src = ads[i].author.avatar;
  clonePinElement.alt = ads[i].offer.title;
  fragment.appendChild(clonePinElement);
}

pins.appendChild(fragment);
