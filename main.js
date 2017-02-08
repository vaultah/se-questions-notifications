'use strict';

if (!("Notification" in window)) {
    console.log("Your browser does not support desktop notifications");
} else if (Notification.permission === 'default') {
    Notification.requestPermission();
}

var audio = new Audio(chrome.extension.getURL('sound.wav'));

setInterval(function() {
    var nf = $('.new-post-activity');
    // Can be empty
    if (nf.length) {
        nf.trigger('click');
        audio.play();
        // Number of new questions
        var count = parseInt(nf.text());
        // `count` questions from the top
        var summaries = $('.question-summary').slice(0, count);
        // Iterate in reverse order
        $(summaries.get().reverse()).each(function(i, v) {
            v = $(v);
            var tags = v.find('.tags').find('a').get().map(function(tag) {
                return $(tag).text();
            });

            // Highlight the question
            v.attr('class', 'se-notifications-new-post ' + v.attr('class'));

            // Emit desktop notification if we can
            if ("Notification" in window && Notification.permission === 'granted') {
                var title = $('h3', v);
                var notification = new Notification(title.text(), {
                    body: 'Tags: ' + tags.join(' '),
                    icon: chrome.extension.getURL('icon_128.png')
                });
                notification.onshow = function () {
                    setTimeout(function() { notification.close () }, 8000);
                };
                notification.onclick = function () {
                    window.open(title.find('a').attr('href'), '_blank');
                };
            }
        });
    }
}, 1000);
