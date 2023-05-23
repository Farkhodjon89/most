import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import cx from 'classnames';
import { makeStyles } from 'tss-react/mui';

import { black, monoDarkBlack } from '../../../../styles/colorPalette';
import FilterBoolean from './FilterBoolean';
import InputAttribute from './InputAttribute';
import ListAttribute from './ListAttribute';
import ListMultipleAttibute from './ListMultipleAttibute';

export const useStyles = makeStyles()((theme) => ({
  root: {
    'outline': 'none',
    'border': 'none',
    'boxShadow': 'none',
    'marginBottom': theme.spacing(1),
    '& .MuiAccordion-root:before': {
      border: 0,
    },
    '& .MuiAccordionSummary-root': {
      minHeight: 'auto',
      paddingLeft: 0,
      // marginLeft: theme.spacing(-2),
    },
    '& .MuiAccordionSummary-content': {
      margin: theme.spacing(0.75, 0),
    },
    '& .MuiAccordionDetails-root': {
      flexDirection: 'column',
      display: 'flex',
      paddingTop: 0,
      paddingLeft: 0,
    },
    '& .MuiFormControlLabel-label': {
      color: black,
      fontSize: theme.typography.pxToRem(12),
      lineHeight: '14px',
    },
    '&:before': {
      display: 'none',
    },
  },
  downArrowIcon: {
    color: monoDarkBlack,
    fontSize: theme.typography.pxToRem(10),
    fontWeight: 700,
  },
  typography: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 700,
    lineHeight: '20px',
    color: black,
  },
}));

const FilterAttributes = ({ attributes, queryParams, onFilterChange }) => {
  const { classes } = useStyles();
  return (
    <Box>
      {attributes.map((attribute, key) => {
        if (attribute.typeLabel === 'INTEGER' || attribute.typeLabel === 'FLOAT' || attribute.typeLabel === 'STRING') {
          return (
            <InputAttribute
              key={key}
              attribute={attribute}
              queryParams={queryParams}
              onAttributeChange={onFilterChange}
            />
          );
        }
        // || attribute.typeLabel === 'BOOLEAN'
        if (attribute.typeLabel === 'BOOLEAN') {
          return (
            <FilterBoolean
              key={key}
              attribute={attribute}
              queryParams={queryParams}
              onAttributeChange={onFilterChange}
            />
          );
        }
        if (attribute.typeLabel === 'LIST') {
          return (
            <ListAttribute
              key={key}
              attribute={attribute}
              queryParams={queryParams}
              onAttributeChange={onFilterChange}
            />
          );
        }

        if (attribute.typeLabel === 'LIST_MULTIPLE') {
          return (
            <ListMultipleAttibute
              key={key}
              attribute={attribute}
              queryParams={queryParams}
              onAttributeChange={onFilterChange}
            />
          );
        }
        return (
          <Accordion disableGutters elevation={0} square className={classes.root} key={key}>
            <AccordionSummary expandIcon={<i className={cx('ui_down-arrow', classes.downArrowIcon)}></i>}>
              <Typography className={classes.typography}>{attribute.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.typography}>{attribute.name}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default FilterAttributes;
