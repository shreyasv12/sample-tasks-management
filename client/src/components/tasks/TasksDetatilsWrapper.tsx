/** @format */

import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MuiDrawer from '@mui/material/Drawer';
import { styled, Theme, CSSObject } from '@mui/material/styles';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const drawerWidth = 320;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
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

interface InformationLayoutDrawerProps {
  isLowerScreenWidth: boolean;

  children: JSX.Element;
}

export const InformationLayoutDrawerContainer: React.FunctionComponent<InformationLayoutDrawerProps> = (props) => {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  if (props.isLowerScreenWidth) {
    return (
      <Drawer anchor='right' variant='permanent' open={openDrawer}>
        <DrawerHeader />
        <Grid onMouseEnter={() => setOpenDrawer(true)} onMouseLeave={() => setOpenDrawer(false)} item xs={12} sx={{ mt: '18px', minWidth: drawerWidth, p: 2 }}>
          {props.children}
        </Grid>
      </Drawer>
    );
  }

  return (
    <Grid item xs={12} sm={4} lg={4}>
      {props.children}
    </Grid>
  );
};

interface ActionLayoutContainerProps {
  isLowerScreenWidth: boolean;
  children: JSX.Element;
}

export const ActionLayoutContainer: React.FunctionComponent<ActionLayoutContainerProps> = (props) => {
  if (props.isLowerScreenWidth) {
    return (
      <Box component='main' sx={(theme) => ({ flexGrow: 1, p: 1 })}>
        {props.children}
      </Box>
    );
  }
  return (
    <Grid item xs={12} sm={7} lg={7} sx={(theme) => ({ flexDirection: 'column', [theme.breakpoints.up('sm')]: { borderRight: '1px solid #9BB4CC' } })}>
      {props.children}
    </Grid>
  );
};
