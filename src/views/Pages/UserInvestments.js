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
import { Face, Gavel, MonetizationOn } from "@material-ui/icons";
import api from "api";
import { Link, useLocation } from 'react-router-dom';
import { setUserInfo } from "store/actions/authActions";
import { connect } from 'react-redux';
import BalanceModal from "views/Components/BalanceModal";
import SweetAlert from "react-bootstrap-sweetalert";
import styles1 from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import CustomInput from "components/CustomInput/CustomInput";
import Table from '../../components/Table/Table';
import StakeModal from "./StakeModal";

const styles = {
    ...styles1,
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px"
    }
};

const useStyles = makeStyles(styles);

const UsersPage = ({ setUserInfo, currentUser }) => {
    const classes = useStyles();
    const [activeUser, setActiveUser] = React.useState({});
    const [isOpen, setIsOpen] = React.useState();
    const [data, setData] = React.useState([]);
    const [alert, setAlert] = React.useState(null);
    const [users, setUsers] = React.useState([]);
    const [amount, setAmount] = React.useState('');
    const hideAlert = () => {
        setAlert(null);
    };
    const [activeInvestments, setActiveInvestments] = React.useState([]);
    const [activeStakeInfo, setActiveStakeInfo] = React.useState([]);
    const [historyInvestments, setHistoryInvestments] = React.useState([]);
    const location = useLocation();
    const [activeInvestment, setActiveInvestment] = React.useState({});
    React.useEffect(() => {

        setActiveUser(location.state.user);
        fetchUsers();
        fetchAllInvestments();
    }, [])

    React.useEffect(() => {
        if (Object.keys(activeInvestment).length)
            setIsOpen(true);
    }, [activeInvestment])
    React.useEffect(() => {
        if (users.length)
            setTimeout(() => {
                changeAmounts();
            }, 2000);
    }, [users])

    const fetchAllInvestments = async () => {
        try {
            const response = await api.getActiveUserInvestments(location.state.user.id);
            const responseStakeInfo = await api.getUserStakeInfo(location.state.user.id);
            
            setActiveStakeInfo(responseStakeInfo.data.stakeInfos.map(investment => {
                return [`${moment(investment.date).format('DD.MM.yyyy')}`,`${investment.min}`, `${investment.max}`, `${investment.profit}`, (<Button onClick={() => {setActiveInvestment(investment)}} color="success">Edit Stock Info</Button>)]
            }))
            setActiveInvestments(response.data.data.active.map(investment => {
                return [moment(investment.date).format('DD.MM.yyyy'), `${investment.currencySymbol}${investment.amount}`, <span style={{color: investment.currentAmount  >= investment.amount ? "#35a946" : "#e34728"}}>{investment.currencySymbol}{investment.currentAmount}</span>, <span style={{color: investment.totalPercent >= 0 ? "#35a946" : "#e34728"}}>{investment.totalPercent}%</span>];
            }));
            setHistoryInvestments(response.data.data.history.map(investment => {
                return [moment(investment.date).format('DD.MM.yyyy'), moment(investment.closeDate).format('DD.MM.yyyy'), `${investment.currencySymbol} ${investment.amount}`, <span style={{color: (parseFloat(investment.payout)  >= parseFloat(investment.amount)) ? "#35a946" : "#e34728"}}>{investment.currencySymbol}{investment.payout}</span>, <span style={{color: investment.totalPercent >= 0 ? "#35a946" : "#e34728"}}>{investment.totalPercent}%</span>];
            }))
            //console.log(response.data.data.active);
        } catch (err) {
            console.log(err)
        }
    }
    const createStake = async () => {
        try {
            const data = new FormData();
            data.append('amount', amount);
            const response = await api.createStake(data);
           
            const investment = response.data.stake;
            setActiveInvestments([
                [`${investment.currencySymbol} ${investment.amount}`, `${investment.currencySymbol} ${investment.currentAmount}`, `${investment.totalPercent}%`],
                ...activeInvestments])
        } catch (err) {

        }
    }
    const verifyNumber = value => {
        var numberRex = new RegExp("^[0-9]+$");
        if (numberRex.test(value)) {
            return true;
        }
        return false;
    };
    const fetchUsers = async () => {
        try {
            const res = await fetch('https://randomuser.me/api/?results=10').then(res => res.json()).then(data => setUsers(data.results.map(user => {
                user.profit = getRandomArbitrary(58, 12312);
                user.percent = getRandomArbitrary(5, 100);
                return user;
            })));
            setTimeout(() => {
                changeAmounts();
            }, 2000);
        } catch (err) {
            console.log(err)
        }
    }
    const changeAmounts = () => {
        const newUsers = users.map(user => {
            const newProfit = getRandomArbitrary(-12, 42);
            user.profit += newProfit;
            //user.percent += newProfit > 0 ? getRandomArbitrary(0, 1) : getRandomArbitrary(-1, 0);
            return user;
        });
        setUsers(newUsers)

    }

    const handleBuy = (e) => {

        if (!currentUser) return;
        if (!verifyNumber(e.target.value)) return;
        let value = e.target.value;

        if (parseFloat(currentUser.balance) < value) {
            setAmount(parseFloat(currentUser.balance).toFixed(2));
        } else {

            if (value[0] === '0')
                value = value.replace('0', '')

            setAmount(value);
        }

    }
    const warningWithConfirmMessage = (id) => {
        setAlert(

            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Are you sure?"
                onConfirm={() => { }}
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
    const getRandomArbitrary = (min, max) => {
        return Math.round(Math.random() * (max - min) + min);
    }
    const closeStake = async (id) => {
        try {
            const response = await api.closeStake(id);
            const history = [
                ...historyInvestments,
                [`${response.data.resData.currencySymbol} ${response.data.resData.amount}`, `${response.data.resData.currencySymbol} ${response.data.resData.payout}`, `${response.data.resData.totalPercent}%`]
            ];
            setHistoryInvestments(history);
            setActiveInvestments(activeInvestments.filter(investment => investment.id !== id))
        } catch (err) {

        }
    }
    const setInvestmentInfo = async (investment) => {
        if (activeInvestment.id) {
            try {
                const responseStakeInfo = await api.getUserStakeInfo(location.state.user.id);
                setActiveStakeInfo(responseStakeInfo.data.stakeInfos.map(investment => {
                    return [`${moment(investment.date).format('DD.MM.yyyy')}`,`${investment.min}`, `${investment.max}`, `${investment.profit}`, (<Button onClick={() => {setActiveInvestment(investment)}} color="success">Edit Stock Info</Button>)]
                }))
            } catch(err){

            }
        } else {
            setActiveStakeInfo([...activeStakeInfo, [`${moment(investment.date).format('DD.MM.yyyy')}`,`${investment.min}`, `${investment.max}`, `${investment.profit}`, (<Button onClick={() => {setActiveInvestment(investment)}} color="success">Edit Stock Info</Button>)]])
        }
    }
    return (
        <GridContainer>
            {alert}
            <StakeModal submitHandler={setInvestmentInfo} investment={activeInvestment} stakeId={activeInvestment.id} currency={activeUser.currency ? activeUser.currency.code : ''} userId={activeUser.id} isOpen={isOpen} modalHandler={(isOpen) => { setIsOpen(isOpen); setActiveInvestment({}) }} />

            <GridItem xs={12}>
                <Card style={{ backgroundColor: "rgba(32,32,32, 1)", color: "white !important" }}>
                    <CardHeader color="primary" icon>
                        <CardIcon color="primary">
                            <Gavel />
                        </CardIcon>
                        <h4 style={{ color: 'white' }} className={classes.cardIconTitle}>User investments - {activeUser.fullName} </h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem style={{ marginTop: '20px' }} sm={12} md={12} xs={12}>
                                <h4 style={{ color: 'white' }}>
                                    Stock manipulations
                                    <Button onClick={() => { setIsOpen(true) }} style={{ float: 'right' }} color="success">
                                        Create manipulation
                                    </Button>
                                </h4>
                                <Table
                                    tableHeaderColor="primary"
                                    tableHead={["Date","Min", "Max", "Profit", "Actions"]}
                                    tableData={activeStakeInfo}
                                    coloredColls={[0, 1, 2, 3]}
                                    colorsColls={["gray", "gray", "gray", "gray"]}
                                />
                            </GridItem>
                            <GridItem style={{ marginTop: '20px' }} sm={12} md={12} xs={12}>
                                <h4 style={{ color: 'white' }}>
                                    Active investments
                                </h4>
                                <Table
                                    tableHeaderColor="primary"
                                    tableHead={["Date", "Investment amount", "Current amount", "% Change"]}
                                    tableData={activeInvestments}
                                    coloredColls={[0, 1, 2, 3]}
                                    colorsColls={["gray", "gray", "gray", "gray"]}
                                />
                            </GridItem>
                            <GridItem style={{ marginTop: '20px' }} sm={12} md={12} xs={12}>
                                <h4 style={{ color: 'white' }}>
                                    Investment history
                                </h4>
                                <Table
                                    tableHeaderColor="primary"
                                    tableHead={["Open Date", "Close Date", "Investment amount", "Payout", "% Change"]}
                                    tableData={historyInvestments}
                                    coloredColls={[0, 1, 2, 3, 4]}
                                    colorsColls={["gray", "gray", "gray", "gray", "gray"]}
                                />
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}

const connectState = (state) => {
    return {
        currentUser: state.auth.user
    }
}
const connectDispatch = (dispatch) => {
    return {
        setUserInfo: (user) => { dispatch(setUserInfo(user)) }
    }
}
export default connect(connectState, connectDispatch)(UsersPage);