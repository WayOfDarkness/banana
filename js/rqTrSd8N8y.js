$(document).ready(function () {
    setInterval(function(){ 
        var currentNumber = parseInt($('#counter-platform').html());
        $('#counter-platform').html(currentNumber - 1);
    }, 1000);
});