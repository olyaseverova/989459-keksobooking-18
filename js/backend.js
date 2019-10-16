'use strict';

(function () {

  var URL = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT = 10000; // 10s

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend = {
    load: load
  };

})();
