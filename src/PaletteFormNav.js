import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteFormNavStyles';
import PaletteMetaForm from './PaletteMetaForm';
import { DRAWER_WIDTH } from './styles/constants';

const drawerWidth = DRAWER_WIDTH;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '64px',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = { newPaletteName: '', formShowing: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleClick() {
    this.setState({ formShowing: true });
  }

  hideForm() {
    this.setState({ formShowing: false });
  }

  render() {
    const { classes, open, palettes, handleSubmit, handleDrawerOpen } =
      this.props;
    const { formShowing } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" open={open} color="default">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Create a Palette
            </Typography>
          </Toolbar>
          <div className={classes.navBtns}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Go Back
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClick}
              className={classes.button}
            >
              Save
            </Button>
          </div>
        </AppBar>
        <PaletteMetaForm
          palettes={palettes}
          handleSubmit={handleSubmit}
          formShowing={formShowing}
          hideForm={this.hideForm}
        />
      </div>
    );
  }
}

export default withStyles(styles)(PaletteFormNav);
