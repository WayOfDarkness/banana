//ALL PAGE RUN THIS CODE
console.log('Welcome to https://choigiday.com')

//BLOG RUN THIS CODE
if($(".page-blog").length) {

}

//ARTICLE RUN THIS CODE
if($(".page-article").length) {

}

//HOME RUN THIS CODE
if($(".page-home").length) {

}

//NEWS RUN THIS CODE
if($(".page-news").length) {

}

//REVIEWS RUN THIS CODE
if($(".page-reviews").length) {

}

//VIDEO RUN THIS CODE
if($(".page-videos").length) {

}

//WALKTHROUGH RUN THIS CODE
if($(".page-walkthrough").length) {

}



// Outline
var html = '';

$('.ds-main .field--type-text-with-summary').find('h2').each(function (i, e) {
  $(this).attr('id', i);
  var g = $(this).html();
  html += `<div class="scroll-animated" rel="#${i}">${g}</div>`;
})

$('.ad-299').html(html);

$(".scroll-animated").click(function () {
  var id = $(this).attr('rel');
  $('html,body').animate({scrollTop: $(id).offset().top - 60}, 'slow');
});

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
