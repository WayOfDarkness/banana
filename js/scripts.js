//ALL PAGE RUN THIS CODE
console.log('Welcome to https://choigiday.com');

//owl carousel v2
$('.owl-carousel').each(function () {
  $(this).owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 4
      }
    }
  })
})
//filter pod-header
$('.pod-header__filters-item.js-filter-option').click(function () {
  $(this).addClass('on').siblings().removeClass('on');
})
$('.pod-header__grid').click(function () {
  $(this).find('.feed-view').addClass('on').siblings().removeClass('on');
  $(this).siblings().find('.feed-view').removeClass('on');
})

//END ALL PAGE

//BLOG RUN THIS CODE
if ($(".page-blog").length) {
  console.log("Blog");

}
//END BLOG PAGE

//ARTICLE RUN THIS CODE
if ($(".page-article").length) {
  console.log("Article");
// Outline
  var html = '';

  $('.ds-main .field--type-text-with-summary').find('h2').each(function (i, e) {
    $(this).attr('id', i);
    var g = $(this).html();
    html += `<div class="scroll-animated cursor-pointer ${i % 3 == 0 ? 'active' : ''}" rel="#${i}">${g}</div>`;
  })

  $('.ad-299').html(html);

  $(".scroll-animated").click(function () {
    var id = $(this).attr('rel');
    $('html,body').animate({scrollTop: $(id).offset().top - 60}, 'slow');
  });

}
//END ARTICLE PAGE

//HOME RUN THIS CODE
if ($(".page-home").length) {
  console.log("Home");

}
//END HOME PAGE

//NEWS RUN THIS CODE
if ($(".page-news").length) {
  console.log("News");

}
//END NEWS PAGE

//REVIEWS RUN THIS CODE
if ($(".page-reviews").length) {
  console.log("Reviews");

}
//END REVIEWS PAGE

//VIDEO RUN THIS CODE
if ($(".page-Videos").length) {
  console.log("Video");

}
//END VIDEO PAGE

//WALKTHROUGH RUN THIS CODE
if ($(".page-walkthrough").length) {
  console.log("Walkthrough");

}
//END WALKTHROUGH

$('.config-tab').click(function (e) {
  var s = $(this);
  $('.config-tab').removeClass('active');
  $('.config-footer').addClass('d-none');
  s.addClass('active');
  if (s.hasClass('config-info')) $('.config-info-area').removeClass('d-none');
  else $('.config-req-area').removeClass('d-none');
})

$('.feed-view').click(function () {
  if ($(this).attr('id') == 'feed-view-grid')
    $('.filter-results.js-filter-results.editorial.thirds').removeClass('river').addClass('grid');
  else
    $('.filter-results.js-filter-results.editorial.thirds').removeClass('grid').addClass('river');
})

//click button sign in, sign up
$('.btn-signin').click(function (e) {
  showLogin();
})
$('.btn-signup').click(function (e) {
  showRegister();
})

function showRegister() {
  $('.cd-user-modal').addClass('is-visible');
  $('#cd-login').removeClass('is-selected');
  $('#cd-signup').addClass('is-selected');
  $('.cd-switcher li').eq(0).find('a').removeClass('selected');
  $('.cd-switcher li').eq(1).find('a').addClass('selected');

}

//click sort news
$('.js-filter-load-page').click(function (e) {
  var sort_value = $(this).val();
  var data_filter = $(this).data('filter');
  $(this).closest('.pod-header').find('.pod-header__item .pod-title h4').html(data_filter + ' ' + sort_value);
})

function showLogin() {
  $('.cd-user-modal').addClass('is-visible');
  $('#cd-login').addClass('is-selected');
  $('#cd-signup').removeClass('is-selected');
  $('.cd-switcher li').eq(0).find('a').addClass('selected');
  $('.cd-switcher li').eq(1).find('a').removeClass('selected');
}

function checkLogin() {
  var login = false; //test
  if (login) {
    submitNewComment();
  } else {
    showLogin();
  }
}

function submitNewComment() {
  console.log('submit new comment...');
}

//set status social mobile pos-fixed
function showSocialMobile(bool) {
  $('.social-share').attr("showSocialMobile", bool);
}

function showModalSearch(bool) {
  console.log('click', bool);
  $('body').attr('modal-search', bool);
  return false;
}

//toggle social outline menu
function toggleSocialMobile() {
  console.log('test');
  $('.block-fixed').toggleClass('show-social');
}

//go to page search
function doSearch(e) {

  if (e.which == '13') {
    var searchContent = $('#edit-keyword').val();
    console.log('search ', searchContent);
    window.location.href = "../search/";
  }
  return false;
}


//go to page search
function doSearchMobile(e) {

  if (e.which == '13') {
    var searchContent = $('#edit-keyword').val();
    console.log('search ', searchContent);
    window.location.href = "../search/";
  }
}


$('#edit-keyword').click(function (e) {
})


//check login
let isLogin = true; //test

getStatusLogin();

function getStatusLogin() {
  if (checkLogin()) {
    $('#login').addClass('d-none');
    $('.isLoginSuccess').removeClass('d-none');
    $('.hamburger-bottom').addClass('d-none');
    console.log('user is login');
  } else {
    $('#login').removeClass('d-none');
    $('.isLoginSuccess').addClass('d-none');
    $('.hamburger-bottom').removeClass('d-none');
    console.log('user is not login');
  }
}

function checkLogin() {
  if (isLogin)
    return true;
  return false;
}

function logout() {
  isLogin=false; //test
  getStatusLogin();
}

