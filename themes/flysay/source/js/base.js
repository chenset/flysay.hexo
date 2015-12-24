"use strict";

function codeHL() {
    $('figure, code').each(function (i, block) {
        hljs.highlightBlock(block);
    });
}

$('#pjax-container').on('pjax:beforeSend', function (event, setting, options) {
    NProgress.start();
}).on('pjax:success', function (event, data, status, xhr, options) {
    codeHL();
}).on('pjax:complete', function (event, data, status, xhr, options) {
    NProgress.done();
});

$(document).on('click', '#scroll-to-top', function () {
    console.log(12312);
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

