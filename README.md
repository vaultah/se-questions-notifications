A basic parasitic extension that fetches the latest questions from pages of Stack Exchange sites. 

Stack Exchange sites perform question filtering in browser and I don't want to roll out a fragile tag filtering logic which may break after some minor change on their side. This is why this extension listens to DOM changes and works ONLY if there's an open page like the one on the attached screenshot (with real time notifications about new questions). 

Simply put, the extension will work if the page you've opened in your browser displays the following (or very similar) message: "N question(s) with new activity".

![](https://lh3.googleusercontent.com/vt478S4EGejOoMpFP3V0bHNyVZdqMPuQervjbIHWVrE=w2560-h1440-no)

For each new question this extension puts its tags into the box (and displays the box on the page; number of these boxes is constant), plays the notification sound and shows the clickable desktop notification.

Clicking on the desktop notification will open a new tab with the corresponding question.

This extension is licensed under MIT and is available on [GitHub](https://github.com/vaultah/se-questions-notifications) and [Chrome Web Store](https://chrome.google.com/webstore/detail/stack-exchange-questions/dbikeaiagnndkbbeeimonfahdmpfgiib).