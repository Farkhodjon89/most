import { Grid } from '@mui/material';
import { Stack } from '@mui/system';
import React, { FC } from 'react';

import { useSession } from '../../../../../../context/UserContext';
import { prepareDocumentList } from '../../utils';
import DocumentItem from './DocumentItem';

const Documents: FC<any> = ({ formik, readOnly }) => {
  const { me } = useSession();
  const companyType = me?.companies[0].companyType;
  const documentList = prepareDocumentList(companyType);
  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={12}>
        <Grid container rowSpacing={6.6}>
          <Grid item xs={12}>
            <Stack spacing={3}>
              {documentList.map((item, key) => (
                <DocumentItem
                  key={key}
                  title={item.title}
                  documents={formik.values.documents.filter((doc) => doc.name === item.type).map((doc) => doc.file)}
                  type={item.type}
                  formik={formik}
                  readOnly={readOnly}
                />
              ))}
            </Stack>
          </Grid>
          {/*<Grid item xs={12}>*/}
          {/*  <Grid container columnSpacing={1} alignItems="center">*/}
          {/*    <Grid item>*/}
          {/*      <Button>Отправить на проверку</Button>*/}
          {/*    </Grid>*/}
          {/*    <Grid item>*/}
          {/*      <SmallGrayDescr>Проверка документов занимает до 2 суток</SmallGrayDescr>*/}
          {/*    </Grid>*/}
          {/*  </Grid>*/}
          {/*</Grid>*/}
        </Grid>
      </Grid>
      <Grid item xs />
    </Grid>
  );
};

export default Documents;
