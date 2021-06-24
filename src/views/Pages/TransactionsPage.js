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
import { AccountBalance, Face } from "@material-ui/icons";
import api from "api";
import { Link } from 'react-router-dom';
import { storeTransactions } from "store/actions/authActions";
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

const TransactionsPage = ({ transactions, storeTransactions, currentUser }) => {
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
      if (response.data.success === true) {
        const newUsers = transactions.map((user) => {
          if (id !== user.id)
            return user;
          else return;
        })
        storeTransactions(newUsers);
        hideAlert();
      }
    } catch (err) {
      hideAlert();
    }

  }
  React.useEffect(() => {
    fetchAllUsers();
  }, [])
  React.useEffect(() => {
    if (Object.keys(activeUser).length)
      setIsOpen(true);
  }, [activeUser])
  React.useEffect(() => {
    setData(
      transactions.map((user, key) => {
        const id = user.id;
        return {
          id: id,
          type: user.transactionType,
          createdAt: user.createdAt ? moment(user.createdAt).format('MMMM Do YYYY, h:mm a') : '',
          amount: user.amount ? user.amount : '',
          currency: user.currency ? user.currency.code : '',
          
        };
      })
    )
  }, [transactions])
  const fetchAllUsers = async () => {
    try {
      
      const response =  currentUser.role_id === 1 ? await api.getAllTransactions() : await api.getTransactions();
      console.log(response.data.transactions)
      storeTransactions(response.data.transactions);
    } catch (err) {
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


  return (
    <GridContainer>
      {alert}
      <BalanceModal currency={activeUser.currency ? activeUser.currency.code : ''} userId={activeUser.id} isOpen={isOpen} modalHandler={setIsOpen} />

      <GridItem xs={12}>
        <Card style={{ backgroundColor: "rgba(32,32,32, 1)", color: "white !important"}}>
          <CardHeader color="primary" icon>
          </CardHeader>
          <CardBody>
            <ReactTable
              columns={[
                {
                  Header: "Date",
                  accessor: "createdAt"
                },
                {
                  Header: "Type",
                  accessor: "type"
                },
                {
                  Header: "Amount",
                  accessor: "amount"
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
    transactions: state.auth.transactions,
    currentUser: state.auth.user
  }
}
const connectDispatch = (dispatch) => {
  return {
    storeTransactions: (transactions) => { dispatch(storeTransactions(transactions)) }
  }
}
export default connect(connectState, connectDispatch)(TransactionsPage);