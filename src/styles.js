import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  footer: {
    color: 'black',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90px',
    minHeight: '90px',
    marginTop: 'auto',
  },
  link: {
    textDecoration: 'none',
    color: 'rgba(21, 101, 192)',
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '350px',
    maxWidth: '100%',
    padding: '3%',
    borderRadius: 10,
    color: 'white',
    backgroundColor: 'rgb(21, 103, 211)',
    backgroundImage: 'linear-gradient(122deg,rgba(0, 70, 255, 0.95),rgba(0, 156,  255, 0.95))',
    margin: '12px 0',
    textAlign: 'center',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 4px 10px 2px rgb(0 0 0 / 0.18)',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      textAlign: 'center',
      height: 'initial',
      '&:nth-of-type(1)': {
        marginBottom: '12px',
      },
    },
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 12px',
    flex: 'auto',
    [theme.breakpoints.down('sm')]: {

    },
  },
  headerContainer: {
    padding: '0 5%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      textAlign: 'center',
    },
  },
  logoContainer: {
    padding: '0 12px',
    margin: '3% auto',
  },
  alanLogo: {
    height: '27vmin',
    borderRadius: '30px',
    [theme.breakpoints.down('sm')]: {
      height: '35vmin',
    },
  },
  loader: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
