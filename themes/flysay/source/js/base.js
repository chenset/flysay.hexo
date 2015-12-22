"use strict";

function codeHL() {
    $('figure, code').each(function (i, block) {
        hljs.highlightBlock(block);
    });
}

$('#pjax-container').on('pjax:beforeSend', function (event, setting, options) {
    $('#cover-wrap').fadeIn(300);
}).on('pjax:success', function (event, data, status, xhr, options) {
    codeHL();
}).on('pjax:complete', function (event, data, status, xhr, options) {
    $('#cover-wrap').fadeOut(200);
});


$(function () {
    codeHL();
    $(document).pjax('a', '#pjax-container', {
        fragment: '#pjax-container',
        timeout: 3000
    });
});

