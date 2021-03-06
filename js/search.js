function loadTopArticles(url) {
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            var html = '';
            if (data.data.length == 0) html = 'Không tìm thấy kết quả!!!';
            for (var i = 0; i < data.data.length; i++) {
                html += `<article class="media media-game media-game">
                              <a href="${data.data[i].url}">`;

                if (data.data[i].type == 'review') {
                    html += `<div class="media-well media-well--review">
                        <div class="media-well--review-gs">
                            <div class="media-well--review-score">
                                <span class="content">${data.data[i].admin_point}</span>
                            </div>
                            <span class="score-word">${pointSystem(data.data[i].admin_point)}</span>
                        </div>
                    </div>`;
                }

                html += `<figure class="media-figure media-figure--medium">
                      <div class="media-img imgflare--boxart">
                          <img src="/uploads/${data.data[i].image}" alt="${data.data[i].title}" title="${data.data[i].title}"/>
                          <div class="media-type media-type--right">
                              <svg aria-hidden="true" class="symbol symbol-thumbs-up" height="28" version="1.1" viewBox="0 0 28 28" width="28">
                                  <path d="M4 21q0-0.406-0.297-0.703t-0.703-0.297q-0.422 0-0.711 0.297t-0.289 0.703q0 0.422 0.289 0.711t0.711 0.289q0.406 0 0.703-0.289t0.297-0.711zM6.5 13v10q0 0.406-0.297 0.703t-0.703 0.297h-4.5q-0.406 0-0.703-0.297t-0.297-0.703v-10q0-0.406 0.297-0.703t0.703-0.297h4.5q0.406 0 0.703 0.297t0.297 0.703zM25 13q0 1.344-0.859 2.328 0.234 0.688 0.234 1.188 0.047 1.188-0.672 2.141 0.266 0.875 0 1.828-0.234 0.891-0.844 1.469 0.141 1.75-0.766 2.828-1 1.188-3.078 1.219h-2.016q-1.031 0-2.25-0.242t-1.898-0.453-1.883-0.617q-1.922-0.672-2.469-0.688-0.406-0.016-0.703-0.305t-0.297-0.695v-10.016q0-0.391 0.281-0.68t0.672-0.32q0.375-0.031 1.188-0.922t1.578-1.891q1.062-1.359 1.578-1.875 0.281-0.281 0.484-0.75t0.273-0.758 0.211-0.945q0.109-0.609 0.195-0.953t0.305-0.812 0.531-0.781q0.297-0.297 0.703-0.297 0.719 0 1.289 0.164t0.938 0.406 0.625 0.633 0.375 0.703 0.187 0.781 0.078 0.703 0.008 0.609q0 0.594-0.148 1.188t-0.297 0.938-0.43 0.875q-0.047 0.094-0.156 0.281t-0.172 0.344-0.125 0.375h4.328q1.219 0 2.109 0.891t0.891 2.109z"></path>
                              </svg>
                              ${data.data[i].like}
                          </div>
                      </div>
                  </figure>
                  <div class="media-body">
                      <h3 class="media-title">${data.data[i].title}</h3>
                      <p class="media-deck">${data.data[i].description}</p>
                      <footer class="media-meta">
                          <time class="media-date">${checkDateName(data.data[i].created_at.split(' ')[0])}</time>
                      </footer>
                  </div>
              </a>
          </article>`;
            }

            pagination_html = `<div class="pagination" data-page_number="${data.paginate.current_page}" data-total="${data.paginate.total_pages}"></div>`;
            $('#js-sort-filter-results .editorial').html(html);
            $('.pagination__wrapper').html(pagination_html);
            initPaginate(url);
        }
    });
}

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
                } else {
                    if (href.indexOf('&page=') > -1)
                        href = href.substring(0, href.indexOf('&page='));
                    if (page > 1)
                        href = href + '&page=' + page;
                }
                $.get(href, function (data) {
                    var html = '';
                    if (data.data.length == 0) html = 'Không tìm thấy kết quả!!!';
                    for (var i = 0; i < data.data.length; i++) {
                        html += `<article class="media media-game media-game">
                                  <a href="${data.data[i].url}">`;

                        if (data.data[i].type == 'review') {
                            html += `<div class="media-well media-well--review">
                                          <div class="media-well--review-gs">
                                              <div class="media-well--review-score">
                                                  <span class="content">${data.data[i].admin_point}</span>
                                              </div>
                                              <span class="score-word">${pointSystem(data.data[i].admin_point)}</span>
                                          </div>
                                      </div>`;
                        }

                        html += `<figure class="media-figure media-figure--medium">
                                      <div class="media-img imgflare--boxart">
                                          <img src="/uploads/${data.data[i].image}" alt="${data.data[i].title}" title="${data.data[i].title}"/>
                                          <div class="media-type media-type--right">
                                              <svg aria-hidden="true" class="symbol symbol-thumbs-up" height="28" version="1.1" viewBox="0 0 28 28" width="28">
                                                  <path d="M4 21q0-0.406-0.297-0.703t-0.703-0.297q-0.422 0-0.711 0.297t-0.289 0.703q0 0.422 0.289 0.711t0.711 0.289q0.406 0 0.703-0.289t0.297-0.711zM6.5 13v10q0 0.406-0.297 0.703t-0.703 0.297h-4.5q-0.406 0-0.703-0.297t-0.297-0.703v-10q0-0.406 0.297-0.703t0.703-0.297h4.5q0.406 0 0.703 0.297t0.297 0.703zM25 13q0 1.344-0.859 2.328 0.234 0.688 0.234 1.188 0.047 1.188-0.672 2.141 0.266 0.875 0 1.828-0.234 0.891-0.844 1.469 0.141 1.75-0.766 2.828-1 1.188-3.078 1.219h-2.016q-1.031 0-2.25-0.242t-1.898-0.453-1.883-0.617q-1.922-0.672-2.469-0.688-0.406-0.016-0.703-0.305t-0.297-0.695v-10.016q0-0.391 0.281-0.68t0.672-0.32q0.375-0.031 1.188-0.922t1.578-1.891q1.062-1.359 1.578-1.875 0.281-0.281 0.484-0.75t0.273-0.758 0.211-0.945q0.109-0.609 0.195-0.953t0.305-0.812 0.531-0.781q0.297-0.297 0.703-0.297 0.719 0 1.289 0.164t0.938 0.406 0.625 0.633 0.375 0.703 0.187 0.781 0.078 0.703 0.008 0.609q0 0.594-0.148 1.188t-0.297 0.938-0.43 0.875q-0.047 0.094-0.156 0.281t-0.172 0.344-0.125 0.375h4.328q1.219 0 2.109 0.891t0.891 2.109z"></path>
                                              </svg>
                                              ${data.data[i].like}
                                          </div>
                                      </div>
                                  </figure>
                                  <div class="media-body">
                                      <h3 class="media-title">${data.data[i].title}</h3>
                                      <p class="media-deck">${data.data[i].description}</p>
                                      <footer class="media-meta">
                                          <time class="media-date">${checkDateName(data.data[i].created_at.split(' ')[0])}</time>
                                      </footer>
                                  </div>
                              </a>
                          </article>`;
                    }
                    pagination_html = `<div class="pagination" data-page_number="${data.paginate.current_page}" data-total="${data.paginate.total_pages}"></div>`;
                    $('#js-sort-filter-results .editorial').html(html);
                    $('.pagination__wrapper').html(pagination_html);
                    initPaginate(url);
                })
            }
        });
    }
}

