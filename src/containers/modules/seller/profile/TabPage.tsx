import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

type TabPanelProps = {
  children?: ReactNode;
  index: number;
  value: number;
};

const TabPage: FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export default TabPage;
