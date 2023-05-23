import { Divider, Grid, IconButton, MenuItem, Stack } from '@mui/material';
import useAxios from 'axios-hooks';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { useSession } from '../../../../context/UserContext';
import { monoBgGreyLight } from '../../../../styles/colorPalette';
import AuthDropdown from './components/AuthDropdown';

const Header = () => {
  const router = useRouter();
  const { logout, me } = useSession();
  const handleLogout = () => {
    logout();
  };

  const [{ data, loading, error }] = useAxios(`/companies/${me?.companies[0].id || ''}`);
  let logo = null;
  let companyName = 'Профиль';
  if (data?.data) {
    if (data.data.avatar) {
      logo = data.data.avatar.originalUrl;
    }
    companyName = data.data.name;
  }
  return (
    <div>
      <header
        style={{
          position: 'fixed',
          top: 0,
          padding: '8px 16px',
          width: '100%',
          zIndex: 1201,
          background: monoBgGreyLight,
        }}
      >
        <Grid container>
          <Grid item xs={8}>
            <Stack spacing={2} direction="row" alignItems="center">
              <NextLink href="/">
                <img src="/img/logo.svg" style={{ width: 100, cursor: 'pointer' }} alt="" />
              </NextLink>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack spacing={3} direction="row" alignItems="center" justifyContent="flex-end" sx={{ height: '100%' }}>
              <IconButton size={'large'}>
                <i className="ui_shop" style={{ fontSize: 18 }} />
              </IconButton>
              <Divider orientation={'vertical'} variant={'middle'} sx={{ borderRightWidth: 'medium', height: '50%' }} />
              <AuthDropdown
                buttonLabel={companyName}
                Icon={
                  logo ? (
                    <img src={logo} alt="" style={{ width: 24, height: 24, borderRadius: 50, objectFit: 'cover' }} />
                  ) : (
                    <i className="ui_user" style={{ fontSize: 14 }} />
                  )
                }
              >
                <MenuItem value={10} onClick={handleLogout}>
                  Выход
                </MenuItem>
              </AuthDropdown>
            </Stack>
          </Grid>
        </Grid>
      </header>
    </div>
  );
};

export default Header;
