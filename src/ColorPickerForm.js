import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/styles';
import styles from './styles/ColorPickerFormStyles';

function ColorPickerForm(props) {
  const [colorName, setColorName] = useState('');
  const [currentColor, setCurrentColor] = useState('teal');
  const paletteIsFull = props.colors.length >= props.maxColors;

  const handleChange = (e) => {
    setColorName(e.target.value);
  };

  const handleSubmit = () => {
    const newColor = { color: currentColor, name: colorName };
    props.addNewColor(newColor);
    setColorName('');
  };

  const updateCurrentColor = (newColor) => {
    setCurrentColor(newColor.hex);
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
      return props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorUnique', () => {
      return props.colors.every(({ color }) => color !== currentColor);
    });
  });

  return (
    <div className={props.classes.root}>
      <ChromePicker
        color={currentColor}
        onChange={updateCurrentColor}
        className={props.classes.picker}
        width="100%"
      />
      <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
        <TextValidator
          value={colorName}
          placeholder="Color Name"
          className={props.classes.colorNameInput}
          name="colorName"
          variant="filled"
          margin="normal"
          onChange={handleChange}
          validators={['required', 'isColorNameUnique', 'isColorUnique']}
          errorMessages={[
            'Enter a color name',
            'Color name needs to be unique',
            'Color must be unique',
          ]}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ background: paletteIsFull ? 'grey' : currentColor }}
          type="submit"
          disabled={paletteIsFull}
          className={props.classes.addColor}
        >
          {paletteIsFull ? 'Palette Full' : 'Add Color'}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default withStyles(styles)(ColorPickerForm);
