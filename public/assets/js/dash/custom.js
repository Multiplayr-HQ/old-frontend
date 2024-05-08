$(document).ready(function () {
  $('a.hideShow').click(function () {
    $(this).toggleClass('up');
    $(this).next().slideToggle();
  });

  $('.overhight').mCustomScrollbar({
    autoHideScrollbar: true
  });

  $('.bellHight').mCustomScrollbar({
    autoHideScrollbar: true
  });

  $('.tab_data_scroll').mCustomScrollbar({
    autoHideScrollbar: true
  });

  $('a.view').click(function () {
    $(this).parent().next().addClass('show');
  });

  $('.squads_close').click(function () {
    $(this).parent().removeClass('show');
  });

  /* ----------- create post slider ----------------- */

  $('.user_slider').slick({
    infinite: false,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });

  $('.edit_slider').slick({
    infinite: false,
    vertical: false,
    verticalSwiping: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });

  /* ----------- input type file tabs ----------------- */

  if (window.File && window.FileList && window.FileReader) {
    $('#files').on('change', function (e) {
      var files = e.target.files,
        filesLength = files.length;
      for (var i = 0; i < filesLength; i++) {
        var f = files[i];
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
          var file = e.target;
          $(
            '<span class="image_box">' +
              '<img class="imageThumb" src="' +
              e.target.result +
              '" title="' +
              file.name +
              '"/>' +
              '<br/><span class="remove">X</span>' +
              '</span>'
          ).insertAfter('#files');
          $('.remove').click(function () {
            $(this).parent('.image_box').remove();
          });
        };
        fileReader.readAsDataURL(f);
      }
    });
  } else {
    alert("Your browser doesn't support to File API");
  }

  $('.left_side').hover(function () {
    $('.logo').toggleClass('bigwidth');
  });

  /* ----------- chat tabs ----------------- */

  jQuery('.dlab-chat-user-box .dlab-chat-user').on('click', function () {
    jQuery('.dlab-chat-user-box').addClass('d-none');
    jQuery('.dlab-chat-history-box').removeClass('d-none');
    //$(".chatbox .msg_card_body").height(vHeightArea());
    //$(".chatbox .msg_card_body").css('height',vHeightArea());
  });

  jQuery('.dlab-chat-history-back').on('click', function () {
    jQuery('.dlab-chat-user-box').removeClass('d-none');
    jQuery('.dlab-chat-history-box').addClass('d-none');
  });

  jQuery('.dlab-fullscreen').on('click', function () {
    jQuery('.dlab-fullscreen').toggleClass('active');
  });

  jQuery('.open_chat_box').on('click', function () {
    jQuery('.chatbox').addClass('active');
  });
  jQuery('.chatbox-close').on('click', function () {
    jQuery('.chatbox').removeClass('active');
  });

  /* -------  Profile ------------*/

  $('.profile_tab_btn li a').click(function () {
    $('.prfoile_tab_data .tab').addClass('hide');
    var rel = jQuery(this).attr('rel');
    $('#' + rel).removeClass('hide');
    $('.profile_tab_btn li a').parent().removeClass('active');
    $(this).parent().addClass('active');
  });

  /* ----------- team ---------------- */

  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    infinite: false,
    fade: false
  });

  $('.fancybox').fancybox();
  $('.quickpoup').fancybox({
    wrapCSS: 'quickcss',
    width: 1200,
    height: 600,
    autoSize: false
  });

  $('.videos').fancybox({
    wrapCSS: 'videocss',
    width: 600,
    height: 400,
    autoSize: false
  });

  $('.size-option ul li')
    .css({ cursor: 'pointer' })
    .on('click', function () {
      $(this)
        .parent()
        .find('li')
        .not($(this))
        .removeClass('active')
        .find('ul')
        .hide();
      $(this)
        .parent()
        .find('li')
        .not($(this))
        .removeClass('active')
        .find('.size-chart')
        .hide();
      $(this).toggleClass('active');
      //(this).parent().find('li').hide();

      $(this).find('ul').toggle();
      $(this).find('.size-chart').toggle();
    });

  (function ($) {
    $(window).load(function () {
      $('.content').mCustomScrollbar();
    });
  });

  if (screen.width <= 767) {
    $('.top_click').click(function () {
      $('.left_side').toggleClass('show_left_menu');

      $(this).toggleClass('active');
    });
  }

  var options = [];

  $('.dropdown-menu a').on('click', function (event) {
    var $target = $(event.currentTarget),
      val = $target.attr('data-value'),
      $inp = $target.find('input'),
      idx;

    if ((idx = options.indexOf(val)) > -1) {
      options.splice(idx, 1);
      setTimeout(function () {
        $inp.prop('checked', false);
      }, 0);
    } else {
      options.push(val);
      setTimeout(function () {
        $inp.prop('checked', true);
      }, 0);
    }

    $(event.target).blur();

    console.log(options);
    return false;
  });
});
