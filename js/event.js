$(document).ready(function () {
	$('.button-group .button').click (function() {
		var btnID = $(this).attr('id');
		if (btnID == 'start-btn')
			window.location.href = '/all-riddles';
		else if (btnID == 'ranking-btn')
			window.location.href = '/bang-xep-hang';
		else $(`.${btnID}`).show();
	});

	$('.close-btn').click(function () {
		$(this).closest('.modal').hide();
	})
});