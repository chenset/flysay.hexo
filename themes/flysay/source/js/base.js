"use strict";
function codeHL() {
    $('figure, code').each(function (i, block) {
        hljs.highlightBlock(block);
    });
}

$('#pjax-container').on('pjax:beforeSend', function (event, setting, options) {
    NProgress.start();
    $('#main-logo').removeClass('active');
}).on('pjax:success', function (event, data, status, xhr, options) {
    codeHL();
}).on('pjax:end', function (event, data, status, xhr, options) {
    $('#main-logo').addClass('active');
    NProgress.done();
});

$(document).on('click', '#scroll-to-top', function () {
    $('html, body').animate({scrollTop: 0}, 600);
});

$(function () {
    $('#main-logo').addClass('active');
    codeHL();
    $(document).pjax('a', '#pjax-container', {
        fragment: '#pjax-container',
        timeout: 5000
    });

    NProgress.configure({showSpinner: false});
});

