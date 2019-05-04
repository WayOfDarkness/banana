$(document).ready(function () {
    setInterval(function(){ 
        var currentNumber = $('$counter-platform').html();
        $('$counter-platform').html(currentNumber - 1);
    }, 1000);
});