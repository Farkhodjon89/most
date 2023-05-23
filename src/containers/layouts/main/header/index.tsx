import { Badge, Box, Grid, MenuItem, Stack, Typography } from '@mui/material';
import useAxios from 'axios-hooks';
import cx from 'classnames';
import NextLink from 'next/link';
import { axiosClient } from 'pages/_app';
import { useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import DefaultImage from '../../../../components/icons/DefaultImage';
import { useSession } from '../../../../context/UserContext';
import { monoDarkBlack, monoGrey, monoWhite } from '../../../../styles/colorPalette';
import AuthDropdown from './components/AuthDropdown';
import Catalog from './components/Catalog';
import SearchInput from './components/SearchInput';

const useStyles = makeStyles()((theme) => ({
  messageCircle: {
    color: monoDarkBlack,
    fontSize: theme.typography.pxToRem(18),
  },
  bagIcon: {
    color: monoDarkBlack,
    fontSize: theme.typography.pxToRem(18),
  },
  icon: {
    fontSize: theme.typography.pxToRem(18),
    color: monoGrey,
  },
}));

const Header = () => {
  const { logout, me } = useSession();
  const { classes } = useStyles();
  const handleLogout = () => {
    logout();
  };

  const items = [
    {
      id: 0,
      name: 'Сделки',
      link: '/seller/deals',
      icon: <i className={cx('ui_deal', classes.icon)}></i>,
    },
    {
      id: 1,
      name: 'Чаты',
      link: '/',
      icon: <i className={cx('ui_message-circle', classes.icon)}></i>,
    },
    {
      id: 2,
      name: 'Товары',
      link: '/seller/products',
      icon: <i className={cx('ui_cube', classes.icon)}></i>,
    },
    {
      id: 3,
      name: 'Профиль компании',
      link: '/seller/profile',
      icon: <i className={cx('ui_shop', classes.icon)}></i>,
    },
    {
      id: 4,
      name: 'Мои данные',
      link: '/seller/profile/user',
      icon: <i className={cx('ui_user', classes.icon)}></i>,
    },
    {
      id: 5,
      name: 'Выйти',
      icon: <i className={cx('ui_login', classes.icon)}></i>,
      onClick: handleLogout,
    },
  ];
  const [data, setData] = useState<any>(null);
  // const [{ data, loading, error }] = useAxios(`/companies/${me?.companies[0].id}`);

  useEffect(() => {
    if (me?.companies[0].id)
      axiosClient.get(`/companies/${me?.companies[0].id}`).then(({ data }) => {
        setData(data);
      });
  }, []);

  let logo = null;
  let companyName = 'Профиль';
  if (data?.data) {
    if (data.data.avatar) {
      logo = data.data.avatar.originalUrl;
    }
    companyName = data.data.name;
  }

  return (
    <>
      {/*<nav style={{ padding: '4px 64px 0px 64px', background: 'white' }}>*/}
      {/*  <Grid container>*/}
      {/*    <Grid item xs={4}>*/}
      {/*      <Stack direction="row" spacing={2}>*/}
      {/*        <LocationSelector />*/}
      {/*        <CurrencySelector />*/}
      {/*      </Stack>*/}
      {/*    </Grid>*/}
      {/*    <Grid item xs={8}>*/}
      {/*      <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>*/}
      {/*        <AuthDropdown*/}
      {/*          buttonLabel={me ? companyName : 'Войти'}*/}
      {/*          Icon={*/}
      {/*            logo ? (*/}
      {/*              <img src={logo} alt="" style={{ width: 24, height: 24, borderRadius: 50, objectFit: 'cover' }} />*/}
      {/*            ) : (*/}
      {/*              <i className="ui_user" style={{ fontSize: 14 }} />*/}
      {/*            )*/}
      {/*          }*/}
      {/*        >*/}
      {/*          {me ? (*/}
      {/*            <>*/}
      {/*              <NextLink href={'/seller/profile'}>*/}
      {/*                <MenuItem value={10}>Профиль компании</MenuItem>*/}
      {/*              </NextLink>*/}
      {/*              /!*<MenuItem value={10} onClick={handleLogout}>*!/*/}
      {/*              /!*  Выход*!/*/}
      {/*              /!*</MenuItem>*!/*/}
      {/*            </>*/}
      {/*          ) : (*/}
      {/*            <>*/}
      {/*              <NextLink href={'/auth/login'}>*/}
      {/*                <MenuItem value={10}>Войти</MenuItem>*/}
      {/*              </NextLink>*/}
      {/*              <NextLink href={'/auth/register'}>*/}
      {/*                <MenuItem value={20}>Регистрация</MenuItem>*/}
      {/*              </NextLink>*/}
      {/*            </>*/}
      {/*          )}*/}
      {/*        </AuthDropdown>*/}
      {/*      </Stack>*/}
      {/*    </Grid>*/}
      {/*  </Grid>*/}
      {/*</nav>*/}
      <header
        style={{
          position: 'sticky',
          top: 0,
          padding: '12px 64px',
          background: monoWhite,
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.08)',
          // borderBottom: `1px solid ${monoLightGrey2}`,
          zIndex: 10,
        }}
        className={classes.root}
      >
        <Grid container>
          <Grid item xs={8}>
            <Stack spacing={2} direction="row" alignItems="center">
              <NextLink href={'/'}>
                <a>
                  <img src="/img/logo.svg" style={{ width: 100 }} alt="" />
                </a>
              </NextLink>
              <Catalog />
              <SearchInput />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Box display={'flex'} justifyContent={'flex-end'}>
              <Stack spacing={5} direction="row" alignItems="center" justifyContent="flex-end" sx={{ height: '100%' }}>
                <NextLink href="/seller/deals">
                  <a>
                    <Stack spacing={0.5} display={'flex'} alignItems={'center'}>
                      <Typography>
                        <Badge
                          badgeContent={0}
                          color="primary"
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                        >
                          <i className={cx('ui_deal', classes.bagIcon)} />
                        </Badge>
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: monoDarkBlack }}>Сделки</Typography>
                    </Stack>
                  </a>
                </NextLink>
                <a href="#">
                  <Stack spacing={0.5} display={'flex'} alignItems={'center'}>
                    <Typography>
                      <Badge
                        badgeContent={0}
                        color="primary"
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                      >
                        <i className={cx('ui_message-circle', classes.messageCircle)} />
                      </Badge>
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: monoDarkBlack }}>Чаты</Typography>
                  </Stack>
                </a>
                <NextLink href="/checkout">
                  <a>
                    <Stack spacing={0.5} display={'flex'} alignItems={'center'}>
                      <Typography>
                        <Badge
                          badgeContent={0}
                          color="primary"
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                        >
                          <i className={cx('ui_bag', classes.bagIcon)} />
                        </Badge>
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: monoDarkBlack }}>Закупки</Typography>
                    </Stack>
                  </a>
                </NextLink>
              </Stack>
              <Box sx={{ marginTop: -0.5, marginLeft: 2 }}>
                <AuthDropdown
                  buttonLabel={me ? /*companyName*/ '' : 'Войти'}
                  me={me}
                  Icon={
                    me && logo ? (
                      <img src={logo} alt="" style={{ width: 40, height: 40, borderRadius: 50, objectFit: 'cover' }} />
                    ) : (
                      me && (
                        // <i className="ui_user" style={{ fontSize: 14 }} />
                        <DefaultImage />
                      )
                    )
                  }
                >
                  {me ? (
                    <>
                      {items.map(({ id, name, link, icon, onClick }) => {
                        if (onClick) {
                          return (
                            <MenuItem key={id} onClick={onClick} sx={{ marginBottom: '10px' }} value={10}>
                              {icon}
                              <Typography
                                ml={1}
                                sx={{
                                  fontSize: 14,
                                  fontWeight: 600,
                                  lineHeight: '14px',
                                  color: monoDarkBlack,
                                }}
                              >
                                {name}
                              </Typography>
                            </MenuItem>
                          );
                        }
                        return (
                          <NextLink key={id} href={link || '#'}>
                            <a>
                              <MenuItem sx={{ marginBottom: '10px' }} value={10}>
                                {icon}
                                <Typography
                                  ml={1}
                                  sx={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    lineHeight: '14px',
                                    color: monoDarkBlack,
                                  }}
                                >
                                  {name}
                                </Typography>
                              </MenuItem>
                            </a>
                          </NextLink>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <NextLink href={'/auth/login'}>
                        <MenuItem value={10}>Войти</MenuItem>
                      </NextLink>
                      <NextLink href={'/auth/register'}>
                        <MenuItem value={20}>Регистрация</MenuItem>
                      </NextLink>
                    </>
                  )}
                </AuthDropdown>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </header>
    </>
  );
};

export default Header;
