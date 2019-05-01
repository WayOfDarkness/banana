// const body = document.body;
// const btn = document.querySelectorAll('.button')[0];

// btn.addEventListener('mouseenter', () => {
// 	body.classList.add('show');
// });

// btn.addEventListener('mouseleave', () => {
// 	body.classList.remove('show');
// });

// function clickFunc(clicked_id) {
// 	// console.info(clicked_id);
// 	id_close_modal = "close" + clicked_id;
// 	var span = document.getElementById(id_close_modal);
// 	var name = 'modal' + clicked_id;
// 	var modal = document.getElementById(name);
// 	modal.style.display = "block";
// 	window.onclick = function (event) {
// 		if (event.target == modal) {
// 			modal.style.display = "none";
// 		}
// 	}
// 	span.onclick = function () {
// 		modal.style.display = "none";
// 	}
// }

$(document).ready(function () {
	console.log('da vao');
	$('.close-btn').click(function () {
		console.log('da click');
		$(this).parent('.modal').hide();
	})
});