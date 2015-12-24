"use strict";

function codeHL() {
    $('figure, code').each(function (i, block) {
        hljs.highlightBlock(block);
    });
}

$('#main-logo').addClass('active');
$('#pjax-container').on('pjax:beforeSend', function (event, setting, options) {
    NProgress.start();
    $('#main-logo').removeClass('active');
}).on('pjax:success', function (event, data, status, xhr, options) {
    codeHL();
}).on('pjax:complete', function (event, data, status, xhr, options) {
    $('#main-logo').addClass('active');

    NProgress.done();
});

$(document).on('click', '#scroll-to-top', function () {
    $('html, body').animate({scrollTop: 0}, 600);
});

$(function () {
    codeHL();
    $(document).pjax('a', '#pjax-container', {
        fragment: '#pjax-container',
        timeout: 5000
    });

    NProgress.configure({ showSpinner: false });
});

