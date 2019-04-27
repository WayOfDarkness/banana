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
    var r1 = 10;
    var r2 = 13;
    var r3 = 5;
    var html = '';
    for (var i = 1; i < 101; i++) {
        html += `<a href="${i == r1 ? '/abc' : (i == r2 ? '/def' : (i == r3 ? '/xyz' : '/' + makeid(10)))}">${i}</a>${i % 10 == 0 ? '<br>' : ''}`;
    }
    $('.one-hundred-doors').html(html);
});