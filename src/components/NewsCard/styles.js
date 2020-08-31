import { makeStyles } from '@material-ui/core';

export default makeStyles({
  media: {
    paddingTop: '56.25%',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderBottom: '10px solid white',
  },
  activeCard: {
    borderBottom: '10px solid #22289a',
  },
  cardContent: {
    flex: 'auto',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
    marginBottom: '10px',
  },
  title: {
    padding: '0 16px',
    paddingTop: '10px',
    borderTop: '1px solid #f5f5f5',
  },
  cardActions: {
    padding: '8px 16px 5px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid #f5f5f5',
  },
});
