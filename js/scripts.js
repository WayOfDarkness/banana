//ALL PAGE RUN THIS CODE
console.log('Welcome to https://choigiday.com');
//d-none btn-dev if page != demo
if (window.location.host.indexOf('demo.') == -1) {
  $('.dev-test').remove();
}

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
// window.onscroll = function (e) {
//   let marginBottom = 600;
//   let numberArticleLoadmore = 10;
//   if (!load_all && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - marginBottom) {
//     viewMore(numberArticleLoadmore);
//   }
// };

function loadmoreArticle() {
  let numberArticleLoadmore = 10;
  viewMore(numberArticleLoadmore);
}

function viewMore(numberOfArticle) {

  let arrArticle = [];

  //get array article
  for (let i = 0; i < numberOfArticle; i++) {
    let rd = Math.random() * 10;
    rd = rd - rd % 1;
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

  $(".scroll-animated").click(function () {
    var id = $(this).attr('rel');
    $(".scroll-animated").removeClass('active');
    $(this).addClass('active');
    $('html,body').animate({scrollTop: $(id).offset().top - 60}, 'slow');
  });

  $.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  $(window).on('resize scroll', function () {
    $('.ds-main .field--type-text-with-summary h2').each(function () {
      var content = $(this).attr('id');
      if ($(this).isInViewport()) {
        $('.detect-' + content).addClass('active');
      } else {
        $('.detect-' + content).removeClass('active');
      }
    });
  });

  if ($(".scroll-animated").length < 10)
    $('.ad-299').css("overflow-y", "hidden");
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

// Change Articles Layout In Blog Pages
$('.feed-view').click(function () {
  if ($(this).attr('id') == 'feed-view-grid')
    $('.filter-results.editorial.thirds').removeClass('river').addClass('grid');
  else
    $('.filter-results.editorial.thirds').removeClass('grid').addClass('river');
})

// Click SignIn & SignUp button
$('.btn-signin').click(function (e) {
  showLogin();
})
$('.btn-signup').click(function (e) {
  showRegister();
})

// Show Register Form
function showRegister() {
  $('.cd-user-modal').addClass('is-visible');
  $('#cd-login').removeClass('is-selected');
  $('#cd-signup').addClass('is-selected');
  $('.cd-switcher li').eq(0).find('a').removeClass('selected');
  $('.cd-switcher li').eq(1).find('a').addClass('selected');
}

// Show Login Form
function showLogin() {
  $('.cd-user-modal').addClass('is-visible');
  $('#cd-login').addClass('is-selected');
  $('#cd-signup').removeClass('is-selected');
  $('.cd-switcher li').eq(0).find('a').addClass('selected');
  $('.cd-switcher li').eq(1).find('a').removeClass('selected');
}

// Click Sort Posts
$('.js-filter-load-page').click(function (e) {
  var sort_value = $(this).find('option:selected').data('title');
  var data_filter = $(this).data('filter');
  $(this).closest('.pod-header').find('.pod-header__item .pod-title h4').html(data_filter + ' ' + sort_value);
})

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
    window.location.href = `/tim-kiem?type=article&q=${searchContent}`;
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
var default_color = '#656565';

// Check Login
function checkLogin() {
  var isLogin = $('#isCustomerHere').val();
  return isLogin;
}

// Check Like Status of User
var likeStatus = $('#article_like_status').val();
if (likeStatus == 'like') $('.social-share-button .upvote svg').css('fill', success_color);
else if (likeStatus == 'dislike') $('.social-share-button .downvote svg').css('fill', success_color);

// Check Upvote
function checkUpvote() {
  if (checkLogin() != 1)
    toast('Bạn cần đăng nhập để upvote', 3000, error_color);
  else {
    var id = $('#article_id').val();
    var current_like = parseInt($('.social-share-button .upvote').next('i').html());
    var current_dislike = parseInt($('.social-share-button .downvote').next('i').html());
    $.ajax({
      url: `/api/react/${id}/like`,
      type: "POST",
      success: function () {
        if (likeStatus == 'none') {
          $('.social-share-button .upvote svg').css('fill', success_color);
          $('.social-share-button .upvote').next('i').html(current_like + 1);
          likeStatus = 'like';
        } else if (likeStatus == 'like') {
          $('.social-share-button .upvote svg').css('fill', default_color);
          $('.social-share-button .upvote').next('i').html(current_like - 1);
          likeStatus = 'none';
        } else {
          $('.social-share-button .upvote svg').css('fill', success_color);
          $('.social-share-button .downvote svg').css('fill', default_color);
          $('.social-share-button .upvote').next('i').html(current_like + 1);
          $('.social-share-button .downvote').next('i').html(current_dislike - 1);
          likeStatus = 'like';
        }
      }
    });
  }
}

// Check Downvote
function checkDownvote() {
  if (checkLogin() != 1)
    toast('Bạn cần đăng nhập để downvote', 3000, error_color);
  else {
    var id = $('#article_id').val();
    var current_like = parseInt($('.social-share-button .upvote').next('i').html());
    var current_dislike = parseInt($('.social-share-button .downvote').next('i').html());
    $.ajax({
      url: `/api/react/${id}/dislike`,
      type: "POST",
      success: function () {
        if (likeStatus == 'none') {
          $('.social-share-button .downvote svg').css('fill', success_color);
          $('.social-share-button .downvote').next('i').html(current_dislike + 1);
          likeStatus = 'dislike';
        } else if (likeStatus == 'dislike') {
          $('.social-share-button .downvote svg').css('fill', default_color);
          $('.social-share-button .downvote').next('i').html(current_dislike - 1);
          likeStatus = 'none';
        } else {
          $('.social-share-button .downvote svg').css('fill', success_color);
          $('.social-share-button .upvote svg').css('fill', default_color);
          $('.social-share-button .downvote').next('i').html(current_dislike + 1);
          $('.social-share-button .upvote').next('i').html(current_like - 1);
          likeStatus = 'dislike';
        }
      }
    });
  }
}

// Get Bookmark
function getBookmark() {
  $.ajax({
    url: `/api/bookmark`,
    type: "POST",
    success: function (result) {
      if (!result.code) {
        for (var i = 0; i < data.data.length; i++) {
          html += `<div class="teaser">
                    <div class="teaser-left">
                        <div class="teaser-left-wrapper">
                            <div class="promo-img-thumb">
                                <a href="${data.data[i].url}">
                                  <img src="/uploads/${data.data[i].image}"/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="teaser-right">
                        <div class="teaser-right-wrapper">
                            <h3 class="page-title article-title">
                                <a href="${data.data[i].url}">${data.data[i].title}</a>
                            </h3>
                        </div>
                    </div>
                </div>`;
        }
        $('.article-carousel').html(html);
      }
    }
  });
}

// Check Bookmark
function checkBookmark() {
  if (checkLogin() != 1)
    toast('Bạn cần đăng nhập để bookmark', 3000, error_color);
  else {
    var id = $('#article_id').val();
    $.ajax({
      url: `/api/bookmark/${id}`,
      type: "POST",
      success: function (result) {
        if (result.status == 'save') {
          toast('Bạn đã bookmark thành công', 3000, success_color);
          $('.social-share-button .bookmark svg').css('fill', success_color);
        } else {
          $('.social-share-button .bookmark svg').css('fill', default_color);
          toast('Bạn đã hủy bookmark thành công', 3000, success_color);
        }
      }
    });
    getBookmark();
  }
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

// Change Password
function openModalChangePassword() {
  $('.modal-change-password').removeClass('d-none');
  $('.modal-change-password').addClass('d-block');
}

function closeModalChangePassword() {
  $('.modal-change-password').removeClass('d-block');
  $('.modal-change-password').addClass('d-none');
}

function postChangePassword() {
  //  TODO
  //  1. check input variable
  //  2. API here
  closeModalChangePassword();
}

// Check Date Name
function checkDateName(dateString) {
  var days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
  var d = new Date(dateString);
  var dateName = days[d.getDay()];
  var date = dateString.split('-')[2];
  var month = dateString.split('-')[1];
  var year = dateString.split('-')[0];
  var result = `${dateName}, ${date}/${month}/${year}`;
  return result;
}

// Point System
function pointSystem(point) {
  switch(point) {
    case 10:
      return 'Hoàn hảo';
      break;
    case 9:
      return 'Xuất sắc';
      break;
    case 8:
      return 'Hay';
      break;
    case 7:
      return 'Khá';
      break;
    case 6:
      return 'Tạm được';
      break;
    case 5:
      return 'Trung bình';
      break;
    case 4:
      return 'Nghèo nàn';
      break;
    case 3:
      return 'Tệ';
      break;
    case 2:
      return 'Quá tệ';
      break;
    case 1:
      return 'Trash';
      break;
    default:
      return 'Chưa đánh giá';
      break;
  } 
}

// Convert Title
function convertTitle(str) {
  //return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  return str;
}