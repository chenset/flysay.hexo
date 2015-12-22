"use strict";

$('#pjax-container').on('pjax:success', function (event, data, status, xhr, options) {
    if (typeof options.successCallback === 'function') {
        options.successCallback(data, status, xhr, options);
    }
});

function codeHL() {
    $('figure, code').each(function (i, block) {
        hljs.highlightBlock(block);
    });
}

$(function () {
    codeHL();
    $(document).pjax('a', '#pjax-container', {
        fragment: '#pjax-container',
        timeout: 3000,
        successCallback: function (data, status, xhr, options) {
            codeHL();
        }
    });
});

