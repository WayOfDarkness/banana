$(document).ready(function () {
    var currentNumber;
    setInterval(function(){ 
        currentNumber = parseInt($('#counter-platform').html());
        if (currentNumber > 0) {
            $('#counter-platform').html(currentNumber - 1);
        }
    }, 1000);

    $('.red').click(function() {
        if ($(this).hasClass('active')) {
            if (currentNumber == 79 || currentNumber == 74 || currentNumber == 71 || currentNumber == 51 || currentNumber == 36 || currentNumber == 18) {
                $('#counter-platform').html(99);
            }
        } else {
            $('#counter-platform').html(99);
            $('.yellow').removeClass('active');
            $('.green').removeClass('active');
            $(this).addClass('active');
        }
    })

    $('.yellow').click(function() {
        if ($(this).hasClass('active')) {
            if (currentNumber == 17 || currentNumber == 11) {
                $('#counter-platform').html(30);
            }
        } else {
            $('#counter-platform').html(30);
            $('.red').removeClass('active');
            $('.green').removeClass('active');
            $(this).addClass('active');
        }
    })

    $('.green').click(function() {
        if ($(this).hasClass('active')) {
            if (currentNumber == 45 || currentNumber == 36 || currentNumber == 29 || currentNumber == 21 || currentNumber == 1) {
                $('#counter-platform').html(57);
            }
        } else {
            $('#counter-platform').html(57);
            $('.yellow').removeClass('active');
            $('.red').removeClass('active');
            $(this).addClass('active');
        }
    })
});