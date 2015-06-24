'use strict';


function SE_questions_check() {
    var copyright = $('#copyright'), link = $('a', 'li.youarehere');
    return (copyright.length &&
            copyright.html().indexOf('stack exchange inc') != -1 &&
            link.length && 
            link.attr('href').indexOf('/questions') != -1);
}

if (SE_questions_check()) {
    if (!("Notification" in window)) {
        console.log("Your browser does not seem to support desktop notifications");
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
        var tags, notification, count, children, title, nf = $('.new-post-activity');
        // Can be empty. Doing nothing if it is.
        if (nf.length) {
            // Play sound immediately
            audio.play();
            nf.trigger('click');
            // Number of new questions
            count = parseInt(nf.text());
            // `count` questions from the top
            children = $('.question-summary').slice(0, count);
            // Iterate over children in reverse order
            $(children.get().reverse()).each(function(i, v) {
                // Fetch all classes remove the first one (`tags`)
                tags = $(v).find('.tags').find('a').get().map(function (tag) {
                    return tag.text;
                });
                title = $('h3', v);
                if (Notification.permission === 'granted') {
                    notification = new Notification(title.text(), {
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
                // Finally, display it
                make_box(tags);
            });
        }
    }, 1000);
}
