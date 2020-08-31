import React from 'react';
import { Grid, Grow, Typography, Paper } from '@material-ui/core';

import NewsCard from '../NewsCard/NewsCard';
import useStyles from './styles';

const infoCards = [
  { color: 'rgb(0, 131, 143, 0.9)', bgImg: 'url("./img/news-1.jpg")', title: 'Latest News', text: 'Give me the latest news' },
  { color: 'rgba(21, 101, 192, 0.9)', bgImg: 'url("./img/news-2.jpg")', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
  { color: 'rgba(69, 39, 160, 0.9)', bgImg: 'url("./img/news-3.jpg")', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
  { color: 'rgba(40, 53, 147, 0.9)', bgImg: 'url("./img/news-4.jpg")', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from CNN' },
];

const NewsCards = ({ articles, activeArticle }) => {
  const classes = useStyles();

  if (!articles.length) {
    return (
      <Grow in>
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {infoCards.map((infoCard, i) => (
            <Grid key={i} item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
              <Paper elevation={3} className={classes.card} style={{ backgroundImage: infoCard.bgImg }}>
                <div className={classes.cardContent} style={{ backgroundColor: infoCard.color }}>
                  <Typography variant="h5" className={classes.cardTitle}>{infoCard.title}</Typography>
                  {
                    infoCard.info &&
                    <Typography variant="h6"><strong>{infoCard.title.split(' ')[2]}:</strong><br />{infoCard.info}</Typography>
                  }
                  <Typography variant="h6">Try saying: <br /> <i>{infoCard.text}</i></Typography>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grow>
    );
  }
  return (
    <Grow in>
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {articles.map((article, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
            <NewsCard
              article={article}
              activeArticle={activeArticle}
              i={i}
              articlesCount={articles.length}
            />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
};

export default NewsCards;
