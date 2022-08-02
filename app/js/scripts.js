// let headerHeight = $('.header').innerHeight();

// function footerFix() {
// headerHeight = $('.header').innerHeight();
// let footerHeight = $('.footer').innerHeight();
// $('body').css('padding-bottom', footerHeight + 'px');
// }

// $(window).on('load resize', footerFix);

$(document).ready(function () {

  $('form').each(function () {
    const form = $(this);
    const fileLabel = form.find('label[class*="file"]');
    const fileInput = fileLabel.find('input[type="file"]');
    const fileName = fileLabel.find('.name');
    const fileDelete = fileLabel.next('.delete');
    const phone = $(this).find('input[name*="phone"]');
    const privacyLabel = $(this).find('label[class*="privacy"]');
    const privacyInput = privacyLabel.find('input');

    // Для чекбоксов и радио

    privacyLabel.on('click', function () {
      if (privacyInput.attr('type') == 'checkbox') {
        privacyInput.is(':checked')
          ? privacyLabel.addClass('active')
          : privacyLabel.removeClass('active');
      } else if (privacyInput.attr('type') == 'radio') {
        privacyInput.is(':checked')
          ? (privacyLabel.siblings().removeClass('active'), privacyLabel.addClass('active'))
          : privacyLabel.removeClass('active');
      }
    });

    // Для телефонов

    phone.each(function () {
      $(this).inputmask("+7 (999) 999-99-99");
    });

    // Для файла

    function onFileDelete() {
      fileInput.val('');
      fileName.text(fileLabel.data('name'));
      fileDelete.css('display', 'none');
    }

    function onFileChange() {
      const fileVal = $(this).val().replace(/.+[\\\/]/, '');
      if (fileVal !== '') {
        fileName.text(fileVal);
        fileDelete.css('display', 'block');
      } else onFileDelete
    }

    fileName.text(fileLabel.data('name'));
    fileDelete.css('display', 'none');

    fileInput.on('change', onFileChange);
    fileDelete.on('click', onFileDelete);

    // По отправке формы

    form.on('submit', function () {
      privacyLabel.removeClass('active');
    });
  });

  $(window).on('scroll load', function () {
    $(this).scrollTop() > 600
      ? $('#top').addClass('active')
      : $('#top').removeClass('active');
  });

  $('#top').click(function () {
    $('body, html').animate({ scrollTop: 0 }, 500);
  });

  $(document).on("submit", "form", function () {
    let formData = new FormData(this);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/send.php");
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          data = xhr.responseText
          if (data) {
            $.magnificPopup.close();
            $.magnificPopup.open({
              items: {
                src: '<div class="modal-popup-block">' + data + '</div>'
              },
              type: 'inline',
            }, 0);
            // setTimeout(function () {
            //   $.magnificPopup.close();
            // }, 3000);
          }
        }
      }
    }
    xhr.send(formData);
    $(this)[0].reset();
    return false;
  });

  $('.menu-toggle .icon-toggle').click(function () {
    $(this).toggleClass('active');
    $('.main-menu').slideToggle();
    return false;
  });

  if ($(window).width() <= 768) {
    $('.main-menu__link').on('click', function () {
      $('.main-menu').slideUp();
      $('.menu-toggle .icon-toggle').removeClass('active');
    });
  }

  $('.what__item, a[href="#order"]').magnificPopup({
    type: 'inline',
  });

  // $('image').magnificPopup({
  //   type: 'image',
  //   closeOnContentClick: true,
  //   mainClass: 'mfp-img-mobile',
  //   removalDelay: 300,
  //   mainClass: 'mfp-fade',
  //   image: {
  //     verticalFit: true
  //   }
  // });

  // $('gallery').each(function () {
  //   $(this).magnificPopup({
  //     delegate: 'a',
  //     type: 'image',
  //     removalDelay: 300,
  //     mainClass: 'mfp-fade',
  //     gallery: {
  //       enabled: true
  //     }
  //   });
  // });

  $(".tabs").each(function () {
    let tabs = $(this);
    let tabsControls = tabs.find('.tabs__control');
    let tabsContents = tabs.find('.tabs__content');
    $(tabsContents).not(tabsContents[0]).css('display', 'none');
    $(tabsControls[0]).addClass('active');
    $(tabsControls).click(function (event) {
      event.preventDefault();
      tabsControls.removeClass('active');
      $(this).addClass('active');
      let index = $(this).index();
      tabsContents.css('display', 'none');
      tabsContents.eq(index).fadeIn(400);
    });
  });

  $(document).on('click', '.goto', function (event) {
    event.preventDefault();
    let id = $(this).attr('href');
    let top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top }, 500);
  });

  var swiperReviews = new Swiper('.reviews .swiper-container', {
    centeredSlides: true,
    loop: true,
    slidesPerView: 3.3001,
    slidesOffsetBefore: 295,
    spaceBetween: 30,
    pagination: {
      el: '.reviews .swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesOffsetBefore: 0
      },
      576: {
        slidesPerView: 2,
        slidesOffsetBefore: 0
      },
      992: {
        slidesPerView: 3.3001,
        slidesOffsetBefore: 295,
      },
    }
  });

  var swiperModals = new Swiper('.modal .swiper-container', {
    loop: true,
    slidesPerView: 1,
    pagination: {
      el: '.modal .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    observer: true,
    observeParents: true,
  });

  var swiperDelivered = new Swiper('.delivered .swiper-container', {
    slidesPerView: 3,
    slidesPerColumn: 2,
    spaceBetween: 30,
    pagination: {
      el: '.delivered .swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerColumn: 2,
      },
      768: {
        slidesPerView: 2,
        slidesPerColumn: 2,
      },
      1200: {
        slidesPerView: 3,
        slidesPerColumn: 2,
      },
    }
  });

  var galleryThumbs = new Swiper('.intro .gallery-thumbs', {
    spaceBetween: 10,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });

  var galleryTop = new Swiper('.intro .gallery-top', {
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    thumbs: {
      swiper: galleryThumbs
    }
  });

  wow = new WOW(
    {
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true
    }
  );
  wow.init();

  $('.btn').on('click', function () {
    let subject = $(this).data('subject');
    if (subject) {
      $('.order-form__subject').val(subject);
    }

  });

});
