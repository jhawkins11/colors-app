import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@material-ui/core';
import { arrayMove } from 'react-sortable-hoc';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import { withStyles } from '@material-ui/styles';
import styles from './styles/NewPaletteFormStyles';
import { DRAWER_WIDTH } from './styles/constants';
import seedColors from './seedColors';

const drawerWidth = DRAWER_WIDTH;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function NewPaletteForm(props) {
  const [open, setOpen] = React.useState(false);
  const [colors, setColors] = useState(seedColors[0].colors);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const addNewColor = (newColor) => {
    setColors([...colors, newColor]);
  };

  const handleSubmit = (newPalette) => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
    newPalette.colors = colors;
    props.savePalette(newPalette);
    props.history.push('/');
  };
  const removeColor = (colorName) => {
    setColors(colors.filter((color) => color.name !== colorName));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  const clearColors = () => {
    setColors([]);
  };

  const addRandomColor = () => {
    const newPalettes =
      props.palettes.length === 0 ? seedColors : props.palettes;
    const allColors = newPalettes.map((p) => p.colors).flat();
    const filteredArr = allColors.filter((color) => !colors.includes(color));
    const randomColor =
      filteredArr[Math.floor(Math.random() * filteredArr.length)];
    setColors([...colors, randomColor]);
  };

  const paletteIsFull = colors.length >= props.maxColors;

  return (
    <Box sx={{ display: 'flex' }}>
      <PaletteFormNav
        open={open}
        palettes={props.palettes}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div className={props.classes.container}>
          <Typography
            variant="h4"
            gutterBottom
            style={{ fontSize: '1.8rem', marginBottom: '25px' }}
          >
            Design Your Palette
          </Typography>
          <div className={props.classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearColors}
              className={props.classes.button}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={addRandomColor}
              disabled={paletteIsFull}
              className={props.classes.button}
            >
              Random Color
            </Button>
          </div>

          <ColorPickerForm
            colors={colors}
            maxColors={props.maxColors}
            addNewColor={addNewColor}
          />
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          distance={20}
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </Main>
    </Box>
  );
}

NewPaletteForm.defaultProps = {
  maxColors: 20,
};

export default withStyles(styles)(NewPaletteForm);
