import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from '@mui/material';

import Chip from '../../../components/Chip';
import { mainBlue900 } from '../../../styles/colorPalette';

const Chips = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<i className="ui_down-arrow"></i>}>
        <Grid item xs={12}>
          <Typography variant="h5">Chips</Typography>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container rowSpacing={2}>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0,
              }}
              component={'ul'}
            >
              <Chip label="Сбросить фильтры" onDelete={() => console.log('remove action')} customColor={mainBlue900} />
              <Chip label="Квант поставки: Шт" />
              <Chip label="Квант поставки: Шт" />
              <Chip label="Квант поставки: Шт" />
              <Chip label="Квант поставки: Шт" />
              <Chip label="Размер компании: Малый" />
              <Chip label="Размер компании: Малый" onDelete={() => console.log('remove action')} />
              <Chip label="Рейтинг надежности: Средний, Высокий" onDelete={() => console.log('remove action')} />
              <Chip label="Регион отгрузки: Москва, Московская область" onDelete={() => console.log('remove action')} />
              <Chip label="Сроки доставки: От 4 до 10 дней" onDelete={() => console.log('remove action')} />
            </Box>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default Chips;
