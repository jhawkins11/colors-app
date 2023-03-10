import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import { onlyUpdateForKeys } from 'recompose';

const MiniPalette = onlyUpdateForKeys([])(function (props) {
  const {
    classes,
    paletteName,
    emoji,
    colors,
    handleClick,
    palettes,
    setPalettes,
    openDialog,
    id,
  } = props;
  const miniColorBoxes = colors.map((color) => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    />
  ));

  const openDeleteDialog = (e) => {
    e.stopPropagation();
    openDialog(props.id);
  };

  console.log(`${props.id} rendered`);
  return (
    <div className={classes.root} onClick={() => handleClick(id)}>
      <DeleteIcon
        className={classes.deleteIcon}
        style={{ transition: 'all 0.3s ease-in-out' }}
        onClick={openDeleteDialog}
      />
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName}
        <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
});

export default withStyles(styles)(MiniPalette);
