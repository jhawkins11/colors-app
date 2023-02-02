import React, { useState } from 'react';
import { useEffect } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function PaletteMetaForm(props) {
  const [stage, setStage] = useState('');
  const [newPaletteName, setNewPaletteName] = React.useState('');

  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  const handleChange = (e) => {
    setNewPaletteName(e.target.value);
  };

  const showEmojiPicker = () => {
    setStage('emoji');
  };

  const savePalette = (emoji) => {
    props.handleSubmit({ paletteName: newPaletteName, emoji: emoji.native });
    setStage('');
  };

  useEffect(() => {
    setStage(props.formShowing ? 'form' : '');
  }, [props.formShowing]);

  return (
    <div>
      <Dialog open={stage === 'emoji'} onClose={props.hideForm}>
        <DialogTitle>Choose a Palette Emoji</DialogTitle>
        <Picker onSelect={savePalette} title="Pick a Palette Emoji" />
      </Dialog>
      <Dialog open={stage === 'form'} onClose={props.hideForm}>
        <DialogTitle>Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new palette. Make sure it's unique.
            </DialogContentText>

            <TextValidator
              label="Palette Name"
              value={newPaletteName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              name="newPaletteName"
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={['Enter a palette name.', 'Name already used.']}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.hideForm}>Cancel</Button>
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}
