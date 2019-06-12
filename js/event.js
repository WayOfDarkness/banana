$(document).ready(function () {
	$('.button-group .button').click(function () {
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

function makeid(length) {
	var result = '';
	var characters = '0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

$('.hint-form-request').submit(function (e) {
	e.preventDefault();
	var data = {};
	data.rating = '10';
	data.post_type = 'article';
	data.post_id = makeid(10);
	data.title = $('input[name="level"]').val();
	data.content = $('textarea[name="description"]').val();

	if (!data.title) {
		$('input[name="level"]').addClass('has-error');
		toast('Vui lòng nhập tiêu đề mã', 3000, 'red');
		return;
	} else {
		$('input[name="level"]').removeClass('has-error');
	}

	if (!data.content) {
		$('textarea[name="description"]').addClass('has-error');
		toast('Vui lòng nhập mô tả quá trình giải', 3000, 'red');
		return;
	} else {
		$('textarea[name="description"]').removeClass('has-error');
	}
	StoreAPI.addReview(data);
	StoreAPI.addReview(data);
	StoreAPI.addReview(data);
	StoreAPI.addReview(data);
	StoreAPI.addReview(data);
	toast('Gửi câu hỏi thành công!', 3000, 'blue');
	setTimeout(function () {
		location.reload();
	}, 3000);
})