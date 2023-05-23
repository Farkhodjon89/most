import { Typography } from '@mui/material';
import { styled } from '@mui/system';

import {
  mainBlue400,
  mainBlue900,
  mainGreen400,
  mainGreen900,
  mainRed400,
  mainRed900,
  monoBgGrey,
  monoDarkGrey,
  monoGrey,
} from '../../../../../styles/colorPalette';

const StatusLabel = styled(Typography)(({ theme }) => ({
  ['&.status']: {
    width: 'fit-content',
    fontSize: '12px',
    fontWeight: 600,
    // lineHeight: '14px',
    borderRadius: '20px',
    padding: '3px 7px',
  },
  [`&.status-Archive`]: {
    color: monoGrey,
    backgroundColor: monoBgGrey,
  },
  [`&.status-InModeration`]: {
    color: mainBlue900,
    backgroundColor: mainBlue400,
  },
  [`&.status-OnSale`]: {
    color: mainGreen900,
    backgroundColor: mainGreen400,
  },
  [`&.status-ReadyForSale`]: {
    color: '#ffffff',
    backgroundColor: mainGreen900,
  },
  [`&.status-Refused`]: {
    color: mainRed900,
    backgroundColor: mainRed400,
  },
  [`&.status-Draft`]: {
    color: monoDarkGrey,
    backgroundColor: monoBgGrey,
  },
  [`&.status-IN_ARCHIVE`]: {
    color: monoGrey,
    backgroundColor: monoBgGrey,
  },
}));
export default StatusLabel;
