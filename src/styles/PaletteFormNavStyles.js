import sizes from './sizes';

export default {
  root: {
    display: 'flex',
  },
  navBtns: {
    marginRight: '1rem',
    [sizes.down('xs')]: {
      marginRight: '0.5rem',
    },
  },
  button: {
    margin: '0 0.5rem',
    [sizes.down('xs')]: {
      margin: '0.2rem',
      padding: '0.3rem',
    },
  },
};
