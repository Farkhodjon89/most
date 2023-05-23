import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import React from 'react';

import FileUploader from '../../../components/FileUploader';

const FileUploaderGroup = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<i className="ui_down-arrow"></i>}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">File Uploader</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container rowSpacing={2} spacing={2}>
          <FileUploader title="Фото товара" addMoreButtonLabel="Добавить ещё фото" onStarred={() => null} />
          <br />
          <br />
          <FileUploader
            title="Сертификаты"
            addMoreButtonLabel="Добавить ещё сертификаты"
            imgItemDimensions={[48, 48]}
            actionsDimensions={[-8, -8]}
          />
          <br />
          <br />
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default FileUploaderGroup;
