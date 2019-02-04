$(document).ready(function () {
    var date = $('.author-details span').html();
    $('.author-details span').html(checkDateName(date.split(' ')[0]));
    getBookmark();
    getReview();
  })

  function postReview() {
    if (checkLogin() != 1)
      toast('Bạn cần đăng nhập để đăng đánh giá', 3000, error_color);
    else {
      var data = {};
      data.rating = $('#review-point').val();
      data.post_type = 'article';
      data.title = '___';
      data.content = $('#text-editer-comment').val();
      data.post_id = $('#article_id').val();

      if (!data.content) {
        $("#text-editer-comment").addClass('has-error');
        toast('Vui lòng nhập nội dung đánh giá', 3000, error_color);
        return;
      } else {
        $("#text-editer-comment").removeClass('has-error');
      }

      if (data.rating == 0) {
        $('#review-point').addClass('has-error');
        toast('Vui lòng chọn điểm đánh giá', 3000, error_color);
        return;
      } else {
        $('#review-point').removeClass('has-error');
      }

      StoreAPI.addReview(data, function (result) {
        console.log(result);
        if (!result.code) {
          toast('Đăng đánh giá thành công', 3000, error_color);
          setTimeout(function () {
            location.reload();
          }, 1000);
        } else {
          toast(result.message, 3000, error_color);
        }
      })
    }
  }

  function getReview() {
    var data = {};
    data.post_type = 'article';
    data.post_id = $('#article_id').val();

    StoreAPI.getReview(post_type, post_id, 'created_at-desc', function (result) {
      var review_list = '';
      for (var i = 1; i < result.data.length; i++) {
        review_list += `<div class="block-reviews--comment">
                          <div class="block-reviews--auth">
                            <img src="/uploads/${result.data[i].avatar}" alt="avatar" class="comment-avatar"/>
                            <span>Đánh giá bởi <strong class="review-author">${result.data[i].title}</strong></span>
                            <span class="rating-review">
                              <img src="{{theme.uri}}/img/icon/icon-star.png" width="16px" height="16px"/>
                              ${result.data[i].rating}/10
                            </span>
                          </div>
                          <div class="comment-text-review">
                            <p class="review-title">
                              ${result.data[i].title}
                            </p>
                            <p class="review-content">
                              ${result.data[i].content}
                            </p>
                          </div>
                        </div>`;
      }
      $('.list-comment-review').html(review_list);
    })
  }