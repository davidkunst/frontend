import React from "react";
import moment from 'moment';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import ReactTable from "components/ReactTable/ReactTable.js";
import Edit from '@material-ui/icons/Edit';
import { dataTable } from "variables/general.js";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import { AttachMoney, Face } from "@material-ui/icons";
import api from "api";
import {Link} from 'react-router-dom';
import { storeUsers } from "store/actions/authActions";
import { connect } from 'react-redux';
import BalanceModal from "views/Components/BalanceModal";
import SweetAlert from "react-bootstrap-sweetalert";
import styles1 from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import CustomInput from "components/CustomInput/CustomInput";
const styles = {
  ...styles1,
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

const useStyles = makeStyles(styles);

const UsersPage = ({ users, storeUsers }) => {
  const classes = useStyles();
  const [activeUser, setActiveUser] = React.useState({});
  const [isOpen, setIsOpen] = React.useState();
  const [data, setData] = React.useState([]);
  const [alert, setAlert] = React.useState(null);
  const hideAlert = () => {
    setAlert(null);
  };
  
  const deleteUser = async (id) => {
    try {
      const response = await api.deleteUser(id);
      if(response.data.success === true){
        const newUsers = users.map((user) => {
          if(id !== user.id)
            return user;
            else return;
        })
        storeUsers(newUsers);
        hideAlert();
      }
    } catch(err){
      hideAlert();
    }

  }
  React.useEffect(() => {
    fetchAllUsers();
  },[])
  React.useEffect(() => {
    if(Object.keys(activeUser).length)
    setIsOpen(true);
  },[activeUser])
  React.useEffect(() => {
    setData(
      users.map((user, key) => {
        const id = user.id;
        return {
            id: id,
            name: user.fullName,
            address: user.address,
            country: user.country ? user.country.name : 'Not Set',
            currency: user.currency ? user.currency.currencyName : 'Not Set',
            age: user.dateOfBirth ? moment(user.dateOfBirth).format('DD.MM.YYYY') : '',
            email: user.email,
            phoneNumber: user.phoneNumber,
            postalCode: user.postalCode,
            role: user.role ? user.role.name : 'Not Set',
            balance: user.balance ? parseFloat(user.balance).toFixed(2) : '',
            actions: (
              // we've added some custom button actions
              <div className="actions-right">
               <Link  to={{
                 pathname: `/dashboard/user-page`,
                 state: { user }
               }}>
                 
                <Button
                  justIcon
                  round
                  simple
                  color="info"
                  className="like"
                >
                  <Edit />
                </Button>{" "}
                </Link>
                {/* use this button to add a edit kind of action */}
                <Link to={{
                  pathname: `/dashboard/user-investments`,
                  state: { user }
                }}>
                  <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    setActiveUser(user);
                  }}
                  color="success"
                  className="edit"
                >
                  <AttachMoney />
                </Button>{" "}
                </Link>
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    setActiveUser(user);
                  }}
                  color="warning"
                  className="edit"
                >
                  <Dvr />
                </Button>{" "}
                {/* use this button to remove the data row */}
                <Button
                  justIcon
                  round
                  simple
                  onClick={() => {
                    warningWithConfirmMessage(id);
                  }}
                  color="danger"
                  className="remove"
                >
                  <Close />
                </Button>{" "}
              </div>
            )
          };
      })
  )
  }, [users])
  const fetchAllUsers = async () => {
    try {
        const response = await api.getAllUsers();
        storeUsers(response.data.users);
    } catch(err){
        console.log(err)
    }
  }
  const warningWithConfirmMessage = (id) => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Are you sure?"
        onConfirm={() => deleteUser(id)}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
        cancelBtnCssClass={classes.button + " " + classes.danger}
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        showCancel
      >
        You will not be able to recover this user!
      </SweetAlert>
    );
  };

  const submitCSV = async (file) => {
    const data = new FormData();
    data.set('csv', file);
    try {
      const response = await api.storeCSV(data);
      const newUsers = response.data.users;
      storeUsers(newUsers);
    } catch(err){

    }
  }
  return (
    <GridContainer>
      {alert}
      <BalanceModal currency={activeUser.currency ? activeUser.currency.code : ''} userId={activeUser.id} isOpen={isOpen} modalHandler={setIsOpen} /> 
      <GridItem xs={12}>
          <CustomInput
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: event => {
                       submitCSV(event.target.files[0])
                      },
                      type: 'file',
                      accept: '.csv'
                    }}
                  />
      </GridItem>
      <GridItem xs={12}>
        <Card style={{ backgroundColor: "rgba(32,32,32, 1)", color: "white !important"}}>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Face />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Users</h4>
          </CardHeader>
          <CardBody>
            <ReactTable
              columns={[
                {
                    Header: "Name",
                    accessor: "name"
                  },
                
                  {
                    Header: "Country",
                    accessor: "country"
                  },
                  {
                    Header: "Currency",
                    accessor: "currency"
                  },
                  {
                    Header: "Date of Birth",
                    accessor: "age"
                  },
                  {
                      Header: "Email",
                      accessor: "email"
                  },
                  {
                      Header: "Number",
                      accessor: "phoneNumber"
                  },
              
                  {
                      Header: "Role",
                      accessor: "role"
                  },
                  {
                    Header: "Balance",
                    accessor: "balance"
                },
                {
                  Header: "Actions",
                  accessor: "actions"
                }
              ]}
              data={data}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

const connectState = (state) => {
  return {
    users: state.auth.users
  }
}
const connectDispatch = (dispatch) => {
  return {
    storeUsers: (users) => { dispatch(storeUsers(users)) }
  }
}
export default connect(connectState, connectDispatch)(UsersPage);