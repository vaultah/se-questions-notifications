A simple extension that fetches the latest questions from pages of Stack Exchange sites.

Stack Exchange sites perform question filtering in browser, and I don't want to roll out a fragile tag filtering logic which may break after some minor change on their side. Therefore, this extension listens to DOM changes. It will only work if you open the main page or a page like the one on the screenshot.

![](http://i.imgur.com/v9RGThU.png)

For each new question this extension plays a notification sound and displays a clickable desktop notification. Clicking on the desktop notification will open a new tab with the corresponding question.

This extension is licensed under MIT and is available on GitHub and [Chrome Web Store](https://chrome.google.com/webstore/detail/stack-exchange-questions/dbikeaiagnndkbbeeimonfahdmpfgiib).
