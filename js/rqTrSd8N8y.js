$(document).ready(function () {
    var currentNumber;
    setInterval(function(){ 
        currentNumber = parseInt($('#counter-platform').html());
        if (currentNumber > 0) {
            $('#counter-platform').html(currentNumber - 1);
        }
    }, 1000);

    $('.red').click(function() {
        if (currentNumber == 78 || currentNumber == 73 || currentNumber == 70 || currentNumber == 50 || currentNumber == 35 || currentNumber == 17) {
            $('#counter-platform').html(99);
        }
    })
});