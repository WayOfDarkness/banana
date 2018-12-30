// Outline
var html = '';

$('.ds-main .field--type-text-with-summary').find('h2').each(function (i, e) {
    $(this).attr('id', i);
    var g = $(this).html();
    html += `<div class="scroll-animated" style="font-size: 12px;" rel="#${i}">${g}</div>`;
})

$('.ad-300').html(html);

$(".scroll-animated").click(function () {
    var id = $(this).attr('rel');
    $('html,body').animate({ scrollTop: $(id).offset().top -60 }, 'slow');
});
