"use strict";
var $mainLogo = $('#main-logo');

function codeHL() {
    $('figure, code').each(function (i, block) {
        hljs.highlightBlock(block);
    });
}

$('#pjax-container').on('pjax:beforeSend', function (event, setting, options) {
    NProgress.start();
    $mainLogo.removeClass('active');
}).on('pjax:success', function (event, data, status, xhr, options) {
    codeHL();
}).on('pjax:complete', function (event, data, status, xhr, options) {
    $mainLogo.addClass('active');
    NProgress.done();
});

$(document).on('click', '#scroll-to-top', function () {
    $('html, body').animate({scrollTop: 0}, 600);
});

$(function () {
    $mainLogo.addClass('active');
    codeHL();
    $(document).pjax('a', '#pjax-container', {
        fragment: '#pjax-container',
        timeout: 5000
    });

    NProgress.configure({showSpinner: false});
});

