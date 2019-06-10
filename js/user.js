function isShowChangePassword(boolean) {
    if (boolean)
        $('.collapse-change-assword').removeClass('d-none');
    else
        $('.collapse-change-assword').addClass('d-none');
}

$(".change-password-btn").click(function () {
    var newPassConfirm = $("#re-new-password").val();
    var data = {
        old_password: $("#old-password").val(),
        new_password: $("#new-password").val(),
    };

    if (!data.old_password) {
        $("#old-password").addClass('has-error');
        toast('Vui lòng nhập mật khẩu cũ', 3000, error_color);
        return;
    } else {
        $("#old-password").removeClass('has-error');
    }

    if (!data.new_password) {
        $("#new-password").addClass('has-error');
        toast('Vui lòng nhập mật khẩu mới', 3000, error_color);
        return;
    } else {
        $("#new-password").removeClass('has-error');
    }

    if (data.new_password != newPassConfirm) {
        $("#re-new-password").addClass('has-error');
        toast('Mật khẩu không trùng khớp', 3000, error_color);
        return;
    } else {
        $("#re-new-password").removeClass('has-error');
    }

    $.ajax({
        url: "/api/changePassword",
        type: "POST",
        data: data,
        success: function (result) {
            if (!result.code) {
                toast(result.message, 3000, error_color);
                $('#re-new-password').removeClass('has-error');
                $('#new-password').removeClass('has-error');
                $('#old-password').removeClass('has-error');
                setTimeout(function () {
                    location.href = "/";
                }, 3000);
            } else {
                toast(result.message, 3000, error_color);
                $('#old-password').addClass('has-error');
            }
        }
    });
})

$(".change-nickname-btn").click(function () {
    var data = {
        email: $("#user_email").val(),
        name: $(".change-nickname input").val()
    };

    if (!data.name) {
        $(".change-nickname input").addClass('has-error');
        toast('Vui lòng nhập tên tài khoản', 3000, error_color);
        return;
    } else {
        $(".change-nickname input").removeClass('has-error');
    }

    $.ajax({
        url: "/api/changeInformation",
        type: "POST",
        data: data,
        success: function (result) {
            if (!result.code) {
                toast('Thay đổi thông tin thành công', 3000, success_color);
                setTimeout(function () {
                    window.location.reload();
                }, 3000);
            } else {
                toast(result.message, 3000, error_color);
            }
        }
    });
});

$(function () {
    $("#loadImg").on('click', function (e) {
        e.preventDefault();
        $("#upload-image-avatar:hidden").trigger('click');
    });
});

function checkExtImage(image) {
    var ext = image.split('.').pop().toLowerCase();
    if ($.inArray(ext, [
        'png',
        'jpg',
        'jpeg',
        'gif',
        'svg',
        'ico'
    ]) == -1) {
        toastr.error('Vui lòng chọn đúng định dạng hình ảnh');
        return 0;
    }
    return 1;
}

$(document).on('change', '#upload-image-avatar', function () {
    var self = $(this);
    if ($(this).val()) {
        var form = $('.form-avatar');
        var formData = new FormData(form[0]);
        for (var value of formData.values()) {
            if (!checkExtImage(value.name)) {
                form.removeClass('disabled');
                return;
            }
        }

        $.ajax({
            type: 'POST',
            url: '/api/uploadAvatar',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (json) {
                var html = '/uploads/' + json.data;
                $('.form-avatar').html(`<img src="${html}" id="avatarImg">`);
                toast('Thay đổi ảnh đại diện thành công', 3000, success_color);
                setTimeout(function () {
                    window.location.reload();
                }, 3000);
            }
        });
    }
    $(this).val("");
});

$('.user-li').click(function () {
    var s = $(this);
    $('.user-li').removeClass('active');
    s.addClass('active');
})

$('select[data-target]').change(function () {
    let target = $(this).data('target');
    let value = this.value;
    $(target + ' > *').hide(100);
    $(target + ' *[data-value=' + value + ']').show(300);
})

$(document).ready(function () {
    StoreAPI.customerReview(function (result) {
        var hintList = '';
        var questionList = '';
        if (!result.code) {
            for (var i = 0; i < result.reviews.length; i++) {
                hintList += `<option value="tab-${i}">${result.reviews[i].title}</option>`;
                questionList += `<div data-value="tab-${i}">Q: ${result.reviews[i].content}</div>`;
            }
        }
        $('select').html(hintList);
        $('.question-tab').html(questionList);
        $('.select-multi-tab > *:not(first-child)').hide();
        $('.select-multi-tab > *:first-child').show();
    })
})