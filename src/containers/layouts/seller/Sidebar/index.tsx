import {
  Divider,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { CSSObject, styled, Theme } from '@mui/material/styles';
import { useSession } from 'context/UserContext';
import NextLink from 'next/link';

import { monoBgGreyLight, monoDarkBlack, monoDarkGrey, monoLightGrey1 } from '../../../../styles/colorPalette';
import SidebarTooltip from './SidebarTooltip';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  'background': monoBgGreyLight,
  'width': drawerWidth,
  'transition': theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  'overflowX': 'hidden',
  'borderRight': 'none',
  'paddingTop': 70,
  '&::-webkit-scrollbar': {
    width: 4,
  },
  '&::-webkit-scrollbar-track': {
    background: monoLightGrey1,
    borderRadius: 10,
  },
  '&::-webkit-scrollbar-thumb': {
    background: monoDarkGrey,
    borderRadius: 10,
  },
});

const closedMixin = (theme: Theme): CSSObject => ({
  'background': monoBgGreyLight,
  'transition': theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  'overflowX': 'hidden',
  'width': `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  'borderRight': 'none',
  'paddingTop': 70,
  '&::-webkit-scrollbar': {
    width: 4,
  },
  '&::-webkit-scrollbar-track': {
    background: monoLightGrey1,
    borderRadius: 10,
  },
  '&::-webkit-scrollbar-thumb': {
    background: monoDarkGrey,
    borderRadius: 10,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const DividerContainer = styled('div')`
  padding-left: 12px;
  padding-right: 16px;
  padding-top: 15px;
  padding-bottom: 15px;
`;

type ItemType = {
  id?: number | string;
  label?: string;
  link?: string;
  icon?: () => React.ReactElement;
  items?: Array<{ link?: string; label: string }>;
  divider?: boolean;
  onClick?: () => void;
};

const Item = ({ data }: { data: ItemType }) => {
  const button = (
    <ListItemButton
      sx={{
        minHeight: 48,
        justifyContent: 'center',
        px: 2.5,
      }}
      onClick={data.onClick}
      aria-owns="mouse-over-popover"
      aria-haspopup="true"
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: 'auto',
          justifyContent: 'center',
        }}
      >
        {!!data.icon && <data.icon />}
      </ListItemIcon>
      <ListItemText primary={data.label} sx={{ opacity: 0 }} />
    </ListItemButton>
  );

  if (data.onClick) {
    return button;
  }

  return (
    <SidebarTooltip placement="right" title={<span>{data.label}</span>}>
      <div>
        <NextLink href={data.link || '#'}>{button}</NextLink>
      </div>
    </SidebarTooltip>
  );
};

const Sidebar = () => {
  const { logout } = useSession();

  const menuList: ItemType[] = [
    {
      icon: () => <i className="ui_deal" style={{ fontSize: 20, color: monoDarkBlack }}></i>,
      label: 'Сделки',
      link: '/seller/deals',
    },
    {
      label: 'Сообщения',
      // link: '/messages',
      icon: () => <i className="ui_message-circle" style={{ fontSize: 20, color: monoDarkBlack }}></i>,
      items: [],
    },
    {
      label: 'Товары',
      link: '/seller/products',
      icon: () => <i className="ui_cube" style={{ fontSize: 20, color: monoDarkBlack }}></i>,
    },
    {
      icon: () => <i className="ui_shop" style={{ fontSize: 20, color: monoDarkBlack }}></i>,
      label: 'Профиль компании',
      link: '/seller/profile',
    },
    {
      icon: () => <i className="ui_user" style={{ fontSize: 20, color: monoDarkBlack }}></i>,
      label: 'Профиль пользователя',
      link: '/seller/profile/user',
    },
    {
      divider: true,
    },
    {
      icon: () => <i className="ui_login" style={{ fontSize: 20, color: monoDarkBlack }}></i>,
      label: 'Выход',
      onClick: logout,
    },
  ];

  return (
    <Drawer variant="permanent" open={false}>
      <List>
        {menuList.map((item, index) => {
          return (
            <ListItem key={index} disablePadding sx={{ display: 'block', color: monoDarkBlack }}>
              {item.divider ? (
                <DividerContainer>
                  <Divider />
                </DividerContainer>
              ) : (
                <Item data={item} />
              )}
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
