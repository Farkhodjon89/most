import { Radio as DefaultRadio, RadioProps } from '@mui/material';
import { FC } from 'react';

import RadioIcon from './icons/RadioIcon';
import RadioIconActive from './icons/RadioIconActive';

const Radio: FC<RadioProps> = (props) => {
  return <DefaultRadio disableRipple icon={<RadioIcon />} checkedIcon={<RadioIconActive />} {...props} />;
};

export default Radio;
