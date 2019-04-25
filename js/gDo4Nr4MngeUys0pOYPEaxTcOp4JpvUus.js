$(document).ready(function () {
    var current_gallery_id = $('.current-gallery-id').val();
    var current_gallery_status = $('.current-gallery-status').val();
    var next_gallery_id = $('.next-gallery-id').val();
    var customer_id = $('.customer-id').val();
    var point = parseInt($('.riddle-point').val());
    var current_point = parseInt($('.customer-point').val());
    
    if (customer_id && point != 0 && current_gallery_status == 1) {

        // Update Point For User
        $.ajax({
            url: `/api/customer/set-point/${customer_id}`,
            type: "POST",
            data: {
                'point': current_point + point
            },
            success: function (result) {}
        });

        // Change The Current Riddle Status From Accessible To Solved
        $.ajax({
            type: 'POST',
            url: '/admin/api/setRole',
            data: {
                'gallery_id': current_gallery_id,
                'customer_id': customer_id,
                'role': 2
            },
            success: function (result) {}
        });

        // Change The Next Riddle Status From Unavailable To Accessible
        $.ajax({
            type: 'POST',
            url: '/admin/api/setRole',
            data: {
                'gallery_id': next_gallery_id,
                'customer_id': customer_id,
                'role': 1
            },
            success: function (result) {}
        });
    }

    if (customer_id && point != 0 && current_gallery_status == 0) {

        // Cheater Is Here 
        $('.innerCircle').html('Dừng ngay việc làm đáng xấu hổ này lại! Kẻ gian lận!');
    }

    if (customer_id && point != 0 && current_gallery_status == 2) {

        // Already Solved
        $('.current-point').html(current_point);
    }

    if (customer_id && point == 0) {

        // Change The Domino Dance Riddle Status From Accessible To Solved
        $.ajax({
            type: 'POST',
            url: '/admin/api/setRole',
            data: {
                'gallery_id': current_gallery_id,
                'customer_id': customer_id,
                'role': 2
            },
            success: function (result) {}
        });

        // Change Spring 1 Riddle Status From Unavailable To Accessible
        $.ajax({
            type: 'POST',
            url: '/admin/api/setRole',
            data: {
                'gallery_id': 14,
                'customer_id': customer_id,
                'role': 1
            },
            success: function (result) {}
        });
    }
});