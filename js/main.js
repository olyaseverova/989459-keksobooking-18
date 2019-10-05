'use strict';

var ADS_QUANTITY = 8;
var ENTER_KEYCODE = 13;

var getRandomInteger = function (uBound) {
  return Math.round(Math.random() * uBound);
};

var getRandomArrayItem = function (arr) {
  return arr[getRandomInteger(arr.length - 1)];
};

var mixElements = function (arr) {
  var a = [];
  for (var i = 0; i < arr.length; i++) {
    a.push(arr[i]);
  }
  var mixed = [];
  for (var j = a.length - 1; j >= 0; j--) {
    var indexOfA = getRandomInteger(j);
    mixed.push(a[indexOfA]);
    a.splice(indexOfA, 1);
  }
  return mixed;
};

var getRandomArrayItems = function (arr) {
  var b = [];
  for (var k = 0; k < arr.length; k++) {
    if (Math.random() > 0.5) {
      b.push(arr[k]);
    }
  }
  return mixElements(b);
};

var populateAds = function (blockSize) {
  var adsArray = [];
  for (var i = 0; i < ADS_QUANTITY; i++) {
    var ad = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': 'строка, заголовок предложения',
        'address': '600, 350',
        'price': 100,
        'type': getRandomArrayItem(['palace', 'flat', 'house', 'bungalo']),
        'rooms': getRandomInteger(9) + 1,
        'guests': getRandomInteger(49) + 1,
        'checkin': getRandomArrayItem(['12:00', '13:00', '14:00']),
        'checkout': getRandomArrayItem(['12:00', '13:00', '14:00']),
        'features': getRandomArrayItems(['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']),
        'description': 'строка с описанием',
        'photos': getRandomArrayItems(['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'])
      },

      'location': {
        'x': getRandomInteger(blockSize - 1),
        'y': getRandomInteger(630 - 130) + 130
      }
    };
    adsArray.push(ad);
  }
  return adsArray;
};

var ads = populateAds(1200);

var activateMap = function () {
  var mapElement = document.querySelector('.map');
  mapElement.classList.remove('map--faded');
};

var activateForm = function () {
  var formElement = document.querySelector('.ad-form');
  formElement.classList.remove('ad-form--disabled');
};

var pinsElement = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var mainPinElement = document.querySelector('#pin');

for (var i = 0; i < ADS_QUANTITY; i++) {
  var clonePin = mainPinElement.content.cloneNode(true);
  var clonePinElement = clonePin.querySelector('.map__pin');
  var pinImageElement = clonePinElement.querySelector('img');
  clonePinElement.style.left = ads[i].location.x + 'px';
  clonePinElement.style.top = ads[i].location.y + 'px';
  pinImageElement.src = ads[i].author.avatar;
  pinImageElement.alt = ads[i].offer.title;
  fragment.appendChild(clonePinElement);
}

var mainMapPinElement = document.querySelector('.map__pin--main');

var addressElement = document.querySelector('#address');

var centerOfMainPin = 32;
var bottomOfMainPinY = 75;

var addressX = Number.parseInt(mainMapPinElement.style.left, 10) + centerOfMainPin;
var addressY = Number.parseInt(mainMapPinElement.style.top, 10) + centerOfMainPin;
var addressBottomY = Number.parseInt(mainMapPinElement.style.top, 10) + bottomOfMainPinY;

addressElement.value = addressX + ', ' + addressY;

var changeAddressCoordinates = function () {
  addressElement.value = addressX + ', ' + addressBottomY;
};

var roomsElement = document.querySelector('#room_number');
var capacityElement = document.querySelector('#capacity');

var changeCapacity = function () {
  capacityElement.value = roomsElement.value;
  if (roomsElement.value === '100') {
    capacityElement.value = '0';
  }
};

var changeRooms = function () {
  roomsElement.value = capacityElement.value;
  if (capacityElement.value === '0') {
    roomsElement.value = '100';
  }
};

var pushMainPin = function () {
  activateMap();
  activateForm();
  changeAddressCoordinates();
  pinsElement.appendChild(fragment);

  roomsElement.addEventListener('mousedown', function () {
    changeCapacity();
  });

  roomsElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      changeCapacity();
    }
  });

  capacityElement.addEventListener('mousedown', function () {
    changeRooms();
  });

  capacityElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      changeRooms();
    }
  });
};

mainMapPinElement.addEventListener('mousedown', function () {
  pushMainPin();
});

mainMapPinElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    pushMainPin();
  }
});
