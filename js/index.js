$('.js-filter-option').click(function() {
    var sortbyValue = $(this).data('sort-value');
    sortby = '&sortby=' + sortbyValue ;
    var url = '/api/search?type=article&filter=view>=0' + sortby;
    ajaxLoadFilter(url);
  })

  function ajaxLoadFilter(url) {
    $.ajax({
      url: url,
      type: 'GET',
      success: function (html) {
        var content = '';
        for (var i = 0 ; i < html.data.length ; i++) {
          content += `<article class="media media-article">
                        <a href="${html.data[i].url}" class="block-content">
                          <figure class="media-figure media-figure--river">
                            <div class="type-of-article ${html.data[i].type}">
                              <img class="news" src="/themes/banana/img/icon-article-news.png" alt="type-of-article" width="50px">
                              <img class="review" src="/themes/banana/img/icon-article-review.png" alt="type-of-article" width="50px">
                              <img class="walkthrough" src="/themes/banana/img/icon-article-walkthrough.png" alt="type-of-article" width="50px">
                            </div>
                            <div class="media-img imgflare--river">
                              <img src="/uploads/${resizeImage(html.data[i].image, 480)}" alt="${html.data[i].title}" title="${html.data[i].title}"/>
                              <div class="media-type media-type--right">
                                <svg aria-hidden="true" class="symbol symbol-thumbs-up" height="28" version="1.1" viewBox="0 0 28 28" width="28">
                                  <path d="M4 21q0-0.406-0.297-0.703t-0.703-0.297q-0.422 0-0.711 0.297t-0.289 0.703q0 0.422 0.289 0.711t0.711 0.289q0.406 0 0.703-0.289t0.297-0.711zM6.5 13v10q0 0.406-0.297 0.703t-0.703 0.297h-4.5q-0.406 0-0.703-0.297t-0.297-0.703v-10q0-0.406 0.297-0.703t0.703-0.297h4.5q0.406 0 0.703 0.297t0.297 0.703zM25 13q0 1.344-0.859 2.328 0.234 0.688 0.234 1.188 0.047 1.188-0.672 2.141 0.266 0.875 0 1.828-0.234 0.891-0.844 1.469 0.141 1.75-0.766 2.828-1 1.188-3.078 1.219h-2.016q-1.031 0-2.25-0.242t-1.898-0.453-1.883-0.617q-1.922-0.672-2.469-0.688-0.406-0.016-0.703-0.305t-0.297-0.695v-10.016q0-0.391 0.281-0.68t0.672-0.32q0.375-0.031 1.188-0.922t1.578-1.891q1.062-1.359 1.578-1.875 0.281-0.281 0.484-0.75t0.273-0.758 0.211-0.945q0.109-0.609 0.195-0.953t0.305-0.812 0.531-0.781q0.297-0.297 0.703-0.297 0.719 0 1.289 0.164t0.938 0.406 0.625 0.633 0.375 0.703 0.187 0.781 0.078 0.703 0.008 0.609q0 0.594-0.148 1.188t-0.297 0.938-0.43 0.875q-0.047 0.094-0.156 0.281t-0.172 0.344-0.125 0.375h4.328q1.219 0 2.109 0.891t0.891 2.109z"></path>
                                </svg>
                                ${html.data[i].like}
                              </div>
                            </div>
                          </figure>
                          <div class="media-body">
                            <h3 class="media-title">
                              ${convertTitle(html.data[i].title.substring(0,100))}...
                            </h3>
                            <p class="media-deck">
                              ${html.data[i].description.substring(0,170)}...
                            </p>
                            <footer class="media-meta">
                              <time class="media-date">
                                ${checkDateName(html.data[i].created_at.split(' ')[0])}
                              </time>
                            </footer>
                          </div>
                        </a>
                      </article>`;
        }
        pagination_html = `<div class="pagination" data-page_number="${html.paginate.current_page}" data-total="${html.paginate.total_pages}"></div>`;
        $('.js-load-forever-container').html(content);
        $('.pagination__wrapper').html(pagination_html);
        initPaginate(url);
      }
    })
  }

  function resizeImage(image, size) {
    var arr = image.split('.');
    var last_element = arr[arr.length - 1];
    var new_image = image.replace('.' + last_element, '_' + size + '.' + last_element);
    return new_image;
  };

  function initPaginate(url) {
    var page_number,
        total;
    page_number = jQuery(document).find('.pagination').data('page_number');
    total = jQuery(document).find('.pagination').data('total');

    if (total && parseInt(total) > 1) {
      jQuery(document).find('.pagination').twbsPagination({
        totalPages: parseInt(total),
        visiblePages: 5,
        startPage: parseInt(page_number),
        initiateStartPageClick: false,
        paginationClass: 'reset-list paginationk-list',
        first: '❮❮',
        last: '❯❯',
        pageClass: 'item',
        prev: '&#10094;',
        prevClass: 'prev',
        next: '&#10095;',
        nextClass: 'next',
        activeClass: 'active',
        disabledClass: 'disabled',
        anchorClass: 'link',
        href: false,
        onPageClick: function (event, page) {
          var href = url;
          var s = location.search;
          if (!s || !s.indexOf('&page=')) {
            if (page == 1)
              href = url;
            else
              href = url + '&page=' + page;
            }
          else {
            if (href.indexOf('&page=') > -1)
              href = href.substring(0, href.indexOf('&page='));
            if (page > 1)
              href = href + '&page=' + page;
            }
          $.get(href, function (html) {
            var content = '';
            for (var i = 0; i < html.data.length; i++) {
              content += `<article class="media media-article">
                            <a href="${html.data[i].url}" class="block-content">
                              <figure class="media-figure media-figure--river">
                                <div class="type-of-article ${html.data[i].type}">
                                  <img class="news" src="/themes/banana/img/icon-article-news.png" alt="type-of-article" width="50px">
                                  <img class="review" src="/themes/banana/img/icon-article-review.png" alt="type-of-article" width="50px">
                                  <img class="walkthrough" src="/themes/banana/img/icon-article-walkthrough.png" alt="type-of-article" width="50px">
                                </div>
                                <div class="media-img imgflare--river">
                                  <img src="/uploads/${resizeImage(html.data[i].image, 480)}" alt="${html.data[i].title}" title="${html.data[i].title}"/>
                                  <div class="media-type media-type--right">
                                    <svg aria-hidden="true" class="symbol symbol-thumbs-up" height="28" version="1.1" viewBox="0 0 28 28" width="28">
                                      <path d="M4 21q0-0.406-0.297-0.703t-0.703-0.297q-0.422 0-0.711 0.297t-0.289 0.703q0 0.422 0.289 0.711t0.711 0.289q0.406 0 0.703-0.289t0.297-0.711zM6.5 13v10q0 0.406-0.297 0.703t-0.703 0.297h-4.5q-0.406 0-0.703-0.297t-0.297-0.703v-10q0-0.406 0.297-0.703t0.703-0.297h4.5q0.406 0 0.703 0.297t0.297 0.703zM25 13q0 1.344-0.859 2.328 0.234 0.688 0.234 1.188 0.047 1.188-0.672 2.141 0.266 0.875 0 1.828-0.234 0.891-0.844 1.469 0.141 1.75-0.766 2.828-1 1.188-3.078 1.219h-2.016q-1.031 0-2.25-0.242t-1.898-0.453-1.883-0.617q-1.922-0.672-2.469-0.688-0.406-0.016-0.703-0.305t-0.297-0.695v-10.016q0-0.391 0.281-0.68t0.672-0.32q0.375-0.031 1.188-0.922t1.578-1.891q1.062-1.359 1.578-1.875 0.281-0.281 0.484-0.75t0.273-0.758 0.211-0.945q0.109-0.609 0.195-0.953t0.305-0.812 0.531-0.781q0.297-0.297 0.703-0.297 0.719 0 1.289 0.164t0.938 0.406 0.625 0.633 0.375 0.703 0.187 0.781 0.078 0.703 0.008 0.609q0 0.594-0.148 1.188t-0.297 0.938-0.43 0.875q-0.047 0.094-0.156 0.281t-0.172 0.344-0.125 0.375h4.328q1.219 0 2.109 0.891t0.891 2.109z"></path>
                                    </svg>
                                    ${html.data[i].like}
                                  </div>
                                </div>
                              </figure>
                              <div class="media-body">
                                <h3 class="media-title">
                                  ${convertTitle(html.data[i].title.substring(0,100))}...
                                </h3>
                                <p class="media-deck">
                                  ${html.data[i].description.substring(0,170)}...
                                </p>
                                <footer class="media-meta">
                                  <time class="media-date">
                                    ${checkDateName(html.data[i].created_at.split(' ')[0])}
                                  </time>
                                </footer>
                              </div>
                            </a>
                          </article>`;
            }
            pagination_html = `<div class="pagination" data-page_number="${html.paginate.current_page}" data-total="${html.paginate.total_pages}"></div>`;
            $('.js-load-forever-container').html(content);
            $('.pagination__wrapper').html(pagination_html);
            initPaginate(url);
          })
        }
      });
    }
  }

  $(document).ready(function(){
    sortbyValue = $('.js-filter-option').data('sort-value');
    sortby = '&sortby=' + sortbyValue ;
    url = '/api/search?type=article&filter=view>=0' + sortby;
    ajaxLoadFilter(url);

    option = $('.js-filter-json').val();
    option_url = `/api/search?type=article&filter=type**review&sortby=${option}&perpage=10`;
    loadTopReviews(option_url);
  })

  $('.js-filter-json').change(function(e) {
    var option = $(this).val();
    var option_url = `/api/search?type=article&filter=type**review&sortby=${option}&perpage=10`;
    loadTopReviews(option_url);
  })

  function loadTopReviews(url) {
    $.ajax({
      url: url,
      type: 'GET',
      success: function (data) {
        var html = '';
        for (var i = 0 ; i < data.data.length ; i++) {
          html += `<li class="game-background reviews-list__item reviews-list__item--first" style="background-image: url(/uploads/${data.data[i].image})">
                    <a href="${data.data[i].url}">
                      <div class="align-vertical--contain">
                        <div class="align-vertical--child game-info-wrapper">
                          <h4 class="game-title">${data.data[i].title}</h4>
                        </div>
                        <dl class="game-score align-vertical--child ">
                          <dt>
                            <div class="gs-score  gs-score--small score-${data.data[i].admin_point}">
                              <div class="gs-score__clip">
                                <div class="gs-score__pie gs-score__spinner"></div>
                              </div>
                              <div class="gs-score__clip gs-score__clip2">
                                <div class="gs-score__pie gs-score__filler"></div>
                              </div>
                              <div class="gs-score__inner">
                                <div class="gs-score__table">
                                  <div class="gs-score__cell">${data.data[i].admin_point}</div>
                                </div>
                              </div>
                            </div>
                          </dt>
                          <dd>${pointSystem(data.data[i].admin_point)}</dd>
                        </dl>
                      </div>
                    </a>
                  </li>`;
        }
        $('.game--top-games').html(html);
      }
    });
  }