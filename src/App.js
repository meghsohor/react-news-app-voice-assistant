import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';
import { Typography, Paper, IconButton } from '@material-ui/core';
import { LinkedIn, GitHub, Language } from '@material-ui/icons';
import HashLoader from 'react-spinners/HashLoader';

import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';

const alanKey = 'c6b565c8f9a02599f4145de821b0a8152e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]); // Storing Articles array
  const [activeArticle, setActiveArticle] = useState(0); // Storing Active Article
  const [loader, setLoader] = useState(true); // Storing loader state

  const classes = useStyles();

  const disableLoader = () => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };

  useEffect(() => {
    // Initializing the Alan AI floating button
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, articleNumber }) => {
        if (command === 'newHeadlines') {
          setLoader(true);
          setNewsArticles(articles);
          /* Everytime we get a new list of articles/news we need to reset the activeArticle */
          setActiveArticle(-1);
          disableLoader();
        } else if (command === 'highlight') {
          setActiveArticle(articleNumber);
        } else if (command === 'openArticle') {
          const targetArticleNumber = Number.isNaN(articleNumber) ? wordsToNumbers(articleNumber, { fuzzy: true }) : articleNumber;

          if (!Number.isNaN(targetArticleNumber) && targetArticleNumber <= articles.length) {
            const article = articles[targetArticleNumber - 1];
            setActiveArticle(targetArticleNumber - 1);
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('(Maybe, you are trying a wrong article|Please try again...)');
          }
        } else if (command === 'readArticle') {
          const targetArticleNumber = Number.isNaN(articleNumber) ? wordsToNumbers(articleNumber, { fuzzy: true }) : articleNumber;

          if (!Number.isNaN(targetArticleNumber) && targetArticleNumber <= articles.length) {
            const article = articles[targetArticleNumber - 1];

            setActiveArticle(targetArticleNumber - 1);
            alanBtn().playText(`${article.title}`);
          } else {
            alanBtn().playText('(Maybe, you are trying a wrong article|Please try again...)');
          }
        }
      },
    });
  }, []);

  disableLoader();

  return (
    <div id="appContainer" className={classes.appContainer}>
      {!loader
        ? (
          <>
            <div className={classes.headerContainer}>

              {newsArticles.length ? (
                <div className={classes.infoContainer}>
                  <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Read/Open article number [4]</Typography></div>
                  <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
                </div>
              ) : null}

              <div className={classes.logoContainer}><img src="//alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="Alan AI - Voice Assistant" /></div>
            </div>

            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
          </>
        )
        : (
          <div className={classes.loader}>
            <HashLoader loading={loader} color="#1567d3" />
          </div>
        )}

      {!newsArticles.length ? (
        <Paper className={classes.footer}>
          <IconButton href="https://www.linkedin.com/in/meghsohor/" color="primary" target="_blank" rel="noopener">
            <LinkedIn fontSize="large" />
          </IconButton>
          <IconButton href="https://github.com/meghsohor" color="primary" target="_blank" rel="noopener">
            <GitHub fontSize="large" />
          </IconButton>
          <IconButton href="http://www.meghsohor.com/" color="primary" target="_blank" rel="noopener">
            <Language fontSize="large" />
          </IconButton>
        </Paper>
      ) : null}
    </div>
  );
};

export default App;