$('.search-select-sort').change(function (e) {
    searchContent = $('.divider input').val();
    searchContentDefault = $('#search-content-hidden').val();
    option = $(this).val();
    if (!searchContent)
        searchContent = searchContentDefault;
    if (option == 'admin_point-desc' || option == 'admin_point-asc')
        option_url = `/api/search?type=article&filter=${type}%26%26admin_point>0${option_1}${option_2}${option_3}${option_4}&q=${searchContent}&sortby=${option}`;
    else
        option_url = `/api/search?type=article&filter=${type}${option_1}${option_2}${option_3}${option_4}&q=${searchContent}&sortby=${option}`;
    loadTopArticles(option_url);
})

$('#post-type').change(function (e) {
    searchContent = $('.divider input').val();
    searchContentDefault = $('#search-content-hidden').val();
    type = $(this).val();
    if (!searchContent)
        searchContent = searchContentDefault;
    if (option == 'admin_point-desc' || option == 'admin_point-asc')
        option_url = `/api/search?type=article&filter=${type}%26%26admin_point>0${option_1}${option_2}${option_3}${option_4}&q=${searchContent}&sortby=${option}`;
    else
        option_url = `/api/search?type=article&filter=${type}${option_1}${option_2}${option_3}${option_4}&q=${searchContent}&sortby=${option}`;
    loadTopArticles(option_url);
})

