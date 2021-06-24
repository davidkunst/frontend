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
import { Face, GraphicEqOutlined, Visibility } from "@material-ui/icons";
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
  

  React.useEffect(() => {
    fetchAllStocks();
  },[])
  React.useEffect(() => {
    if(Object.keys(activeUser).length)
    setIsOpen(true);
  },[activeUser])

  const fetchAllStocks = async () => {
    try {
        const response = await api.getStockList();
        console.log(response)
        setData(
            response.data.data.map((stock, key) => {
              const id = stock.symbol;
              return {
                  id: id,
                  longName: stock.longName,
                  symbol: stock.symbol,
                  actions: (
                    // we've added some custom button actions
                    <div className="actions-right">
                     <Link  to={{
                       pathname: `/dashboard/stock-page`,
                       state: { stock }
                     }}>
                       
                      <Button
                        justIcon
                        round
                        simple
                        color="info"
                        className="like"
                      >
                        <Visibility />
                      </Button>{" "}
                      </Link>
                    
                    
                    </div>
                  )
                };
            }))
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
        onConfirm={() => hideAlert()}
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
  
      <GridItem xs={12}>
        <Card style={{ backgroundColor: "rgba(32,32,32, 1)", color: "white !important"}}>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <GraphicEqOutlined />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>
                Stock list
            </h4>
          </CardHeader>
          <CardBody>
            <ReactTable
              columns={[
                {
                    Header: "Symbol",
                    accessor: "symbol"
                  },
                
                  {
                    Header: "Name",
                    accessor: "longName"
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