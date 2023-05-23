import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import React, { lazy, useState } from 'react';

const TextEditor = lazy(() => import(/* webpackChunkName: "TextEditorQuill" */ 'components/TextEditor'));

const TextEditors = () => {
  //======TextEditor=====//
  const [textEditor, setTextEditor] = useState({ value: '', isValid: true, message: '' });
  const handleEditorChange = ({ value, isValid, message }: any) => {
    setTextEditor({ value, isValid, message });
  };
  //======TextEditor end=====//
  return (
    <Accordion>
      <AccordionSummary expandIcon={<i className="ui_down-arrow"></i>}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">TextEditor</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container rowSpacing={2}>
          <Grid item xs={6}>
            <TextEditor
              value={textEditor.value}
              isValid={textEditor.isValid}
              helperText={textEditor.message}
              name={'desc'}
              onChange={handleEditorChange}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default TextEditors;
