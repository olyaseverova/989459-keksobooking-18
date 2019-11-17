'use strict';

(function () {

  var PriceTypes = {
    ANY: {min: 0, max: 100000000},
    LOW: {min: 0, max: 10000},
    MIDDLE: {min: 10000, max: 50000},
    HIGH: {min: 50000, max: 100000000}
  };

  var houseTypeElement = document.querySelector('#housing-type');
  var housePriceElement = document.querySelector('#housing-price');
  var houseRoomsElement = document.querySelector('#housing-rooms');
  var houseGuestsElement = document.querySelector('#housing-guests');
  var mapCheckbox = document.querySelectorAll('.map__checkbox');

  var filterHouses = function (ad) {
    return houseTypeElement.value === ad.offer.type || houseTypeElement.value === 'any';
  };

  var filterPrices = function (ad) {
    return PriceTypes[housePriceElement.value.toUpperCase()].min < ad.offer.price && PriceTypes[housePriceElement.value.toUpperCase()].max > ad.offer.price;
  };

  var filterRooms = function (ad) {
    return Number.parseInt(houseRoomsElement.value, 10) === ad.offer.rooms || houseRoomsElement.value === 'any';
  };

  var filterGuests = function (ad) {
    return Number.parseInt(houseGuestsElement.value, 10) === ad.offer.guests || houseGuestsElement.value === 'any';
  };

  var filterFeatures = function (ad) {
    var ok = true;
    for (var j = 0; j < mapCheckbox.length; j++) {
      ok = mapCheckbox[j].checked ? ok && ad.offer.features.includes(mapCheckbox[j].value) : ok;
    }
    return ok;
  };

  var getPreparedData = function (arr) {
    return arr.filter(function (item) {
      return filterHouses(item) && filterPrices(item) && filterRooms(item) && filterGuests(item) && filterFeatures(item);
    });
  };

  window.filter = {
    getPreparedData: getPreparedData
  };

})();
