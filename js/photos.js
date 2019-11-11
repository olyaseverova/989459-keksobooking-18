'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooserElement = document.querySelector('.ad-form-header__input');
  var avatarPreviewElement = document.querySelector('.ad-form-header__preview');
  var avatarElement = avatarPreviewElement.querySelector('img');

  var houseChooserElement = document.querySelector('.ad-form__input');
  var housePreviewElement = document.querySelector('.ad-form__photo');
  var houseElement = document.createElement('img');
  houseElement.width = '40';
  houseElement.height = '44';
  houseElement.src = 'img/muffin-grey.svg';
  houseElement.style = 'margin: 13px 15px';
  housePreviewElement.append(houseElement);

  var uploadPhotos = function (chooser, preview) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  avatarChooserElement.addEventListener('change', function () {
    uploadPhotos(avatarChooserElement, avatarElement);
  });

  houseChooserElement.addEventListener('change', function () {
    uploadPhotos(houseChooserElement, houseElement);
  });

})();
