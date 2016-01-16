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
        drag: true
    });

    setTimeout(function () {
        $secondLoadingEls.velocity("transition.slideDownIn", {
            drag: true, stagger: stagger
        });

        toggleDuoshuoComments();
    }, stagger + 300);
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

function headerAnimateCtrl() {
    if ($(document).scrollTop() > 20) {
        $('.main-header').addClass('animation');
    } else {
        $('.main-header').removeClass('animation');
    }
}

$(document)
    .on('click', '#scroll-to-top', function () {
        $('html, body').animate({scrollTop: 0}, 600);
    })

    .on('scroll', function () {
        clearTimeout(window._scrollTimeoutTimer);
        headerAnimateCtrl();
        window._scrollTimeoutTimer = setTimeout(function () {
            var distance = $(document).scrollTop();
            if (distance > 500) {
                $('#scroll-to-top:hidden').velocity("transition.slideDownIn", {
                    drag: true, stagger: 150
                });
            } else {
                $('#scroll-to-top:visible').velocity("transition.slideDownOut", {
                    drag: true, stagger: 150
                });
            }
        }, 100);
    })

    .on('pjax:beforeSend', '#pjax-container', function (event, setting, options) {
        $('#main-logo').removeClass('active');
    })
    .on('pjax:end', '#pjax-container', function (event, data, status, xhr, options) {
        $('#main-logo').addClass('active');
        codeHL();
        loadingAnimate();
    }).on('click', 'a.toc-link', function () {
        $("html, body").stop().animate({
            scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
            duration: 500,
            easing: "swing"
        });
        return false;
    });

$(function () {
    headerAnimateCtrl();
    loadingAnimate();
    $('#main-logo').addClass('active');
    codeHL();
    $(document).pjax('a', '#pjax-container', {
        fragment: '#pjax-container',
        timeout: 5000
    });
});

