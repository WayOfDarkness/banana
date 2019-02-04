function loadTopArticles(url) {
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            var html = '';
            for (var i = 0 ; i < data.data.length ; i++) {
                html += `<article class="media media-game media-game">
                            <a class="blog-review-article" href="${data.data[i].url}">
                                <div class="media-well media-well--review">
                                    <div class="media-well--review-gs">
                                        <div class="media-well--review-score">
                                            <span class="content">${data.data[i].admin_point}</span>
                                        </div>
                                        <span class="score-word">${pointSystem(data.data[i].admin_point)}</span>
                                    </div>
                                </div>
                                <figure class="media-figure media-figure--medium">
                                    <div class="media-img imgflare--boxart">
                                        <img src="/uploads/${data.data[i].image}" alt="${data.data[i].title}" title="${data.data[i].title}"/>
                                    </div>
                                </figure>
                                <div class="media-body">
                                    <h3 class="media-title">${convertTitle(data.data[i].title.substring(0,60))}...</h3>
                                    <p class="media-deck">${data.data[i].description.substring(0,150)}...</p>
                                    <footer class="media-meta">
                                        <time class="media-date">
                                            ${checkDateName(data.data[i].created_at.split(' ')[0])}
                                        </time>
                                    </footer>
                                </div>
                            </a>
                        </article>`;
            }
            pagination_html = `<div class="pagination" data-page_number="${data.paginate.current_page}" data-total="${data.paginate.total_pages}"></div>`;
            $('.filter-review-results').html(html);
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
            }
            else {
            if (href.indexOf('&page=') > -1)
                href = href.substring(0, href.indexOf('&page='));
            if (page > 1)
                href = href + '&page=' + page;
            }
            $.get(href, function (data) {
                var html = '';
                for (var i = 0; i < data.data.length; i++) {
                    html += `<article class="media media-game media-game">
                                <a href="${data.data[i].url}">
                                    <div class="media-well media-well--review">
                                        <div class="media-well--review-gs">
                                            <div class="media-well--review-score">
                                                <span class="content">${data.data[i].admin_point}</span>
                                            </div>
                                            <span class="score-word">${pointSystem(data.data[i].admin_point)}</span>
                                        </div>
                                    </div>
                                    <figure class="media-figure media-figure--medium">
                                        <div class="media-img imgflare--boxart">
                                            <img src="/uploads/${data.data[i].image}" alt="${data.data[i].title}" title="${data.data[i].title}"/>
                                        </div>
                                    </figure>
                                    <div class="media-body">
                                        <h3 class="media-title">${convertTitle(data.data[i].title.substring(0,60))}...</h3>
                                        <p class="media-deck">${data.data[i].description.substring(0,150)}...</p>
                                        <footer class="media-meta">
                                            <time class="media-date">
                                                ${checkDateName(data.data[i].created_at.split(' ')[0])}
                                            </time>
                                        </footer>
                                    </div>
                                </a>
                            </article>`;
                }
                pagination_html = `<div class="pagination" data-page_number="${data.paginate.current_page}" data-total="${data.paginate.total_pages}"></div>`;
                $('.filter-review-results').html(html);
                $('.pagination__wrapper').html(pagination_html);
                initPaginate(url);
                })
            }
        });
    }
}

$('.js-filter-load-page').change(function(e) {
    option = $(this).val();
    type = $('.js-filter-load-page').data('type');
    search_data = $('.sort-search').find('input[name="q"]').val();
    option_url = `/api/search?type=article&filter=type**${type}&q=${search_data}&sortby=${option}`;
    loadTopArticles(option_url);
})
    
$(document).ready(function(){
    option = $('.js-filter-load-page').val();
    type = $('.js-filter-load-page').data('type');
    search_data = $('.sort-search').find('input[name="q"]').val();
    option_url = `/api/search?type=article&filter=type**${type}&q=${search_data}&sortby=${option}`;
    loadTopArticles(option_url);
})

$('.sort-search').submit(function(e) {
    e.preventDefault();
    search_data = $(this).find('input[name="q"]').val();
    option = $('.js-filter-load-page').val();
    search_url = `/api/search?type=article&filter=type**review&q=${search_data}&sortby=${option}`;
    loadTopArticles(search_url);
})