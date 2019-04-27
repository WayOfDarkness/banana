$(document).ready(function () {
    var r1 = 10;
    var r2 = 13;
    var r3 = 5;
    var html;
    for (i = 1; i < 1001; i++) {
        html += `<a href="${i == r1 ? '/abc' : (i == r2 ? '/def' : (i == r3 ? '/xyz' : '#'))}">${i}</a>`;
    }
    $('.one-hundred-doors').html(html);
});