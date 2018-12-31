// Outline
var html = '';

$('.ds-main .field--type-text-with-summary').find('h2').each(function (i, e) {
    $(this).attr('id', i);
    var g = $(this).html();
    html += `<div class="scroll-animated" style="font-size: 12px;" rel="#${i}">${g}</div>`;
})

$('.ad-299').html(html);

$(".scroll-animated").click(function () {
    var id = $(this).attr('rel');
    $('html,body').animate({ scrollTop: $(id).offset().top -60 }, 'slow');
});

//owl carousel 2
$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout:3000,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:4
            }
        }
    })
});

//filter pod-header
$('.pod-header__filters-item.js-filter-option').click(function () {
    $(this).addClass('on').siblings().removeClass('on');
})
$('.pod-header__grid').click(function () {
    $(this).find('.feed-view').addClass('on').siblings().removeClass('on');
    $(this).siblings().find('.feed-view').removeClass('on');
})
