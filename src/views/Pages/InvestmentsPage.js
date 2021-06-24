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
import { AccountBalance, AccountBalanceWallet, Face } from "@material-ui/icons";
import api from "api";
import { Link } from 'react-router-dom';
import { storeInvestments } from "store/actions/authActions";
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

const InvestmentsPage = ({ investments, storeInvestments, currentUser }) => {
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

  
  React.useEffect(() => {
    setData(
      investments.map((user, key) => {
        const id = user.id;
        return {
          id: id,
          createdAt: user.createdAt ? moment(user.createdAt).format('MMMM Do YYYY, h:mm a') : '',
          name: user.name,
          symbol: user.symbol,
          status: user.status,
          investType: user.investType,
          buyType: user.buyType,
          investAmount: user.investmentAmount ? user.investmentAmount : '---',
          currency: user['investmentCurrency.code'],
          closeValue: user.closeValue ? user.closeValue : '---',
          openValue: user.openValue ? user.openValue : '---',
          closeTimestamp: user.closeTimestamp ? moment(user.closeTimestamp).format('MMMM Do YYYY, h:mm a') : '---',
          openTimestamp: user.openTimestamp ? moment(user.openTimestamp).format('MMMM Do YYYY, h:mm a') : '---',
          profit: user.profitValue,
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {roleId === 1 ? 
              <React.Fragment>
              <Button
                onClick={() => {
                  warningWithConfirmMessage2(id, 'open');
                }}
                color="danger"
                className="remove"
              >
                  Open
              </Button> 
              <Button
                onClick={() => {
                  warningWithConfirmMessage2(id, 'pending');
                }}
                color="info"
                className="remove"
              >
                  Pending
              </Button> 
              <Button
                onClick={() => {
                  warningWithConfirmMessage2(id, 'close');
                }}
                color="success"
                className="remove"
              >
                  Close
              </Button> 
              </React.Fragment> : 
              <React.Fragment>
                 {
                user.status === 'open' ? 
                <Button
                onClick={() => {
                  warningWithConfirmMessage(id);
                }}
                color="success"
                className="remove"
              >
                  Close
              </Button> : <React.Fragment>
                {user.status === 'close' ? <h6 style={{textAlign: 'center'}}>Closed</h6> :
                <h6 style={{textAlign: 'center'}}>Pending</h6>}
              </React.Fragment>
              }
              </React.Fragment>}
             
           
            </div>
          )
        };
      })
    )
  }, [investments])
  const fetchAllUsers = async () => {
    try {
      const response = currentUser.role_id === 1 ? await api.getAllInvestments() : await api.getInvestments();
      storeInvestments(response.data.data);
    } catch (err) {
      console.log(err)
    }
  }

  const closeInvestment = async (id) => {
    try {
      const response = await api.sellInvestment(id);
      if (response.data.success === true) {
        storeInvestments(response.data.data);
        hideAlert();
      }
    } catch (err) {
      hideAlert();
    }
  }
  const setInvestmentStatus = async (id, status) => {
    try {
      const data = new FormData();
      data.set('id', id);
      data.set('status', status);
      const response = await api.investmentStatus(data);
      if (response.data.success === true) {
        storeInvestments(response.data.data);
        hideAlert();
      }
    } catch(e){
      
    }
  }
  const warningWithConfirmMessage = (id) => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px", backgroundColor: "#121212"  }}
        title="Are you sure?"
        onConfirm={() => closeInvestment(id)}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
        cancelBtnCssClass={classes.button + " " + classes.danger}
        confirmBtnText="Yes, close it!"
        cancelBtnText="Cancel"
        showCancel
      >
        You will close this stock!
      </SweetAlert>
    );
  };
  const warningWithConfirmMessage2 = (id, status) => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px", backgroundColor: "#121212"  }}
        title="Are you sure?"
        onConfirm={() => setInvestmentStatus(id, status)}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
        cancelBtnCssClass={classes.button + " " + classes.danger}
        confirmBtnText="Yes!"
        cancelBtnText="Cancel"
        showCancel
      >
        You will change status of this investment to {status}!
      </SweetAlert>
    );
  };

  return (
    <GridContainer >
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
                  Header: "Name",
                  accessor: "name"
                },
                {
                  Header: "Status",
                  accessor: "status"
                },
                {
                  Header: "Type",
                  accessor: "buyType"
                },
                {
                  Header: "Buy time",
                  accessor: "openTimestamp"
                },
                {
                  Header: "Buy value",
                  accessor: "openValue"
                },
                {
                  Header: "Close value",
                  accessor: "closeValue"
                },
                {
                  Header: "Amount",
                  accessor: "investAmount"
                },
                {
                  Header: "Payout",
                  accessor: 'profit'
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
    investments: state.auth.investments,
    currentUser: state.auth.user
  }
}
const connectDispatch = (dispatch) => {
  return {
    storeInvestments: (investments) => { dispatch(storeInvestments(investments)) }
  }
}
export default connect(connectState, connectDispatch)(InvestmentsPage);