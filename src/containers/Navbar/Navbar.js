import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import resideImg from 'static/reside-icon-white.png';
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import { colors } from 'styles/colors';
import {get} from 'lodash';
import { saveUserAction } from '../../store/saveUser';
import classes from './Navbar.scss';


const buttonStyle = {
  color: 'white',
  textDecoration: 'none',
  alignSelf: 'center',
};

const avatarStyles = {
  wrapper: { marginTop: 0 },
  button: { marginRight: '.5rem', width: '200px', height: '64px' },
  buttonSm: { marginRight: '.5rem', width: '30px', height: '64px', padding: '0' },
};

@connect((state) => ({
    user: get(state, 'user', 'shirley'),
  }),
  { saveUserAction }
)
export default class Navbar extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
  }

  buildTitle = (resideLogo) => {

    // Redirect to listings page if logged in

    // Only show tabs for certain paths
    return (
      <div className={classes.wrapper}>
        {
          !!resideLogo
          ?
            <Link className={classes.brand}>
              <img
                src={resideImg}
                className={classes.icon}
                alt="Reside Real Estate"
                id="navbar-logo"
              />
            </Link>
          :
            null
        }
        {
          true
            ?
              <Tabs
                className={classes.tabs}
                value="data"
                tabItemContainerStyle={{ backgroundColor: colors.deepSea }}
              >
                <Tab
                  label="Listings"
                  value="listings"
                  className="listings-tab"
                  buttonStyle={{ padding: '5px'}}
                />
                <Tab
                  label="Offers"
                  value="offers"
                  className="offers-tab"
                />
                <Tab
                  label="Archived"
                  value="archived"
                  className="archived-tab"
                />
                <Tab
                  label="Data"
                  value="data"
                  className="data-tab"
                />
              </Tabs>
            : null
        }
        {/* Show the address in the navbar when inside a transaction */}
        {
          false
          ?
            <div className={classes.address}>{this.props.address}</div>
          :
            null
        }
      </div>
    );
  }

  handleClick = (name) => {
    this.props.saveUserAction(name);
  }

  render() {

    const iconButtonStyle = avatarStyles.button;

    const iconButton = (
      <IconButton style={iconButtonStyle} disableTouchRipple>
        <div className={classes.avatar}>
          <div className="hidden-mobile">
            <Avatar
              src={ this.props.user === "donna" ?
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4fY96vWe0iuoxdRbievW7Ozoh7JNmM4SaEZ0gk9y2A9Hrx-8b"
                :
                "http://sdsnake.com/Coyote/Coyote6RC.jpg"
              }
            />
          </div>
          <div className={classes['avatar-text']}>
            <span className={`${classes['avatar-text-name']} hidden-mobile`}>
              {
                this.props.user === "donna" ?
                'Donna Dalmatian'
                :
                'Shirley Coyote'
              }
            </span>
            <DownArrow color={colors.white} />
          </div>
        </div>
      </IconButton>
    );

    const mainMenu = (
      <div>
        <Link >
          <FlatButton
            label="Sign Up"
            style={buttonStyle}
            id="sign-up"
          />
        </Link>
        <Link >
          <FlatButton
            label="Login"
            style={buttonStyle}
            id="log-in"
          />
        </Link>
      </div>
    );

    const rightMenu = true
      ?
        (<div id="profile-menu">
          <IconMenu
            iconButtonElement={iconButton}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            animated={false}
          >
            <MenuItem
              primaryText="Shirley Coyote"
              value="shirley"
              onClick={() => this.handleClick('shirley')}
            />
            <MenuItem
              primaryText="Donna Dalmatian"
              value="donna"
              onClick={() => this.handleClick('donna')}
            />
          </IconMenu>
        </div>)
      :
        mainMenu;

    // Only apply styling if avatar is showing
    const menuStyle = true ? avatarStyles.wrapper : {};

    return (
      <div className={classes.container}>
        <AppBar
          title={this.buildTitle(true)}
          iconElementRight={rightMenu}
          iconStyleRight={menuStyle}
          className={classes.appBar}
          zDepth={2}
          showMenuIconButton={false}
        />
      </div>
    );
  }
}
