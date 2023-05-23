import { Tab, Tabs } from '@mui/material';
import React, { FC } from 'react';
import { mainBlue900, monoBlack } from 'styles/colorPalette';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  tabs: {
    'minHeight': 'unset',
    '& .MuiTab-root.Mui-selected': {
      color: mainBlue900,
    },
    '& .MuiTab-root': {
      'color': monoBlack,
      'fontSize': theme.typography.pxToRem(14),
      'textTransform': 'none',
      'padding': '8px 0px',
      'minHeight': 'unset',
      '&:not(:last-child)': {
        marginRight: theme.spacing(2),
      },
    },
    '& .MuiTabs-indicator': {
      height: 1,
      backgroundColor: mainBlue900,
    },
  },
}));

function a11yProps(index: number) {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabsHeader: FC<{ value: number; onChange: (event: React.SyntheticEvent, newValue: number) => void }> = ({
  value,
  onChange,
  tabs,
}) => {
  const { classes } = useStyles();
  return (
    <Tabs value={value} onChange={onChange} className={classes.tabs}>
      {tabs.map(({ label, index }) => (
        <Tab label={label} {...a11yProps(index)} />
      ))}
    </Tabs>
  );
};

export default TabsHeader;
