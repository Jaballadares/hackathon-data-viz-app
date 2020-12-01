import { fade } from 'material-ui/utils/colorManipulator';

import {
  colors,
  colorRoles,
} from './colors';

export const buttonLayout = {
  spacingMd: '1rem',
  spacingLg: '1.5rem',
  spacingSm: '.75rem',
  buttonBorderRadius: '2px',
  smButtonWidth: '1.5rem',
  smButtonHeight: '0.75rem',
  smButtonFontSize: '0.75rem',
  mdButtonWidth: '3.125rem',
  mdButtonHeight: '1.875rem',
  mdButtonFontSize: '1rem',
  lgButtonWidth: '4rem',
  lgButtonHeight: '2.5rem',
  lgButtonFontSize: '1rem',
};

const baseButton = {
  buttonStyle: {
    textTransform: 'uppercase',
  },
  labelStyle: {
    fontWeight: 500,
  },
  style: {
    minWidth: '10rem',
    marginLeft: buttonLayout.spacingLg,
  },
};

export const primaryRaisedFilled = {
  backgroundColor: colorRoles.primaryButton,
  buttonStyle: Object.assign(
    {},
    baseButton.buttonStyle,
    {
      color: colors.white,
    }
  ),
  labelStyle: Object.assign(
    {},
    baseButton.labelStyle,
    {
      color: colors.white,
    }
  ),
  style: { ...baseButton.style },
};

export const primaryRaisedFilledDisabled = {
  backgroundColor: colors.jellyBeanDisabled,
  buttonStyle: primaryRaisedFilled.buttonStyle,
  labelStyle: primaryRaisedFilled.labelStyle,
  style: primaryRaisedFilled.style,
};

export const primaryRaisedLight = {
  backgroundColor: colors.white,
  buttonStyle: Object.assign(
    {},
    baseButton.buttonStyle,
    {
      color: colorRoles.primaryButton,
    }
  ),
  labelStyle: Object.assign(
    {},
    baseButton.labelStyle,
    {
      color: colorRoles.primaryButton,
    }
  ),
  style: { ...baseButton.style },
};

export const primaryFlatLight = {
  backgroundColor: colors.white,
  buttonStyle: {
    color: colorRoles.primaryButton,
    textTransform: 'uppercase',
  },
  hoverColor: fade(colorRoles.primaryButton, 0.35),
  labelStyle: Object.assign(
    {},
    baseButton.labelStyle,
    {
      color: colorRoles.primaryButton,
    }
  ),
  style: { ...baseButton.style },
};

export const primaryFlatLightDisabled = {
  backgroundColor: primaryFlatLight.backgroundColor,
  buttonStyle: primaryFlatLight.buttonStyle,
  hoverColor: primaryFlatLight.hoverColor,
  labelStyle: { color: colors.mineShaft, opacity: 0.5 },
  style: primaryFlatLight.style,
};

export const buttonTypes = {
  primaryRaisedFilled,
  primaryRaisedLight,
  primaryFlatLight,
};

export default {
  buttonTypes,
  buttonLayout,
};
