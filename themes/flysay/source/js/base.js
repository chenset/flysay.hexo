"use strict";
function codeHL() {
    $('figure, code').each(function (i, block) {
        hljs.highlightBlock(block);
    });
}

function loadingAnimate() {
    var $firstLoadingEls = $('article'),
        $secondLoadingEls = $('.main-header a,.main-header input,#footer-content'),
        stagger = 150;

    $secondLoadingEls.hide();

    $firstLoadingEls.velocity("transition.slideDownIn", {
        drag: true, stagger: stagger
    });

    setTimeout(function () {
        $secondLoadingEls.velocity("transition.slideDownIn", {
            drag: true, stagger: stagger
        });
    }, $firstLoadingEls.length * stagger + 400);
}

$('#pjax-container').on('pjax:beforeSend', function (event, setting, options) {
    $('#main-logo').removeClass('active');
}).on('pjax:success', function (event, data, status, xhr, options) {
    codeHL();
}).on('pjax:end', function (event, data, status, xhr, options) {
    $('#main-logo').addClass('active');
    loadingAnimate();
});

$(document)
    .on('click', '#scroll-to-top', function () {
        $('html, body').animate({scrollTop: 0}, 600);
    })
    .on('scroll', function () {
        clearTimeout(window._scrollTimeoutTimer);
        window._scrollTimeoutTimer = setTimeout(function () {
            if ($(document).scrollTop() > 500) {
                $('#scroll-to-top:hidden').velocity("transition.slideDownIn", {
                    drag: true, stagger: 150
                });
            } else {
                $('#scroll-to-top:visible').velocity("transition.slideDownOut", {
                    drag: true, stagger: 150
                });
            }
        }, 300);
    });

$(function () {
    loadingAnimate();
    $('#main-logo').addClass('active');
    codeHL();
    $(document).pjax('a', '#pjax-container', {
        fragment: '#pjax-container',
        timeout: 5000
    });
});

