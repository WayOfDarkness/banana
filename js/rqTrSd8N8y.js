$(document).ready(function () {
    setInterval(function(){ 
        var currentNumber = parseInt($('#counter-platform').html());
        if (currentNumber > 0) {
            $('#counter-platform').html(currentNumber - 1);
        }
    }, 1000);
});