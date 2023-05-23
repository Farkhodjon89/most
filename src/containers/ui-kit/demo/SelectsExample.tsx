import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import { useState } from 'react';

import Select from '../../../components/Select';

const SelectsExample = () => {
  const [selected, setSelected] = useState('');
  //======Select end=====//
  return (
    <Accordion>
      <AccordionSummary expandIcon={<i className="ui_down-arrow"></i>}>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Selects</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={4}>
            {/*@ts-ignore*/}
            <Select
              label={'Цифра'}
              value={selected}
              onChange={(e) => setSelected(e.target.value as string)}
              options={[
                { value: 1, label: 'One' },
                { value: 2, label: 'Two' },
                { value: 3, label: 'Three' },
              ]}
            />
          </Grid>

          <Grid item xs={4}>
            {/*@ts-ignore*/}
            <Select
              label={'Цифра'}
              size={'small'}
              value={selected}
              onChange={(e) => setSelected(e.target.value as string)}
              options={[
                { value: 1, label: 'One' },
                { value: 2, label: 'Two' },
                { value: 3, label: 'Three' },
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            {/*@ts-ignore*/}
            <Select
              label={'Цифра'}
              size={'extraSmall'}
              value={selected}
              onChange={(e) => setSelected(e.target.value as string)}
              options={[
                { value: 1, label: 'One' },
                { value: 2, label: 'Two' },
                { value: 3, label: 'Three' },
              ]}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default SelectsExample;
