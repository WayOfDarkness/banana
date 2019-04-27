var counter = 0;
function makeid(param) {
    if (param != 'none') {
        window.location.href = `/${param}`;}
    // } else {
    //     counter++;
    //     console.log('clicked!');
    //     if (counter > 10) window.location.reload();
    // }
 }

 $(document).ready(function () {
    var r1 = Math.floor((Math.random() * 100) + 1);
    var r2 = Math.floor((Math.random() * 100) + 1);
    var r3 = Math.floor((Math.random() * 100) + 1);
    var html = '';
    for (var i = 1; i < 101; i++) {
        html += `<button onClick="${i == r1 ? makeid('Nuf8cqH02k') : (i == r2 ? makeid('JzusnaVVXX') : (i == r3 ? makeid('6uCqm1Sl2B') : makeid('none')))}">${i}</button>${i % 10 == 0 ? '<br>' : ''}`;
    }
    $('.one-hundred-switches').html(html);
});