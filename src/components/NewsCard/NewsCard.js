import React, { useState, useEffect, createRef } from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import classNames from 'classnames';

import useStyles from './styles';

const NewsCard = ({ article, i, activeArticle, articlesCount }) => {
  // console.log(article);
  const { description, publishedAt, source, title, url, urlToImage } = article;
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

  useEffect(() => {
    window.scroll(0, 0);
    setElRefs((refs) => Array(articlesCount).fill().map((_, j) => refs[j] || createRef()));
  }, [articlesCount]);

  useEffect(() => {
    if (i === activeArticle && elRefs[activeArticle]) {
      scrollToRef(elRefs[activeArticle]);
    }
  }, [i, activeArticle, elRefs]);

  return (
    <Card ref={elRefs[i]} className={classNames(classes.card, activeArticle === i ? classes.activeCard : null)}>
      <CardActionArea className={classes.cardContent} href={url} target="_blank">
        <CardMedia className={classes.media} image={urlToImage || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'} />
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {(new Date(publishedAt)).toDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            {source.name}
          </Typography>
        </div>
    
        <Typography className={classes.title} variant="h5" gutterBottom>{title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
        </CardContent>
      </CardActionArea>
    
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" href={url} target='_blank'>Learn More</Button>
        <Typography variant="h5" color="textSecondary">{i + 1}</Typography>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
