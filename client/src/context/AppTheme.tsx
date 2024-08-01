/** @format */

import { createTheme } from '@mui/material';

export const MuiOutlinedInputStyleOverridesRoots = {
  background: '#FFFFFF',
  border: '1px solid #667185',
  borderRadius: '5px',
  fontFamily: '"Lato", sans-serif',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.01em',
  color: '#33425B',
  outline: 'none',
  '&:focus': {
    border: '1.5px solid #33425B',
  },
  '&:active': {
    border: '1.5px solid #33425B',
  },
  '&:hover': {
    border: '1.5px solid #33425B',
  },
  '&.Mui-focused': {
    border: '1.5px solid #33425B',
  },
  '&.Mui-disabled': {
    background: '#F4F4F4',
  },
};

declare module '@mui/material/InputBase' {
  interface InputBaseComponentsPropsOverrides {
    variant?: any;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    fontBold38: true;
    fontBold28: true;
    fontBold20: true;
    fontBold18: true;
    fontBold16: true;
    fontBold14: true;

    fontSemiBold18: true;
    fontSemiBold16: true;
    fontSemiBold14: true;
    fontSemiBold12: true;

    fontMed20: true;

    fontReg24: true;
    fontReg20: true;
    fontReg18: true;
    fontReg16: true;
    fontReg14: true;
    fontReg12: true;
    fontReg10: true;
  }
}

declare module '@mui/material/styles' {
  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    fontBold38?: React.CSSProperties;
    fontBold28?: React.CSSProperties;
    fontBold20?: React.CSSProperties;
    fontBold18?: React.CSSProperties;
    fontBold16?: React.CSSProperties;
    fontBold14?: React.CSSProperties;

    fontSemiBold18?: React.CSSProperties;
    fontSemiBold16?: React.CSSProperties;
    fontSemiBold14?: React.CSSProperties;
    fontSemiBold12?: React.CSSProperties;

    fontMed20?: React.CSSProperties;

    fontReg24?: React.CSSProperties;
    fontReg20?: React.CSSProperties;
    fontReg18?: React.CSSProperties;
    fontReg16?: React.CSSProperties;
    fontReg14?: React.CSSProperties;
    fontReg12?: React.CSSProperties;
    fontReg10?: React.CSSProperties;
  }

  interface Palette {
    customColor: {
      primary: string;
      secondary: string;
      text: string;
      menuBar: string;
      card: string;
      table: string;
      netural: string;
      danger: string;
      warning: string;
      success: string;
      stroke: string;
      pageTitle: string;
      primaryLight: string;
      secondaryTab: string;
      tabBgColor: string;
      chipBgColor: string;
      initiateColor: string;
    };
  }

  interface PaletteOptions {
    customColor: {
      primary: string;
      secondary: string;
      text: string;
      menuBar: string;
      card: string;
      table: string;
      netural: string;
      danger: string;
      warning: string;
      success: string;
      stroke: string;
      pageTitle: string;
      primaryLight: string;
      secondaryTab: string;
      tabBgColor: string;
      chipBgColor: string;
      initiateColor: string;
    };
  }
}

export const appTheme = createTheme({
  typography: {
    fontBold38: {
      fontFamily: '"Lato", sans-serif',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: '2.688rem',
      letterSpacing: '0.008em',
    },
    fontBold28: {
      fontFamily: '"Lato", sans-serif',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: '1.063rem',
      letterSpacing: '0.008em',
    },
    fontBold20: {
      fontFamily: '"Lato", sans-serif',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '1.25rem',
      lineHeight: '1.5rem',
      letterSpacing: '0.008em',
    },
    fontBold18: {
      fontFamily: '"Lato", sans-serif',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '1.125rem',
      lineHeight: '1.375rem',
      letterSpacing: '0.01em',
    },
    fontBold16: {
      fontFamily: '"Lato", sans-serif',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '1rem',
      lineHeight: '1.188rem',
      letterSpacing: '0.01em',
    },
    fontBold14: {
      fontFamily: '"Lato", sans-serif',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '0.875rem',
      lineHeight: '1.188rem',
      letterSpacing: '0.01em',
    },
    fontSemiBold18: {
      fontFamily: '"Lato", sans-serif',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: '1.375rem',
      letterSpacing: '0.01em',
    },
    fontSemiBold16: {
      fontFamily: '"Lato", sans-serif',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: '1.188rem',
      letterSpacing: '0.01em',
    },
    fontSemiBold14: {
      fontFamily: '"Lato", sans-serif',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: '1.063rem',
      letterSpacing: '0.01em',
    },
    fontSemiBold12: {
      fontFamily: '"Lato", sans-serif',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '0.75rem',
      lineHeight: '0.875rem',
      letterSpacing: '0.01em',
    },
    fontMed20: {
      fontFamily: '"Lato", sans-serif',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: '1.5rem',
      letterSpacing: '0.01em',
    },
    fontReg24: {
      fontFamily: '"Lato", sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '1.5rem',
      lineHeight: '1.813rem',
      letterSpacing: '0.01em',
    },
    fontReg20: {
      fontFamily: '"Lato", sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '1.25rem',
      lineHeight: '1.813rem',
      letterSpacing: '0.01em',
    },
    fontReg18: {
      fontFamily: '"Lato", sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '1.125rem',
      lineHeight: '1.210rem',
      letterSpacing: '0.01em',
    },
    fontReg16: {
      fontFamily: '"Lato", sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: '1.188rem',
      letterSpacing: '0.01em',
    },
    fontReg14: {
      fontFamily: '"Lato", sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: '1.063rem',
      letterSpacing: '0.01em',
    },
    fontReg12: {
      fontFamily: '"Lato", sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: '0.875rem',
      letterSpacing: '0.01em',
    },
    fontReg10: {
      fontFamily: '"Lato", sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '0.6rem',
      lineHeight: '0.875rem',
      letterSpacing: '0.01em',
    },
  },
  palette: {
    primary: {
      main: '#3E4685',
    },
    secondary: {
      main: '#98A1B9',
    },
    info: {
      main: '#EAF2FC',
    },
    customColor: {
      pageTitle: '#33425B',
      primary: '#3E4685',
      secondary: '#98A1B9',
      text: '#00204A',
      menuBar: '#F5F9FE',
      card: '#FAFBFC',
      table: '#667185',
      netural: '#9B9A9A',
      danger: '#D80914',
      warning: '#EBA214',
      success: '#3DB500',
      stroke: '#D5D5D6',
      primaryLight: '#31506C',
      secondaryTab: '#9BB4CC',
      tabBgColor: '#F6F8FC',
      chipBgColor: '#ECEFF4',
      initiateColor: '#ffa500 ',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        style: {
          textTransform: 'none',
        },
      },
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
            pointerEvents: 'all',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          ...MuiOutlinedInputStyleOverridesRoots,
        },
        notchedOutline: {
          border: 'none !important',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '& input': {
            padding: '12px 12px 14px 12px',
          },
          '&.Mui-error': {
            border: '1px solid #D80914 !important',
          },
          background: '#FFFFFF',
          fontFamily: '"Lato", sans-serif',
          fontStyle: 'normal',
          fontWeight: '400',
          fontSize: '16px',
          lineHeight: '19px',
          letterSpacing: '0.01em',
          color: '#33425B',
          outline: 'none',
        },
      },
    },
  },
});
