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

$(document).on('click', '#scrollToTop', function () {
    $('html, body').animate({scrollTop: 0}, 600);
});

$(function () {
    codeHL();
    $(document).pjax('a', '#pjax-container', {
        fragment: '#pjax-container',
        timeout: 5000
    });
});

