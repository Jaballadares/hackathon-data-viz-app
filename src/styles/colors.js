import { fade } from 'material-ui/utils/colorManipulator';

// unique color names generated at http://chir.ag/projects/name-that-color

const jellyBean = '#217A94'; // RGB: 33, 122, 148 Primary Button,
const deepSea = '#24434C'; // RGB: 36, 67, 76 Navigation Bar
const cabaret = '#D2395D'; // RGB: 225, 45, 90 Primary CTA, reminder
const emerald = '#51BF87'; // RGB: 81, 191, 135button, success
const halfBaked = '#95B8C1'; // RGB: 149, 184, 193, highlight
const mineShaft = '#202020'; // RGB: 32, 32, 32 primary- text
const capeCod = '#3F484A'; // RGB: 63, 72, 74
const scorpion = '#5F5F5F'; // RGB: 95, 95, 95
const alto = '#D5D5D5'; // RGB: 213, 213, 213
const capeCodLight = fade(capeCod, 0.05);
const white = '#FFF';
const alabaster = '#F5F5F5';
const flushMahogany = '#D13F44';

const primaryButton = jellyBean;
const primaryCta = cabaret;
const success = emerald;
const accent = halfBaked;
const primaryText = mineShaft;
const backgroundDark = capeCod;
const secondaryText = scorpion;
const primaryRule = alto;
const inactiveField = scorpion;
const backgroundLight = capeCodLight;
const backgroundGray = alabaster;
const disabledButton = fade(mineShaft, 0.3);
const errorRed = flushMahogany;

export const colors = {
  jellyBean,
  deepSea,
  jellyBeanHover: fade(jellyBean, 0.4),
  jellyBeanDisabled: fade(jellyBean, 0.6),
  cabaret,
  emerald,
  emeraldHover: fade(emerald, 0.4),
  halfBaked,
  mineShaft,
  capeCod,
  scorpion,
  scorpionHover: fade(scorpion, 0.4),
  alto,
  capeCodLight,
  alabaster,
  white,
  flushMahogany,
};

export const colorRoles = {
  primaryButton,
  primaryCta,
  success,
  accent,
  primaryText,
  backgroundDark,
  secondaryText,
  primaryRule,
  inactiveField,
  backgroundLight,
  backgroundGray,
  disabledButton,
  errorRed,
};

export default {
  ...colors,
  ...colorRoles,
  colors,
  colorRoles,
};
