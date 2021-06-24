import React from "react";
import ChartistGraph from "react-chartist";
import { straightLinesChart } from "variables/charts.js";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';

import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import moment from 'moment';
// @material-ui/icons
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import PriorityHigh from "@material-ui/icons/PriorityHigh";
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";
import Close from "@material-ui/icons/Close";
import Favorite from "@material-ui/icons/Favorite";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import InfoIcon from "@material-ui/icons/Info";
/**
 * import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
 */
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Pagination from "components/Pagination/Pagination.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import NavPills from "components/NavPills/NavPills.js";
import Timeline from "components/Timeline/Timeline.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { setUserInfo } from '../../store/actions/authActions';

import { widgetStories, bugs, website, server } from "variables/general.js";

import styles from "assets/jss/material-dashboard-pro-react/views/buttonsStyle.js";
import styles2 from "assets/jss/material-dashboard-pro-react/modalStyle.js";
import api from "api";
import { MenuItem, Select, Snackbar } from "@material-ui/core";
import styles3 from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";

import noticeModal1 from "assets/img/card-1.jpeg";
import noticeModal2 from "assets/img/card-2.jpeg";

const useStyles3 = makeStyles(styles3);
const useStyles = makeStyles(styles);

const useStyles2 = makeStyles(styles2);
//charts(FusionCharts);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});
const INTERVAL_RANGES = {
  '1d': ['1m', '2m', '5m', '15m', '60m', '1d'],
  '5d': ['5m', '15m', '60m', '1d'],
  '1mo': ['15m', '60m', '1d'],
  '3mo': ['60m', '1d'],
  '6mo': ['60m', '1d'],
  '1y': ['1d'],
  '2y': ['1d'],
  '5y': ['1d'],
  '10y': ['1d'],
  'ytd': ['1d'],
  'max': ['1d'],
}
const StockGraph = ({ user, setUserInfo }) => {
  const CATEGORIES = [{
    name: 'Stocks',
    type: 'stock',
  }, {
    name: 'Cryptocurrency',
    type: 'crypto',
  }, {
    name: 'Commodities',
    type: 'commodities'
  }]
  const [notificationMessage, setNotificationMessage] = React.useState('');
  const [notificationType, setNotificationType] = React.useState('');
  const [showNotification, setShowNotification] = React.useState(false);
  const [category, setCategory] = React.useState('stock');
  const [modalBuy, setModalBuy] = React.useState(false);
  const [modalSell, setModalSell] = React.useState(false);
  const [stockInfo, setStockInfo] = React.useState({});
  const [stockList, setStockList] = React.useState([]);
  const [allData, setAllData] = React.useState([]);
  const classes = useStyles();
  const classes2 = useStyles2();
  const classes3 = useStyles3();
  const [selectedStock, setSelectedStock] = React.useState('');
  const [stockName, setStockName] = React.useState('');
  const [range, setRange] = React.useState('1d');
  const [availableRanges, setAvailableRanges] = React.useState(['1d']);
  const [loading, setLoading] = React.useState(false);
  const [interval, setInterval] = React.useState('1m')
  const [stockValue, setStockValue] = React.useState();
  const [intervalRanges, setIntervalRanges] = React.useState([
    '1m', '2m', '5m', '15m', '60m', '1d',
  ])
  const [buyValue, setBuyValue] = React.useState(0);
  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };
  const handleBuy = (e) => {

    if (!user) return;
    if (!verifyNumber(e.target.value)) return;
    let value = e.target.value;
    
    if (parseFloat(user.balance) < value) {
      setBuyValue(parseFloat(user.balance).toFixed(2));
    } else {
     
      if (value[0] === '0')
        value = value.replace('0', '')

      setBuyValue(value);
    }

  }

  const triggerNotification = (msg, type) => {
    setNotificationMessage(msg);
    setNotificationType(type)
    setShowNotification(true);
    setTimeout(function () {
      setShowNotification(false);
    }, 6000);
  }

  const handleConfirm = async (type) => {
    const data = new FormData();
    data.set('symbol', selectedStock);
    data.set('name', stockName);
    data.set('investType', category);
    data.set('investmentAmount', buyValue);
    data.set('investCurrency', user.currency.code);
    data.set('type', type);
    const response = await api.invest(data);
    triggerNotification('Successfully purchased!', 'info');
    user.balance = response.data.balance;
    setUserInfo(user);
  }
  /**
   * const [dataSource, setDataSource] = React.useState({
    chart: {
      caption: stockName,
      yaxisname: "Stock value",
      subcaption: stockName,
      legendposition: "Right",
      drawanchors: "0",
      showvalues: "0",
      plottooltext: "<b>$dataValue</b>$ on $label",
      theme: "fusion"
    },
    data: []
  })
   */
  React.useEffect(() => {
    getAllStocks();
  }, [])
  const getAllStocks = async () => {
    try {
      const allStocksResponse = await api.getStockList();
      setAllData(allStocksResponse.data.data);
      setStockList([...allStocksResponse.data.data[0].data]);
      setSelectedStock(allStocksResponse.data.data[0].data[0].symbol);
      setStockName(allStocksResponse.data.data[0].longName)
    } catch (err) {

    }
  }
  const getStock = async () => {
    try {
      setLoading(true)
      const response = await api.getStockInfo(selectedStock, range, interval);
      const chartData = { series: [response.data.data.chart.result[0].indicators.quote[0].open], labels: [] };
      chartData.series = [chartData.series[0].map((element, i) => {
        return { value: element ? element.toFixed(2) : element, date:response.data.data.chart.result[0].timestamp[i] * 1000,  meta: `${moment(response.data.data.chart.result[0].timestamp[i] * 1000).format('MMMM Do YYYY, h:mm a')}` }
      })];
      const [currentValue] = chartData.series[0].slice(-1);
      /**
       *  setDataSource({...dataSource, 
        caption: stockName,
        data: chartData.series[0]})
       */
      
      setStockValue(response.data.data.chart.result[0].meta.regularMarketPrice);
      setAvailableRanges([...response.data.data.chart.result[0].meta.validRanges]);
      setStockInfo(chartData);
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }
  React.useEffect(() => {
    if (selectedStock) {
      getStock();
      const currentStock = stockList.find(stock => stock.symbol === selectedStock);
      setStockName(currentStock.longName);
    }
  }, [selectedStock, range, interval]);

  React.useEffect(() => {
    const categoryData = allData.find(dataset => dataset.type === category);
    if (categoryData) {
      setStockList(categoryData.data);
      setSelectedStock(categoryData.data[0].symbol);
      setStockName(categoryData.data[0].longName);
    }

  }, [category])

  const handleRangeChange = (value) => {
    setRange(value);
    setIntervalRanges(INTERVAL_RANGES[value])
    if (INTERVAL_RANGES[value] && INTERVAL_RANGES[value].length && !INTERVAL_RANGES[value].includes(interval)) {
      setInterval(INTERVAL_RANGES[value][0]);
    }
  }
  return (
    <React.Fragment>
      <Snackbar
        place="tr"
        color={notificationType}

        message={notificationMessage}
        open={showNotification}
        closeNotification={() => setShowNotification(false)}
        close
      />
      <Card style={{ backgroundColor: "rgba(32,32,32, 1)", color: "white !important"}}>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={10}>
              <Card style={{ padding: '10px' }} chart color='rose'>
                <CardHeader color='rose' icon>
                  <Select className="custom-select1" value={category} onChange={e => setCategory(e.target.value)} style={{ width: '10%', marginRight: '20px' }}>
                    <MenuItem
                      selected
                      disabled
                      classes={{
                        root: classes.selectMenuItem
                      }}
                    >
                      Select Category
                      </MenuItem>
                    {CATEGORIES.map(category => {
                      return <MenuItem classes={{
                        root: classes.selectMenuItem
                      }}
                        value={category.type}
                        key={category.type}
                      >
                        {category.name}
                      </MenuItem>
                    })}

                  </Select>
                  <Select className="custom-select1" value={selectedStock} onChange={e => setSelectedStock(e.target.value)} style={{ width: '30%', marginRight: '20px', borderBottomColor: 'white', color: 'white' }}>
                    <MenuItem
                      selected
                      disabled
                      classes={{
                        root: classes.selectMenuItem
                      }}
                    >
                      Select Stock
                      </MenuItem>
                    {stockList.map(stock => {
                      return <MenuItem classes={{
                        root: classes.selectMenuItem
                      }}
                        value={stock.symbol}
                        key={stock.symbol}
                        id={stock.longName}
                      >
                        {stock.longName}
                      </MenuItem>
                    })}

                  </Select>
                  <Select className="custom-select1" value={range} onChange={e => handleRangeChange(e.target.value)} style={{ width: '10%', marginRight: '20px' }}>
                    <MenuItem
                      selected
                      disabled
                      classes={{
                        root: classes.selectMenuItem
                      }}
                    >
                      Select Range
                      </MenuItem>
                    {availableRanges.map(range => {
                      return <MenuItem classes={{
                        root: classes.selectMenuItem
                      }}
                        value={range}
                        key={range}
                      >
                        {range}
                      </MenuItem>
                    })}

                  </Select>
                  <Select className="custom-select1" value={interval} onChange={e => setInterval(e.target.value)} style={{ width: '10%' }}>
                    <MenuItem
                      selected
                      disabled
                      classes={{
                        root: classes.selectMenuItem
                      }}
                    >
                      Select Interval
                      </MenuItem>
                    {intervalRanges.map(range => {
                      return <MenuItem classes={{
                        root: classes.selectMenuItem
                      }}
                        value={range}
                        key={range}
                      >
                        {range}
                      </MenuItem>
                    })}

                  </Select>

                </CardHeader>

                {loading ? <div style={{ height: '70vh', justifyContent: 'center', alignItems: 'center', display: 'flex', fontSize: '24px' }} >Loading...</div> :

                  <ChartistGraph
                    style={{ height: '70vh', position: 'relative' }}
                    className="ct-chart-white-colors"
                    data={stockInfo}
                    type='Line'
                    options={straightLinesChart.options}
                    listener={straightLinesChart.animation}
                  />}
              </Card>
            </GridItem>
            <GridItem xs={12} sm={2}>
              <Card style={{ backgroundColor: "rgba(32,32,32, 1)", color: "white !important"}}>
                <CardHeader color='rose' icon>
                  <CardIcon color='rose'>
                    <InfoIcon />
                  </CardIcon>
                </CardHeader>
                <CardBody>
                  <GridContainer
                    justify='center'
                    alignItems='center'
                    style={{ height: "100%" }}
                  >
                    <GridItem xs={12} style={{ textAlign: 'center' }}>
                      <h3 style={{ color: 'white'}}
                        className={`${classes.cardTitle} ${classes.marginTop30}`}
                      >
                        {loading ? 'Loading...' : `${stockValue ? stockValue : 'Market Closed'} ${user.currency ? (stockValue ? user.currency.symbol : '') : ''}`}
                      </h3>
                      <p style={{ color: 'white'}} className={classes.cardDescription}>
                        {loading ? 'Loading...' : `Current stock value of ${stockName}`}
                      </p>
                    </GridItem>
                    <GridItem
                      xs={6}
                      sm={12}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Button
                        disabled={loading || !stockValue}
                        onClick={() => setModalBuy(true)}
                        color='success'
                        style={{ width: "100%", maxWidth: "150px" }}
                      >
                        Buy
                      </Button>
                    </GridItem>
                    <GridItem
                      xs={6}
                      sm={12}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Button
                        disabled={loading || !stockValue}
                        onClick={() => setModalSell(true)}
                        color='danger'
                        style={{ width: "100%", maxWidth: "150px" }}
                      >
                        Sell
                      </Button>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
       </GridContainer>
        </CardBody>
      </Card>


      <Dialog
        classes={{
          root: classes2.center,
          paper: classes2.modal,
        }}
        open={modalBuy}
        transition={Transition}
        keepMounted
        onClose={() => setModalBuy(false)}
        aria-labelledby='modal-slide-title'
        aria-describedby='modal-slide-description'
      >
        <DialogTitle
          id='classic-modal-slide-title'
          disableTypography
          className={classes2.modalHeader}
        >
          <Button
            justIcon
            className={classes2.modalCloseButton}
            key='close'
            aria-label='Close'
            color='transparent'
            onClick={() => setModalBuy(false)}
          >
            <Close className={classes2.modalClose} />
          </Button>
          <h4 className={classes2.modalTitle}>
            Buy stock
          </h4>
        </DialogTitle>
        <DialogContent
          id='modal-slide-description1'
          className={classes2.modalBody}
        >
          <GridContainer>
            <GridItem xs={12} sm={12}>
              <h4 className={classes2.modalTitle}>
                Your balance is: {user.balance ? parseFloat(user.balance).toFixed(2) : 0}
              </h4>
            </GridItem>
            <GridItem xs={12} sm={12}>
              <CustomInput
                labelText='Amount'
                id='floatBuyAmount'
                value={buyValue}
                formControlProps={{
                  fullWidth: true,
                  onChange: handleBuy,
                  value: buyValue
                }}
              />
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions
          className={classes2.modalFooter + " " + classes2.modalFooterCenter}
        >
          <Button onClick={() => setModalBuy(false)}>Never Mind</Button>
          <Button onClick={() => { setModalBuy(false); handleConfirm('buy') }} color='success'>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        classes={{
          root: classes2.center,
          paper: classes2.modal,
        }}
        open={modalSell}
        transition={Transition}
        keepMounted
        onClose={() => setModalSell(false)}
        aria-labelledby='modal-slide-title'
        aria-describedby='modal-slide-description'
      >
        <DialogTitle
          id='classic-modal-slide-title'
          disableTypography
          className={classes2.modalHeader}
        >
          <Button
            justIcon
            className={classes2.modalCloseButton}
            key='close'
            aria-label='Close'
            color='transparent'
            onClick={() => setModalSell(false)}
          >
            <Close className={classes2.modalClose} />
          </Button>
          <h4 className={classes2.modalTitle}>
            Sell Stock
          </h4>
        </DialogTitle>
        <DialogContent
          id='modal-slide-description2'
          className={classes2.modalBody}
        >
          <GridContainer>
            <GridItem xs={12} sm={12}>
              <h4 className={classes2.modalTitle}>
                Your balance is: {user.balance ? parseFloat(user.balance).toFixed(2) : 0}
              </h4>
              <CustomInput
                labelText='Amount'
                id='floatSellAmount'
                value={buyValue}
                formControlProps={{
                  fullWidth: true,
                  onChange: handleBuy,
                  value: buyValue
                }}
              />
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions
          className={classes2.modalFooter + " " + classes2.modalFooterCenter}
        >
          <Button onClick={() => setModalSell(false)}>Never Mind</Button>
          <Button onClick={() => { setModalSell(false); handleConfirm('sell') }} color='danger'>
            Sell
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
const connectState = (state) => {
  return {
    user: state.auth.user
  }
}
const connectDispatch = (dispatch) => {
  return {
    setUserInfo: (user, token) => { dispatch(setUserInfo(user, token)) }
  }
}
export default connect(connectState, connectDispatch)(StockGraph);