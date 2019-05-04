$(document).ready(function () {
    var current_gallery_status = $('.current-gallery-status').val();
    var customer_id = $('.customer-id').val();
    var point = parseInt($('.riddle-point').val());
    var current_point = parseInt($('.customer-point').val());
    var set_role_to_1 = $('.set-role-to-1').val();
    var set_role_to_2 = $('.set-role-to-2').val();

    if (customer_id && ((point != 0 && current_gallery_status == 1) || (point == 0 && current_gallery_status != 2))) {

        // Update Point For User
        $.ajax({
            url: `/api/customer/set-point/${customer_id}`,
            type: "POST",
            data: {
                'point': current_point + point
            },
            success: function (result) { }
        });

        // Change The Current Riddle Status From Accessible To Solved
        for (var i = 0; i < set_role_to_1.split(' ').length; i++) {
            $.ajax({
                type: 'POST',
                url: '/api/setRole',
                data: {
                    'gallery_id': set_role_to_1.split(' ')[i],
                    'customer_id': customer_id,
                    'role': 2
                },
                success: function (result) { }
            });
        }

        // Change The Next Riddles Status From Unavailable To Accessible
        for (var i = 0; i < set_role_to_2.split(' ').length; i++) {
            $.ajax({
                type: 'POST',
                url: '/api/setRole',
                data: {
                    'gallery_id': set_role_to_2.split(' ')[i],
                    'customer_id': customer_id,
                    'role': 1
                },
                success: function (result) { }
            });
        }
    }
});