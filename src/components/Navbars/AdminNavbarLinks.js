import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import SweetAlert from "react-bootstrap-sweetalert";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
import SignOut from '@material-ui/icons/ExitToApp';
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.js";
import { connect } from 'react-redux';
import { logout } from "store/actions/authActions";
import api from 'api';

const useStyles = makeStyles(styles);

const HeaderLinks = (props) => {
  const [alert, setAlert] = React.useState(null);
  const hideAlert = () => {
    setAlert(null);
  };
  const [openNotification, setOpenNotification] = React.useState(null);
  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const [openProfile, setOpenProfile] = React.useState(null);
  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  const classes = useStyles();
  const { rtlActive } = props;
  const searchButton =
    classes.top +
    " " +
    classes.searchButton +
    " " +
    classNames({
      [classes.searchRTL]: rtlActive
    });
  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover, {
    [classes.dropdownItemRTL]: rtlActive
  });
  const wrapper = classNames({
    [classes.wrapperRTL]: rtlActive
  });
  const managerClasses = classNames({
    [classes.managerClasses]: true
  });

  
  const depositRequest = async () => {
    try {
      const response = await api.depositRequest();
      setAlert(
        <SweetAlert
          
          style={{ display: "block", marginTop: "-100px" }}
          title="Deposit request sent"
          onConfirm={() => hideAlert()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={classes.button + " " + classes.success}
          cancelBtnCssClass={classes.button + " " + classes.danger}
          confirmBtnText="Confirm."
          
          
        >
          You will be contacted by our team shortly!
        </SweetAlert>
      );
    } catch (e) {
      console.log(e);
    }
    
  };

  return (
    <div className={wrapper} style={{backgroundColor: '#1E234C'}}>
      <div className={managerClasses}>
      {alert}
      {!props.user.isConfirmed && false ? 
       <Button
       color="danger"
       aria-label="Person"
       style={{ marginTop: '-2px', marginRight: '15px', color: 'white' }}
      
       aria-owns={openProfile ? "profile-menu-list" : null}
       aria-haspopup="true"
       onClick={(e) => { props.logout() }}
       className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
       muiClasses={{
         label: rtlActive ? classes.labelRTL : ""
       }}
     >

     Account Not confirmed
      
     </Button>
     : null}
    
        <h5 style={{ display: 'inline-block', marginRight: '15px', color: 'white', fontSize: 15 }}>
          Balance: <span style={{color: "#4caf50", fontWeight: 'bold'}}>{` ${props.user.balance ? parseFloat(props.user.balance).toFixed(2) : 0} ${props.user.currency ? props.user.currency.symbol : ''}`}</span>
        </h5>
       
        <Button
          color="success"
          onClick={depositRequest}
          style={{ marginTop: '-2px' }}
          
          color="indexvent"
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : ""
          }}
        >

          Deposit
        
        </Button>
        <Button
          color="transparent"
          aria-label="Person"
          style={{ marginTop: '-2px' }}
          justIcon
          aria-owns={openProfile ? "profile-menu-list" : null}
          aria-haspopup="true"
          onClick={(e) => { props.logout() }}
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : ""
          }}
        >

          <SignOut
            className={
              classes.headerLinksSvg +
              " " +
              (rtlActive
                ? classes.links + " " + classes.linksRTL
                : classes.links)
            }
          />
          <Hidden mdUp implementation="css">
            <span onClick={handleClickProfile} className={classes.linkText}>
              {rtlActive ? "الملف الشخصي" : "Profile"}
            </span>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openProfile,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list"
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={dropdownItem}
                    >
                      {rtlActive ? "الملف الشخصي" : "Profile"}
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={dropdownItem}
                    >
                      {rtlActive ? "الإعدادات" : "Settings"}
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={dropdownItem}
                    >
                      {rtlActive ? "الخروج" : "Log out"}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
const state = state => {
  return {
    user: state.auth.user
  }
}
const dispatch = dispatch => {
  return {
    logout: () => { dispatch(logout()) }
  }
}
HeaderLinks.propTypes = {
  rtlActive: PropTypes.bool
};

export default connect(state, dispatch)(HeaderLinks);