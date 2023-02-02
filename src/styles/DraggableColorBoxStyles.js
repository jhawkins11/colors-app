import sizes from './sizes';
import chroma from 'chroma-js';

export default {
  root: {
    width: '20%',
    height: '25%',
    margin: '0',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-0.44rem',
    '&:hover $deleteIcon': {
      color: 'white',
      transform: 'scale(1.5)',
    },
    [sizes.down('lg')]: {
      width: '25%',
      height: '20%',
    },
    [sizes.down('md')]: {
      width: '50%',
      height: '10%',
    },
    [sizes.down('sm')]: {
      width: '100%',
      height: '5%',
    },
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    bottom: '0',
    left: '0',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    color: (props) =>
      chroma(props.color).luminance() >= 0.7
        ? 'rgba(0,0,0,0.6)'
        : 'rgba(255,255,255,0.8)',
    '& span': {
      padding: '10px',
    },
    '& svg': {
      padding: '10px',
    },
  },
  deleteIcon: {
    transition: 'all 0.3s ease-in-out',
  },
};
