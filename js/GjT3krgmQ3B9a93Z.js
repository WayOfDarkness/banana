function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 
 $(document).ready(function () {
    var r1 = Math.floor(Math.random() * 1000);
    var r2 = Math.floor(Math.random() * 1000);
    var r3 = Math.floor(Math.random() * 1000);
    console.log(r1 + " " + r2 + " " + r3);
    var html = '';
    for (var i = 1; i < 101; i++) {
        html += `<a href="${i == r1 ? '/Nuf8cqH02k' : (i == r2 ? '/JzusnaVVXX' : (i == r3 ? '/6uCqm1Sl2B' : '/' + makeid(10)))}">${i}</a>${i % 10 == 0 ? '<br>' : ''}`;
    }
    $('.one-hundred-switches').html(html);
});