$(document).ready(function () {
    var currentNumber;
    setInterval(function(){ 
        currentNumber = parseInt($('#counter-platform').html());
        if (currentNumber > 0) {
            $('#counter-platform').html(currentNumber - 1);
        }
    }, 1000);

    $('.red').click(function() {
        if (currentNumber == 79 || currentNumber == 74 || currentNumber == 71 || currentNumber == 51 || currentNumber == 36 || currentNumber == 18) {
            $('#counter-platform').html(99);
        }
    })
});