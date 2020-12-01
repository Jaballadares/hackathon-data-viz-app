import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';
import './styles/_fonts.scss';
import styles from './styles';
import muiTheme from 'material-ui/styles/getMuiTheme';

const { colorStyles: { colors, colorRoles } } = styles;

const {
  jellyBean,
  deepSea,
  emerald,
  cabaret,
  halfBaked,
  white,
  mineShaft,
  scorpion,
  capeCodLight,
} = colors;

const {
  backgroundDark,
  primaryRule,
} = colorRoles;


export default muiTheme({
  spacing,
  zIndex,
  fontFamily: 'MuseoSans, sans-serif',
  palette: {
    primary1Color: jellyBean,
    primary2Color: emerald,
    primary3Color: cabaret,
    accent1Color: cabaret,
    accent2Color: scorpion,
    accent3Color: halfBaked,
    canvasColor: white,
    borderColor: primaryRule,
    // textColor: white,
    disabledColor: fade(mineShaft, 0.3),
    pickerHeaderColor: backgroundDark,
  },
  tableRow: {
    stripeColor: capeCodLight,
  },
  datePicker: {
    color: mineShaft,
    textColor: white,
    calendarTextColor: mineShaft,
    selectColor: jellyBean,
    selectTextColor: white,
    calendarYearBackgroundColor: jellyBean,
  },
  raisedButton: {
    fontWeight: 500,
  },
  toggle: {
    thumbOffColor: white,
    trackOffColor: fade(mineShaft, 0.3),
  },
  appBar: {
    color: deepSea,
  },
  slider: {
    trackColor: fade(mineShaft, 0.3),
  },
});
