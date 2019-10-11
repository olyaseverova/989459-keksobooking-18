'use strict';

(function () {

  var roomsElement = document.querySelector('#room_number');
  var capacityElement = document.querySelector('#capacity');

  var changeRoomsOrCapacity = function () {
    if (
      (Number.parseInt(roomsElement.value, 10) <= 3 && Number.parseInt(roomsElement.value, 10) > 0
      && (capacityElement.value > roomsElement.value || capacityElement.value === '0'))
      || (roomsElement.value === '100' && capacityElement.value !== '0')) {
      capacityElement.setCustomValidity('error');
      roomsElement.setCustomValidity('error');
    } else {
      capacityElement.setCustomValidity('');
      roomsElement.setCustomValidity('');
    }
  };

  window.form = {
    changeRoomsOrCapacity: changeRoomsOrCapacity,
    roomsElement: roomsElement,
    capacityElement: capacityElement
  };

})();
