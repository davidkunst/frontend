import React from "react";
import moment from "moment";

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
import Edit from "@material-ui/icons/Edit";
import { dataTable } from "variables/general.js";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import { Face, Gavel, MonetizationOn } from "@material-ui/icons";
import api from "api";
import { Link } from "react-router-dom";
import { setUserInfo } from "store/actions/authActions";
import { connect } from "react-redux";
import BalanceModal from "views/Components/BalanceModal";
import SweetAlert from "react-bootstrap-sweetalert";
import styles1 from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import CustomInput from "components/CustomInput/CustomInput";
import Table from "../../components/Table/Table";

const styles = {
  ...styles1,
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
};

const useStyles = makeStyles(styles);

const UsersPage = ({ setUserInfo, currentUser }) => {
  const classes = useStyles();
  const [activeUser, setActiveUser] = React.useState({});
  const [isOpen, setIsOpen] = React.useState();
  const [data, setData] = React.useState([]);
  const [alert, setAlert] = React.useState(null);
  const [users, setUsers] = React.useState([]);
  const [amount, setAmount] = React.useState("");
  const hideAlert = () => {
    setAlert(null);
  };
  const [activeInvestments, setActiveInvestments] = React.useState([]);
  const [historyInvestments, setHistoryInvestments] = React.useState([]);
  const [investments, setInvestments] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    fetchAllInvestments();
  }, []);

  React.useEffect(() => {
    if (Object.keys(activeUser).length) setIsOpen(true);
  }, [activeUser]);

  React.useEffect(() => {
    if (users.length)
      setTimeout(() => {
        changeAmounts();
      }, 2000);
  }, [users]);
  React.useEffect(() => {
    if (investments.length)
      setTimeout(() => {
        changeInvestmentAmounts();
      }, 2000);
  }, [investments]);

  const changeInvestmentAmounts = () => {
    setActiveInvestments(
      investments.map((investment) => {
        const randomPercentage = getRandomArbitrary(
          parseFloat(investment.min),
          parseFloat(investment.max)
        );
        const newProfit =
          Math.round(
            (parseFloat(investment.amount) +
              parseFloat(investment.amount) * (randomPercentage / 100)) *
              100
          ) / 100;
        return [
          moment(investment.date).format("DD.MM.yyyy"),
          `${investment.currencySymbol}${investment.amount}`,
          <span
            style={{
              color: randomPercentage >= 0 ? "#35a946" : "#e34728",
              fontWeight: "500",
            }}
          >
            {investment.currencySymbol}{newProfit}
            ({newProfit - investment.amount >= 0 ? "+" : ""}{parseFloat(newProfit - investment.amount).toFixed(2)})
          </span>,
          <span
            style={{
              color: randomPercentage >= 0 ? "#35a946" : "#e34728",
              fontWeight: "500",
            }}
          >
            {randomPercentage}%
          </span>,
          <Button
            style={{ float: "right", display: "inline" }}
            onClick={() => {
              closeStake(investment.id, randomPercentage, newProfit);
            }}
            color="indexvent"
          >
            Close investment
          </Button>,
        ];
      })
    );
    setTimeout(() => {
      changeInvestmentAmounts();
    }, 2000);
  };

  const fetchAllInvestments = async () => {
    try {
      const response = await api.getActiveInvestments();
      setInvestments(response.data.data.active);

      setActiveInvestments(
        response.data.data.active.map((investment) => {
          const randPercent = parseFloat(getRandomArbitrary(parseFloat(investment.min) - 1, parseFloat(investment.max) + 1))
          const total = parseFloat(investment.amount + (parseFloat(randPercent / 100) * parseFloat(investment.amount))).toFixed(2)
          return [
            moment(investment.date).format("DD.MM.yyyy"),
            `${investment.currencySymbol}${investment.amount}`,
            <span
              style={{
                color: randPercent >= 0 ? "#35a946" : "#e34728",
                fontWeight: "500",
              }}
            >
              {total}({((parseFloat(total).toFixed(2) - parseFloat(investment.amount).toFixed(2)) >= 0) ? '+' : ''}{(parseFloat(total).toFixed(2) - parseFloat(investment.amount).toFixed(2)).toFixed(2)})
            </span>,
            <span
              style={{
                color: randPercent >= 0 ? "#35a946" : "#e34728",
                fontWeight: "500",
              }}
            >
              {randPercent}%
            </span>,
            <Button
              style={{ float: "right" }}
              onClick={() => {
                closeStake(
                  investment.id,
                  investment.totalPercent,
                  investment.currentAmount
                );
              }}
              color="indexvent"
            >
              Close investment
            </Button>,
          ];
        })
      );
      setHistoryInvestments(
        response.data.data.history.map((investment) => {
          return [
            `${moment(investment.date).format("DD.MM.yyyy")} - ${moment(investment.closeDate).format("DD.MM.yyyy")}`,
            `${investment.currencySymbol}${investment.amount}`,
            <span
              style={{
                color: investment.totalPercent >= 0 ? "#35a946" : "#e34728",
                fontWeight: "500",
              }}
            >
              {investment.currencySymbol}
              {investment.payout}(
              {investment.payout - investment.amount >= 0 ? "+" : ""}
              {parseFloat(investment.payout - investment.amount).toFixed(2)})
            </span>,
            <span
              style={{
                color: investment.totalPercent >= 0 ? "#35a946" : "#e34728",
                fontWeight: "500",
              }}
            >
              {investment.totalPercent}%
            </span>,
          ];
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  const createStake = async () => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append("amount", amount);
      const response = await api.createStake(data);
      const newUser = { ...currentUser, balance: currentUser.balance - amount };
      setUserInfo(newUser);
      const investment = response.data.stake;
      window.location.reload();

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  const verifyNumber = (value) => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };
  const changeAmounts = () => {
    const newUsers = users.map((user) => {
      const newProfit = getRandomArbitrary(-12, 42);
      user.profit += newProfit;
      //user.percent += newProfit > 0 ? getRandomArbitrary(0, 1) : getRandomArbitrary(-1, 0);
      return user;
    });
    setUsers(newUsers);
  };
  const handleBuy = (e) => {
    if (!currentUser) return;
    if (!verifyNumber(e.target.value)) return;
    let value = e.target.value;

    if (parseFloat(currentUser.balance) < value) {
      setAmount(parseFloat(currentUser.balance).toFixed(2));
    } else {
      if (value[0] === "0") value = value.replace("0", "");

      setAmount(value);
    }
  };

  const getRandomArbitrary = (min, max) => {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100;
  };
  const closeStake = async (id, percentage, profit) => {
    try {
      const response = await api.closeStake(id, percentage, profit);
      window.location.reload();
    } catch (err) {}
  };
  return (
    <GridContainer>
      {alert}
      <BalanceModal
        currency={activeUser.currency ? activeUser.currency.code : ""}
        userId={activeUser.id}
        isOpen={isOpen}
        modalHandler={setIsOpen}
      />

      <GridItem xs={12}>
        <Card
          style={{
            backgroundColor: "rgba(32,32,32, 1)",
            color: "white !important",
          }}
        >
          <CardBody>
            <GridContainer>
              <GridItem sm={12} md={12} xs={12}>
                <h1 style={{ color: "white", fontSize: 25, marginTop: "20px" }}>
                  Invest below
                </h1>
                <p style={{ color: "white", textAlign: "center" }}>
                  Invest the desired amount below and our automatic trading
                  algorithm will buy and sell stock/crypto/forex for you and
                  passively increase your profit!
                </p>
                <h5
                  style={{
                    marginTop: "20px",
                    marginBottom: "0px",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MonetizationOn
                    style={{
                      width: "30px",
                      height: "30px",
                      marginRight: "10px",
                    }}
                  />
                  You are investing:{" "}
                  <span style={{ color: "green", marginLeft: "10px" }}>
                    {amount ? parseFloat(amount).toLocaleString() : 0}{" "}
                    {currentUser.currency ? currentUser.currency.code : "$"}
                  </span>
                </h5>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    style={{
                      width: "40%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <CustomInput
                      className="test2"
                      labelText="Investment amount"
                      formControlProps={{
                        fullWidth: true,
                        className: "test2",
                      }}
                      inputProps={{
                        onChange: (event) => {
                          handleBuy(event);
                        },
                        className: "test",
                        style: {
                          color: "white",
                        },
                        value: amount,
                        type: "text",
                      }}
                    />
                    {loading ? (
                      <h4 style={{ display: "inline-block", color: "white" }}>
                        Loading...
                      </h4>
                    ) : (
                      <Button
                        style={{
                          display: "inline-block",
                          height: "max-content",
                          backgroundColor: 'white !important',
                          marginLeft: 10,
                        }}
                        disabled={!amount}
                        onClick={() => {
                          createStake();
                        }}
                        color="indexvent"
                      >
                        Start investment
                      </Button>
                    )}
                  </div>
                </div>
              </GridItem>
              {/**
             * <GridItem sm={12} md={4} xs={12}>
              <h1 style={{color: 'white', fontSize: 20}}>
                Todays top earnings
              </h1>
              {users.map(user => {
                return <div style={{display: 'flex', justifyContent: 'space-between', color: 'white', borderBottom: '1px solid #121212'}} key={user.email}>
                    <h5 style={{fontSize: 15}}>
                    {user.name.first + ' ' + user.name.last} ({user.location.country})
                    </h5>
                    <h5 style={{color: 'green', fontWeight: 600}}>
                      {user.profit.toLocaleString()}
                    </h5>
                </div>
              })}
            </GridItem> */}
              <GridItem style={{ marginTop: "20px" }} sm={12} md={12} xs={12}>
                <p style={{ fontSize: 20, color: "#0089C0" }}>
                  Active investments
                </p>
                {activeInvestments[0] && activeInvestments[0].length ? (
                  <Table
                    tableHeaderColor="primary"
                    tableHead={[
                      "Date",
                      "Investment amount",
                      "Current amount",
                      "% Change",
                      "Actions",
                    ]}
                    tableData={activeInvestments}
                    customHeadCellClasses={["pull-right"]}
                    customHeadClassesForCells={[4]}
                    coloredColls={[0, 1, 2, 3, 4]}
                    colorsColls={["gray", "gray", "gray", "gray", "success"]}
                  />
                ) : (
                  <p style={{ fontSize: 14, color: "red" }}>
                    No active investments
                  </p>
                )}
              </GridItem>
              <GridItem style={{ marginTop: "20px" }} sm={12} md={12} xs={12}>
                <p style={{ fontSize: 20, color: "#0089C0" }}>
                  Investment history
                </p>
                {historyInvestments[0] && historyInvestments[0].length ? (
                  <Table
                    tableHeaderColor="primary"
                    tableHead={[
                      "Date",
                      "Investment amount",
                      "Payout",
                      "% Change",
                    ]}
                    tableData={historyInvestments}
                    customHeadCellClasses={[""]}
                    customHeadClassesForCells={[3]}
                    coloredColls={[0, 1, 2]}
                    colorsColls={["gray", "gray", "gray"]}
                  />
                ) : (
                  <p style={{ fontSize: 14, color: "red" }}>
                    No investment history
                  </p>
                )}
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

const connectState = (state) => {
  return {
    currentUser: state.auth.user,
  };
};
const connectDispatch = (dispatch) => {
  return {
    setUserInfo: (user) => {
      dispatch(setUserInfo(user));
    },
  };
};
export default connect(connectState, connectDispatch)(UsersPage);
