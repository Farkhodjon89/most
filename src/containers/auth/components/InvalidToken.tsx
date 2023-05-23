import { Box, Stack, Typography } from '@mui/material';
import NextLink from 'next/link';
import React, { FC } from 'react';

import { Button } from '../../../components/Button';
import { monoBgGreyLight } from '../../../styles/colorPalette';
import MainLayout from '../../layouts/main';
import Wrapper from './index';

const InvalidToken: FC<any> = ({ desc, buttonLabel = 'К регистрации', link = '/auth/register' }) => {
  return (
    <MainLayout>
      <Wrapper>
        <Box
          sx={{
            backgroundColor: monoBgGreyLight,
            borderRadius: (theme) => theme.spacing(2),
            padding: (theme) => theme.spacing(6),
          }}
        >
          <Stack spacing={3} justifyContent={'center'} alignItems={'center'}>
            <img src="/img/logo_only_cracked.svg" alt="" style={{ width: 100 }} />
            <Typography component="h3" sx={{ fontWeight: 700, fontSize: 20 }}>
              Что-то пошло не так
            </Typography>
            <Typography sx={{ textAlign: 'center', fontWeight: 400 }}>{desc}</Typography>
            <NextLink href={link}>
              <Button>{buttonLabel}</Button>
            </NextLink>
          </Stack>
        </Box>
      </Wrapper>
    </MainLayout>
  );
};

export default InvalidToken;
