'use strict';

function SE_questions_check() {
    var copy = $('#copyright'), link = $('a', 'li.youarehere'), 
        qcount = $('.summarycount', '#sidebar');
    return (copy.length &&
            copy.html().indexOf('stack exchange inc') != -1 &&
            ((link.length &&
              link.attr('href').indexOf('/questions') != -1 &&
              qcount.length) ||
             document.location.pathname == '/'));
}

if (SE_questions_check()) {
    console.log('Notifications about new questions have been enabled');
    if (!("Notification" in window)) {
        console.log("Your browser does not support desktop notifications");
    } else if (Notification.permission === 'default') {
        Notification.requestPermission();
    }

    function make_box(tags) {
        var box_cls = 'question-tags-popup', queue_cls = 'box-queue',
            popups = $('.' + box_cls), new_box;

        new_box = $("<div>", {html: '<div>'+tags.join('</div><div>')+'</div>',
                              class: box_cls})
        if (!$('#' + queue_cls).length)
            $('body').prepend($('<div>', { id: queue_cls }));

        $('#' + queue_cls).prepend(new_box);

        // 5 boxes at most
        if (popups.length >= 5)
            popups.last().remove();
    }

    var audio = new Audio(chrome.extension.getURL('sound.wav'));

    setInterval(function() {
        var nf = $('.new-post-activity');
        // Can be empty
        if (nf.length) {
            // Play sound immediately
            audio.play();
            nf.trigger('click');
            // Number of new questions
            var count = parseInt(nf.text());
            // `count` questions from the top
            var summaries = $('.question-summary').slice(0, count);
            // Iterate in reverse order
            $(summaries.get().reverse()).each(function(i, v) {
                var tags = $(v).find('.tags').find('a').get().map(function(tag) {
                    return $(tag).text();
                });
                // Display the box
                make_box(tags);
                // Emit desktop notification if we can
                if ("Notification" in window && Notification.permission === 'granted') {
                    var title = $('h3', v);
                    var notification = new Notification(title.text(), {
                        body: 'Tags: ' + tags.join(' '),
                        icon: chrome.extension.getURL('icon_128.png')
                    });
                    notification.onshow = function () {
                        setTimeout(function() { notification.close () }, 7500);
                    };
                    notification.onclick = function () {
                        window.open(title.find('a').attr('href'), '_blank');
                    };
                }
            });
        }
    }, 1000);
}
