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
import { AccountBalance, AccountBalanceWallet, AttachMoney, Face } from "@material-ui/icons";
import api from "api";
import { Link } from 'react-router-dom';
import { storePrices } from "store/actions/authActions";
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

const PriceChangePage = ({ prices, storePrices, currentUser }) => {
  const classes = useStyles();
  const [activeUser, setActiveUser] = React.useState({});
  const [isOpen, setIsOpen] = React.useState();
  const [data, setData] = React.useState([]);
  const [alert, setAlert] = React.useState(null);
  const hideAlert = () => {
    setAlert(null);
  };
  const roleId = currentUser.role ? currentUser.role.id : currentUser.role_id;
  React.useEffect(() => {
    fetchAllUsers();
  }, [])
  React.useEffect(() => {
    if (Object.keys(activeUser).length)
      setIsOpen(true);
  }, [activeUser])

  const deletePrice = async (id) => {
      const response = await api.deletePrice(id);
    const newPrices = prices.filter(price => price.id !== id);
    storePrices(newPrices);
  }
  
  React.useEffect(() => {
    setData(
      prices.map((user, key) => {
        const id = user.id;
        return {
          id: id,
          createdAt: user.createdAt ? moment(user.createdAt).format('MMMM Do YYYY, h:mm a') : '',
          symbol: user.symbol,
          type: user.type,
          name: user.name,
          price: user.price,
        
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
          <Button
            onClick={() => {
                warningWithConfirmMessage(id, 'warning');
            }}
            color="danger"
            className="remove"
          >
              Remove
          </Button> 
        </div> )
        };
      })
    )
  }, [prices])
  const fetchAllUsers = async () => {
    try {
      const response = await api.getPricesList();
      storePrices(response.data.data);
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
        onConfirm={() => deletePrice(id)}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
        cancelBtnCssClass={classes.button + " " + classes.danger}
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        showCancel
      >
        You will delete this custom price!
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
            <CardIcon color="primary">
              <AttachMoney />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>
              Available Price changes
            </h4>
          </CardHeader>
          <CardBody>
            <ReactTable
              columns={[
                {
                  Header: "Name",
                  accessor: "name"
                },
                {
                    Header: "Symbol",
                    accessor: "symbol"
                  },
                {
                  Header: "Price",
                  accessor: "price"
                },
                {
                  Header: "Type",
                  accessor: "type"
                },
             
                {
                  Header: "Actions",
                  accessor: "actions",
                },
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
    prices: state.auth.prices,
    currentUser: state.auth.user
  }
}
const connectDispatch = (dispatch) => {
  return {
    storePrices: (prices) => { dispatch(storePrices(prices)) }
  }
}
export default connect(connectState, connectDispatch)(PriceChangePage);