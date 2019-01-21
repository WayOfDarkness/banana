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

//scroll to loadmore
var load_all = false;
window.onscroll = function (e) {
  let marginBottom = 600;
  let numberArticleLoadmore = 10;
  if (!load_all && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - marginBottom) {
    viewMore(numberArticleLoadmore);
  }
};

function viewMore(numberOfArticle) {

  let arrArticle = [];

  //get array article
  for (let i = 0; i < numberOfArticle; i++) {
    let rd = Math.random()*10;
    rd=rd-rd%1;
    let temp = $('.media.media-article').eq(rd).clone();
    arrArticle.push(temp);
  }

  //appent
  arrArticle.forEach(function (article) {
    $('.editorial.river.js-load-forever-container').append(article);
  })

}
//end scroll to loadmore
//END BLOG PAGE



//ARTICLE RUN THIS CODE
if ($(".page-article").length) {

  // Outline
  var html = '';

  $('.ds-main .field--type-text-with-summary').find('h2').each(function (i, e) {
    $(this).attr('id', i);
    var g = $(this).html();
    html += `<div class="scroll-animated cursor-pointer detect-${i}" rel="#${i}">${g}</div>`;
  })

  $('.ad-299').html(html);
  if ($(".scroll-animated").length < 10) {
    console.log($(".scroll-animated").length);
    $('.ad-299').css("overflow-y","hidden");
  }

  $(".scroll-animated").click(function () {
    var id = $(this).attr('rel');
    $(".scroll-animated").removeClass('active');
    $(this).addClass('active');
    $('html,body').animate({scrollTop: $(id).offset().top - 60}, 'slow');
  });

  $.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
  
    return elementBottom > viewportTop && elementTop < viewportBottom;
  };
  
  $(window).on('resize scroll', function() {
    $('.ds-main .field--type-text-with-summary h2').each(function() {
      var content = $(this).attr('id');
      if ($(this).isInViewport()) {
        $('.detect-' + content).addClass('active');
      } else {
        $('.detect-' + content).removeClass('active');
      }
    });
  });
}
//END ARTICLE PAGE

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
    $('.filter-results.editorial.thirds').removeClass('river').addClass('grid');
  else
    $('.filter-results.editorial.thirds').removeClass('grid').addClass('river');
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

// Variables Initialization
var error_color = '#E74C3C';
var success_color = '#2C7ABE';

// Check Login
function checkLogin() {
  var isLogin = $('#isCustomerHere').val();
  return isLogin;
}

// Check Upvote
function checkUpvote() {
  if (checkLogin() != 1)
    toast('Bạn cần đăng nhập để upvote', 3000, error_color);
}

// Check Downvote
function checkDownvote() {
  if (checkLogin() != 1)
    toast('Bạn cần đăng nhập để downvote', 3000, error_color);
}

// Click Comment
function clickComment() {
  $('html,body').animate({scrollTop: $('#block-chat').offset().top - 60}, 'slow');
}

// Notification
function toast(string, milisecond, color) {
  let toast = $('.toast');
  toast.find('.toast-content').html(string);
  toast.addClass('active');
  toast.css('background-color', color);
  $('.other-effect').addClass('mario');
  setTimeout(function () {
    toast.removeClass('active');
  }, milisecond);
}
