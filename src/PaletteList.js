import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/PaletteListStyles';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import MiniPalette from './MiniPalette';

import { withStyles } from '@material-ui/styles';
import { Fab, ListItemAvatar, ListItemText } from '@material-ui/core';
import BrushIcon from '@mui/icons-material/Brush';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      deletingId: '',
    };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
    this.goToPalette = this.goToPalette.bind(this);
  }
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  openDialog(id) {
    this.setState({ openDeleteDialog: true, deletingId: id });
  }
  closeDialog() {
    this.setState({ openDeleteDialog: false });
  }
  deletePalette() {
    const newPalettes = this.props.palettes.filter((p) => {
      return p.id.toLowerCase() !== this.state.deletingId.toLowerCase();
    });
    this.props.setPalettes(newPalettes);
    this.closeDialog();
  }

  render() {
    const { palettes, classes, setPalettes } = this.props;
    const { openDeleteDialog } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
            <Fab>
              <Link to="/palette/new">
                <BrushIcon style={{ color: 'black' }} fontSize="large" />
              </Link>
            </Fab>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map((palette) => (
              <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                <MiniPalette
                  {...palette}
                  palettes={palettes}
                  openDialog={this.openDialog}
                  key={palette.paletteName}
                  setPalettes={setPalettes}
                  handleClick={this.goToPalette}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={openDeleteDialog}
          aria-labelledby="delete-dialog-title"
          onClose={this.closeDialog}
        >
          <DialogTitle id="delete-dialog-title">
            Delete this palette?
          </DialogTitle>
          <List>
            <ListItem onClick={this.deletePalette} button>
              <ListItemAvatar>
                <Avatar style={{ background: blue[100], color: blue[600] }}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Delete</ListItemText>
            </ListItem>
            <ListItem onClick={this.closeDialog} button>
              <ListItemAvatar>
                <Avatar style={{ background: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Cancel</ListItemText>
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
