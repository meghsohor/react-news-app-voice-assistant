const API_KEY = 'b279f437517a44a492641dc3a1bb6d9a';
let savedArticles = [];

intent('What does this app do?', 'What can I do here?',
    reply('(This is a news project|This is a News reader app)'));

//News by Source
intent('Give (me|) (the|) news from $(source* (.*))', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;

    if (p.source.value) {
        NEWS_API_URL = `${NEWS_API_URL}&sources=${p.source.value.toLowerCase().split(" ").join('-')}`;
    }

    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);

        if (!articles.length) {
            return p.play(`(Sorry, please try searching for news from a different source.|Sorry, no news found from ${p.source.value})`);
        }

        savedArticles = articles;

        p.play({
            command: 'newHeadlines',
            articles: savedArticles
        });
        p.play(`Here are the (latest|recent) from ${p.source.value}`);

        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    });
});

//News by Terms
intent(`(What\'s up with|What about|What is new about|What is latest about|Give me the latest about) $(term* (.*))`, (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;

    if (p.term.value) {
        NEWS_API_URL = `${NEWS_API_URL}&q=${p.term.value}`;
    }

    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);

        if (!articles.length) {
            return p.play(`(Sorry, please try searching for different Term.|Sorry, no articles found on ${p.term.value})`);
        }

        savedArticles = articles;

        p.play({
            command: 'newHeadlines',
            articles: savedArticles
        });
        p.play(`Here are the (latest|recent) articles on ${p.term.value}`);

        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    });
});

// News by Categories | Latest News
const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}|`;

intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT})`,
    `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`, (p) => {
        let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=us`;

        if (p.C.value) {
            NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
        }

        api.request(NEWS_API_URL, (error, response, body) => {
            const { articles } = JSON.parse(body);

            if (!articles.length) {
                p.play('Sorry, please try searching for a different category.');
                return;
            }

            savedArticles = articles;

            p.play({ command: 'newHeadlines', articles });

            if (p.C.value) {
                p.play(`Here are the (latest|recent) articles on ${p.C.value}.`);
            } else {
                p.play(`Here are the (latest|recent) news`);
            }

            p.play('Would you like me to read the headlines?');
            p.then(confirmation);

        });
    });

const confirmation = context(() => {
    intent('(Yes|Go ahead)', async (p) => {
        for (let i = 0; i < savedArticles.length; i++) {
            p.play({
                command: 'highlight',
                article: savedArticles[i],
                articleNumber: i
            });
            p.play(`${savedArticles[i].title}`);
        }
    });

    intent('(No|Not now)', (p) => {
        p.play('(Sure|Sure, sounds good to me.|Okay, let me what else you need.)');
    });
});

//Open an article into a new tab
intent('Open (the|) (article|) (number|) $(number* (.*))', (p) => {
    if (p.number.value) {
        //const articleNumber = p.number.value === 'for' ? 'four' : p.number.value;
        const articleNumber = p.number.value;
        p.play({
            command: 'openArticle',
            articleNumber: articleNumber,
            articles: savedArticles
        });
    }
});

//Read an article
intent('Read (the|) (article|) (number|) $(number* (.*))', (p) => {
    if (savedArticles.length > 0 && p.number.value) {
        const articleNumber = p.number.value;
        p.play({
            command: 'readArticle',
            articleNumber: articleNumber,
            articles: savedArticles
        });
    }
});

//Go back to homepage
intent('(Go back|back|go to homepage|home|go to home)', (p) => {
    if (savedArticles.length === 0) {
        p.play('You are already in homepage');
    } else {
        p.play('Sure, going back.');
        savedArticles = [];
        p.play({
            command: 'newHeadlines',
            articles: savedArticles
        });
    }

    setTimeout(function () {
        p.play('What would you like to read about?');
    }, 2000);
});