$('#attr-filter-1, #attr-filter-2, #attr-filter-3, #attr-filter-4').change(function (e) {
    searchContent = $('.divider input').val();
    searchContentDefault = $('#search-content-hidden').val();
    option_1 = $('#attr-filter-1').val();
    option_2 = $('#attr-filter-2').val();
    option_3 = $('#attr-filter-3').val();
    option_4 = $('#attr-filter-4').val();
    if (!searchContent)
        searchContent = searchContentDefault;
    if (option == 'admin_point-desc' || option == 'admin_point-asc')
        option_url = `/api/search?type=article&filter=${type}%26%26admin_point>0${option_1}${option_2}${option_3}${option_4}&q=${searchContent}&sortby=${option}`;
    else
        option_url = `/api/search?type=article&filter=${type}${option_1}${option_2}${option_3}${option_4}&q=${searchContent}&sortby=${option}`;
    loadTopArticles(option_url);
})

$('.divider input').change(function() {
    searchContent = $('.divider input').val();
    searchContentDefault = $('#search-content-hidden').val();
    if (!searchContent)
        searchContent = searchContentDefault;
    if (option == 'admin_point-desc' || option == 'admin_point-asc')
        option_url = `/api/search?type=article&filter=${type}%26%26admin_point>0${option_1}${option_2}${option_3}${option_4}&q=${searchContent}&sortby=${option}`;
    else
        option_url = `/api/search?type=article&filter=${type}${option_1}${option_2}${option_3}${option_4}&q=${searchContent}&sortby=${option}`;
    loadTopArticles(option_url);
})

$(document).ready(function () {
    searchContent = $('.divider input').val();
    searchContentDefault = $('#search-content-hidden').val();
    option = $('.search-select-sort').val();
    type = $('#post-type').val();
    option_1 = $('#attr-filter-1').val();
    option_2 = $('#attr-filter-2').val();
    option_3 = $('#attr-filter-3').val();
    option_4 = $('#attr-filter-4').val();
    if (!searchContent)
        searchContent = searchContentDefault;
    if (option == 'admin_point-desc' || option == 'admin_point-asc')
        option_url = `/api/search?type=article&filter=${type}%26%26admin_point>0${option_1}${option_2}${option_3}${option_4}&q=${searchContent}&sortby=${option}`;
    else
        option_url = `/api/search?type=article&filter=${type}${option_1}${option_2}${option_3}${option_4}&q=${searchContent}&sortby=${option}`;
    loadTopArticles(option_url);
})

/* <svg aria-hidden="true" class="symbol symbol-comments" height="28" version="1.1" viewBox="0 0 28 28" width="28">
                                                  <path d="M22 12q0 2.172-1.469 4.016t-4.008 2.914-5.523 1.070q-1.344 0-2.75-0.25-1.937 1.375-4.344 2-0.562 0.141-1.344 0.25h-0.047q-0.172 0-0.32-0.125t-0.18-0.328q-0.016-0.047-0.016-0.102t0.008-0.102 0.031-0.094l0.039-0.078t0.055-0.086 0.063-0.078 0.070-0.078 0.063-0.070q0.078-0.094 0.359-0.391t0.406-0.461 0.352-0.453 0.391-0.602 0.32-0.688q-1.937-1.125-3.047-2.766t-1.109-3.5q0-2.172 1.469-4.016t4.008-2.914 5.523-1.070 5.523 1.070 4.008 2.914 1.469 4.016zM28 16q0 1.875-1.109 3.508t-3.047 2.758q0.156 0.375 0.32 0.688t0.391 0.602 0.352 0.453 0.406 0.461 0.359 0.391q0.016 0.016 0.063 0.070t0.070 0.078 0.063 0.078 0.055 0.086l0.039 0.078t0.031 0.094 0.008 0.102-0.016 0.102q-0.047 0.219-0.203 0.344t-0.344 0.109q-0.781-0.109-1.344-0.25-2.406-0.625-4.344-2-1.406 0.25-2.75 0.25-4.234 0-7.375-2.063 0.906 0.063 1.375 0.063 2.516 0 4.828-0.703t4.125-2.016q1.953-1.437 3-3.313t1.047-3.969q0-1.203-0.359-2.375 2.016 1.109 3.187 2.781t1.172 3.594z"></path>
                                              </svg>
                                              ${data.data[i].comment} */