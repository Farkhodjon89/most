import { Box, Typography } from '@mui/material';
import { useFormikContext } from 'formik';

import Switch from '../../../../../../components/Switch';
import { useStyles } from '../../style';

/**
 * todo спросить у никиты как будет выглядеть вариация disabled
 * @param item
 * @param onChange
 * @param readOnlyMode
 * @constructor
 */
const BooleanAttribute = ({ item, onChange, readOnlyMode }) => {
  const { classes } = useStyles();
  const formik = useFormikContext();

  return (
    <Box display="flex" justifyContent="space-between" alignItems={'center'}>
      <Typography variant="h4" className={classes.TitleMain}>
        {item.name}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Switch
          onChange={(value) => !readOnlyMode && onChange(item, value)}
          value={formik.values.attributes.find((attr) => attr.id === item.id)?.value || false}
        />
      </Box>
    </Box>
  );
};
export default BooleanAttribute;
