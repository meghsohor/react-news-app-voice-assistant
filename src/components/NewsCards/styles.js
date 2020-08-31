import { makeStyles } from '@material-ui/core';

export default makeStyles({
  container: {
    padding: '0 5%',
    width: '100%',
    margin: 0,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '45vh',
    borderRadius: 10,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    padding: '10%',
    borderRadius: 10,
    color: '#FFFFFF',
  },
  cardTitle: {
    borderBottom: '2px solid #FFFFFF',
    paddingBottom: '8px',
  },
  infoCard: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
});
