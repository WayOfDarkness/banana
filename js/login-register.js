jQuery(document).ready(function ($) {
	var $form_modal = $('.cd-user-modal'),
		$form_login = $form_modal.find('#cd-login'),
		$form_signup = $form_modal.find('#cd-signup'),
		$form_forgot_password = $form_modal.find('#cd-reset-password'),
		$form_modal_tab = $('.cd-switcher'),
		$tab_login = $form_modal_tab.children('li').eq(0).children('a'),
		$tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
		$forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
		$back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a'),
		$main_nav = $('.main-nav');

	//open modal
	$main_nav.on('click', function (event) {

		if ($(event.target).is($main_nav)) {
			$(this).children('ul').toggleClass('is-visible');
		} else {
			$('.header-icon.expanded-menu-button.close').click();
			$main_nav.children('ul').removeClass('is-visible');

			if ($(event.target).is('.cd-signup')) {
				$form_modal.addClass('is-visible');
				signup_selected();
			} else if ($(event.target).is('.cd-signin')) {
				$form_modal.addClass('is-visible');
				login_selected();
			}
		}
	});

	$('.cd-signin', '.cd-signup').click(function (event) {
		$('.header-icon.user-button').removeClass('close');
		$('#account-dropdown').hide();
	});

	//close modal
	$('.cd-user-modal').on('click', function (event) {
		if ($(event.target).is($form_modal) || $(event.target).is('.cd-close-form')) {
			$form_modal.removeClass('is-visible');
		}
	});
	//close modal when clicking the esc keyboard button
	// $(document).keyup(function (event) {
	// 	if (event.which == '27') {
	// 		$form_modal.removeClass('is-visible');
	// 	}
	// });

	//switch from a tab to another
	$form_modal_tab.on('click', function (event) {
		event.preventDefault();
		($(event.target).is($tab_login)) ? login_selected() : signup_selected();
	});

	//hide or show password
	$('.hide-password').on('click', function () {
		var $this = $(this),
			$password_field = $this.prev('input');
		('password' == $password_field.attr('type')) ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
		$password_field.putCursorAtEnd();
	});

	$('.cd-form').on('click', '.hide-password-on', function () {
		$(this).removeClass('hide-password-on');
		$(this).addClass('hide-password-off');
	});

	$('.cd-form').on('click', '.hide-password-off', function () {
		$(this).removeClass('hide-password-off');
		$(this).addClass('hide-password-on');
	});

	//show forgot-password form 
	$forgot_password_link.on('click', function (event) {
		event.preventDefault();
		forgot_password_selected();
	});

	//back to login from the forgot-password form
	$back_to_login_link.on('click', function (event) {
		event.preventDefault();
		login_selected();
	});

	function login_selected() {
		$form_login.addClass('is-selected');
		$form_signup.removeClass('is-selected');
		$form_forgot_password.removeClass('is-selected');
		$tab_login.addClass('selected');
		$tab_signup.removeClass('selected');
	}

	function signup_selected() {
		$form_login.removeClass('is-selected');
		$form_signup.addClass('is-selected');
		$form_forgot_password.removeClass('is-selected');
		$tab_login.removeClass('selected');
		$tab_signup.addClass('selected');
	}

	function forgot_password_selected() {
		$form_login.removeClass('is-selected');
		$form_signup.removeClass('is-selected');
		$form_forgot_password.addClass('is-selected');
	}

	$form_login.find('input[type="submit"]').on('click', function (event) {
		event.preventDefault();
		$form_login.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
	});
	$form_signup.find('input[type="submit"]').on('click', function (event) {
		event.preventDefault();
		$form_signup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
	});

	if (!Modernizr.input.placeholder) {
		$('[placeholder]').focus(function () {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
			}
		}).blur(function () {
			var input = $(this);
			if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.val(input.attr('placeholder'));
			}
		}).blur();
		$('[placeholder]').parents('form').submit(function () {
			$(this).find('[placeholder]').each(function () {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
					input.val('');
				}
			})
		});
	}

	$("#register-form input[type='submit']").click(function (e) {
		e.preventDefault();
		var confirmPassword = $("#signup-password-confirm").val();
		
		var data = {
			name: $("#signup-name").val(),
			email: $("#signup-email").val(),
			password: $("#signup-password").val()
		};
	
		if (!data.name) {
			$('#signup-name').addClass('has-error').next('span').addClass('is-visible');
			$('#signup-name').addClass('has-error').next('span').html('Vui lòng nhập tên tài khoản!');
			return;
		} else {
			$('#signup-name').removeClass('has-error').next('span').removeClass('is-visible');
		}
	
		if (!data.email) {
			$('#signup-email').addClass('has-error').next('span').addClass('is-visible');
			$('#signup-email').addClass('has-error').next('span').html('Vui lòng nhập email!');
			return;
		} else {
			$('#signup-email').removeClass('has-error').next('span').removeClass('is-visible');
		}
	
		if (!data.email.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")) {
			$('#signup-email').addClass('has-error').next('span').addClass('is-visible');
			$('#signup-email').addClass('has-error').next('span').html('Email không đúng định dạng!');
			return;
		} else {
			$('#signup-email').removeClass('has-error').next('span').removeClass('is-visible');
		}
	
		if (!data.password) {
			$('#signup-password').addClass('has-error').siblings('span').addClass('is-visible');
			$('#signup-password').addClass('has-error').siblings('span').html('Vui lòng nhập mật khẩu!');
			return;
		} else {
			$('#signup-password').removeClass('has-error').siblings('span').removeClass('is-visible');
		}
	
		if (data.password.length < 6) {
			$('#signup-password').addClass('has-error').siblings('span').addClass('is-visible');
			$('#signup-password').addClass('has-error').siblings('span').html('Mật khẩu phải có ít nhất 6 kí tự!');
			return;
		} else {
			$('#signup-password').removeClass('has-error').siblings('span').removeClass('is-visible');
		}
	
		if (!confirmPassword) {
			$("#signup-password-confirm").addClass('has-error').siblings('span').addClass('is-visible');
			$("#signup-password-confirm").addClass('has-error').siblings('span').html('Vui lòng nhập lại mật khẩu!');
			return;
		} else {
			$("#signup-password-confirm").removeClass('has-error').siblings('span').removeClass('is-visible');
		}
	
		if (data.password != confirmPassword) {
			$("#signup-password-confirm").addClass('has-error').siblings('span').addClass('is-visible');
			$("#signup-password-confirm").addClass('has-error').siblings('span').html('Mật khẩu không trùng khớp!');
			return;
		} else {
			$("#signup-password-confirm").removeClass('has-error').siblings('span').removeClass('is-visible');
		}
	
		$.ajax({
			url: "/api/signup",
			type: "POST",
			data: data,
			success: function (result) {
				if (!result.code) {
					setTimeout(function () {
						$.ajax({
							url: "/api/signin",
							type: "POST",
							data: data,
							success: function (result) {
								if (!result.code) {
									toast('Bạn đã đăng ký thành công', 3000, success_color);
									setTimeout(function () {
										window.location.reload();
									}, 1000);
								} else {
									toast(result.message, 3000, error_color);
								}
							}
						});
					}, 1000);
				}
			}
		});
	});
	
	$("#login-form input[type='submit']").click(function (e) {
		e.preventDefault();
		
		var data = {
			email: $("#signin-email").val(),
			password: $("#signin-password").val()
		};
	
		if (!data.email) {
			$('#signin-email').addClass('has-error').next('span').addClass('is-visible');
			$('#signin-email').addClass('has-error').next('span').html('Vui lòng nhập email!');
			return;
		} else {
			$('#signin-email').removeClass('has-error').next('span').removeClass('is-visible');
		}
	
		if (!data.password) {
			$('#signin-password').addClass('has-error').siblings('span').addClass('is-visible');
			$('#signin-password').addClass('has-error').siblings('span').html('Vui lòng nhập mật khẩu!');
			return;
		} else {
			$('#signin-password').removeClass('has-error').siblings('span').removeClass('is-visible');
		}
	
		$.ajax({
			url: "/api/signin",
			type: "POST",
			data: data,
			success: function (result) {
				if (!result.code) {
					toast('Bạn đã đăng nhập thành công', 3000, success_color);
					setTimeout(function () {
						window.location.reload();
					}, 1000);
				} else {
					toast(result.message, 3000, error_color);
				}
			}
		});
	});
	
	$("#reset-form input[type='submit']").click(function (e) {
		e.preventDefault();
		
		var data = {
			email: $("#reset-email").val(),
		};
	
		if (!data.email) {
			$('#reset-email').addClass('has-error').next('span').addClass('is-visible');
			$('#reset-email').addClass('has-error').next('span').html('Vui lòng nhập email!');
			return;
		} else {
			$('#reset-email').removeClass('has-error').next('span').removeClass('is-visible');
		}
	
		if (!data.email.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")) {
			$('#reset-email').addClass('has-error').next('span').addClass('is-visible');
			$('#reset-email').addClass('has-error').next('span').html('Email không đúng định dạng!');
			return;
		} else {
			$('#reset-email').removeClass('has-error').next('span').removeClass('is-visible');
		}
	
		$.ajax({
			url: "/api/forgotPassword",
			type: "POST",
			data: data,
			success: function (result) {
				if (!result.code) {
					toast('Vui lòng kiểm tra email để đổi mật khẩu', 3000, success_color);
					setTimeout(function () {
						window.location.reload();
					}, 1000);
				} else {
					toast(result.message, 3000, error_color);
				}
			}
		});
	});

});

jQuery.fn.putCursorAtEnd = function () {
	return this.each(function () {
		if (this.setSelectionRange) {
			var len = $(this).val().length * 2;
			this.setSelectionRange(len, len);
		} else {
			$(this).val($(this).val());
		}
	});
};