"use strict";
function codeHL() {
    $('figure').each(function (i, block) {
        hljs.configure({useBR: true});
        hljs.highlightBlock(block);
    });

    $('code').each(function (i, block) {
        $(block).addClass('bash');
        hljs.configure({useBR: true});
        hljs.highlightBlock(block);
    });
}

function loadingAnimate() {
    var $firstLoadingEls = $('article'),
        $secondLoadingEls = $('.main-header a,.main-header input,#footer-content'),
        stagger = 150;

    $firstLoadingEls.add($secondLoadingEls).css({visibility: 'visible'});
    $secondLoadingEls.hide();

    $firstLoadingEls.velocity("transition.slideDownIn", {
        drag: true, stagger: stagger
    });

    setTimeout(function () {
        $secondLoadingEls.velocity("transition.slideDownIn", {
            drag: true, stagger: stagger
        });

        toggleDuoshuoComments();
    }, $firstLoadingEls.length * stagger + 400);
}

function toggleDuoshuoComments() {
    var dus = $(".ds-thread");
    if (dus.length === 1) {
        var el = document.createElement('div');
        el.setAttribute('data-thread-key', dus.attr("data-thread-key"));
        el.setAttribute('data-url', dus.attr("data-url"));
        DUOSHUO.EmbedThread(el);
        dus.html(el);
    }
}


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
    })

    .on('pjax:beforeSend', '#pjax-container', function (event, setting, options) {
        $('#main-logo').removeClass('active');
    })
    .on('pjax:end', '#pjax-container', function (event, data, status, xhr, options) {
        $('#main-logo').addClass('active');
        codeHL();
        loadingAnimate();
    }).on('click', 'a.toc-link', function () {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
            duration: 500,
            easing: "swing"
        });
        return false;
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

