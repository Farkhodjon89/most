import { Container, Grid, Menu } from '@mui/material';

import Buttons from './demo/Buttons';
import { CategoryList } from './demo/CategoryList';
import Checkboxes from './demo/Checkboxes';
import Chips from './demo/Chips';
import CodeInputGroup from './demo/CodeInputGroup';
import CollapseExample from './demo/CollapseExample';
import FileUploaderGroup from './demo/FileUploaderGroup';
import Icons from './demo/Icons';
import { Inputs } from './demo/Inputs';
import PhoneInput from './demo/PhoneInput';
import ProgressGroup from './demo/ProgressGroup';
import Radios from './demo/Radios';
import SelectsExample from './demo/SelectsExample';
import TextEditors from './demo/TextEditors';
import Title from './demo/Title';
import Typographies from './demo/Typographies';

const UIKit = () => {
  return (
    <Container>
      <br />
      <br />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Icons />
        </Grid>
        <Grid item xs={12}>
          <Typographies />
        </Grid>
        <Grid item xs={12}>
          <Title />
        </Grid>
        <Grid item xs={12}>
          <Inputs />
        </Grid>
        <Grid item xs={12}>
          <Buttons />
        </Grid>
        <Grid item xs={12}>
          <SelectsExample />
        </Grid>
        <Grid item xs={12}>
          <Radios />
        </Grid>
        <Grid item xs={12}>
          <Checkboxes />
        </Grid>
        <Grid item xs={12}>
          <Chips />
        </Grid>
        <Grid item xs={12}>
          <PhoneInput />
        </Grid>
        <Grid item xs={12}>
          <CodeInputGroup />
        </Grid>
        <Grid item xs={12}>
          <TextEditors />
        </Grid>
        <Grid item xs={12}>
          <ProgressGroup />
        </Grid>
        <Grid item xs={12}>
          <CategoryList />
        </Grid>
        <Grid item xs={12}>
          <FileUploaderGroup />
        </Grid>
        <Grid item xs={12}>
          <CollapseExample />
        </Grid>
        <Grid item xs={12}>
          <Menu />
        </Grid>
        <Grid item xs={12}>
          {/*<TableGroup />*/}
        </Grid>
      </Grid>
      <br />
      <br />
    </Container>
  );
};

export default UIKit;
