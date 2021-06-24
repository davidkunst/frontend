import React, { useEffect } from "react";

import "./css/bootstrap.css";

import banner from "./images/banner2.jpg";
import video from "./videos/finance-background.mp4";
import logo from "./images/aitradingsoftwarelogo.png";
import about from "./images/about.jpg";
import planning1 from "./images/planning.jpg";
import planning2 from "./images/planning02.jpg";
import planning3 from "./images/planning04.jpg";
import quote from "./images/quote.png";
import phone from "./images/icon11.png";
import message from "./images/icon12.png";
import location from "./images/icon13.png";


import { Link } from "react-router-dom";

const LandingPage = () => {
  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    fetchUsers();
    if (performance.navigation.type == 2) {
      location.reload(true);
    }
  }, []);
  const fetchUsers = async () => {
    try {
      const res = await fetch("https://randomuser.me/api/?results=5")
        .then((res) => res.json())
        .then((data) =>
          setUsers(
            data.results.map((user) => {
              user.profit = getRandomArbitrary(58, 12312);
              user.percent = getRandomArbitrary(5, 100);
              return user;
            })
          )
        );
      setTimeout(() => {
        changeAmounts();
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    if (users.length)
      setTimeout(() => {
        changeAmounts();
      }, 2000);
  }, [users]);
  const changeAmounts = () => {
    const newUsers = users.map((user) => {
      const newProfit = getRandomArbitrary(-12, 42);
      user.profit += newProfit;
      //user.percent += newProfit > 0 ? getRandomArbitrary(0, 1) : getRandomArbitrary(-1, 0);
      return user;
    });
    setUsers(newUsers);
  };
  const getRandomArbitrary = (min, max) => {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100;
  };
  return (
    <React.Fragment>
      <div
        className="navbar custom-navbar wow fadeInDown"
        data-wow-duration="2s"
        role="navigation"
        id="header"
      >
        <div className="header">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-3">
                <div className="logo">
                  <img style={{ height: "75px" }} src={logo} alt="" />
                </div>
                <div className="navbar-header">
                  <button
                    type="button"
                    className="navbar-toggle"
                    data-toggle="collapse"
                    data-target=".navbar-collapse"
                  >
                    {" "}
                    <span className="sr-only">Toggle navigation</span>{" "}
                    <span className="icon-bar"></span>{" "}
                    <span className="icon-bar"></span>{" "}
                    <span className="icon-bar"></span>{" "}
                  </button>
                </div>
              </div>
              <div className="col-md-9 col-sm-9">
                <div className="navigationwrape">
                  <div className="navbar navbar-default" role="navigation">
                    <div className="navbar-collapse collapse">
                      <ul className="nav navbar-nav">
                        <li>
                          <Link className="smoothScroll" to="/auth/login-page">
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="smoothScroll"
                            to="/auth/register-page"
                          >
                            Register
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "1px solid white",
                  padding: "0",
                }}
                className="col-md-12 col-sm-12 hide-mobile"
              >
                {users.map((user) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "white",
                      }}
                      key={user.email}
                    >
                      <h5 style={{ fontSize: 11, marginRight: "10px" }}>
                        {user.name.first[0] + "." + user.name.last[0] + "."} (
                        {user.location.country})
                      </h5>
                      <h5
                        style={{
                          fontSize: 11,
                          color: "green",
                          fontWeight: 600,
                        }}
                      >
                        {user.profit.toLocaleString()}${" "}
                        {/** ({user.percent}%) */}
                      </h5>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="video">
        <div className="videohover hero-wrapper videoWrp">
          <div
            className="hero-image"
            style={{ backgroundImage: `url('${banner}')` }}
          >
            <video autoPlay muted="" poster="" id="bgvid" loop>
              <source src={video} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="slider-wrap staticSlide videoWrp" id="home">
          <div className="container">
            <div className="banner-info videoslider">
              <div className="banner-head">Welcome to AI Trading Software</div>
              <h2>
                The Future of <span>Trading</span>
              </h2>
              <p
                style={{
                  padding: 0,
                  width: "80%",
                  maxWidth: 500,
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                The investment decisions made by AI will be calculated, accurate
                and unbiased unlike those made by humans
              </p>
              <div className="readmore">
                <Link to="/auth/login-page">Get started</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="welcome-wrap" id="about">
        <div className="container">
          <div className="col-md-6">
            <div className="welcome-info welcome-right">
              <h1>
                Welcome to <span>AI Trading Software</span>
              </h1>
              <h3>The future of trade brought to your home.</h3>
              <p>
                The new generation of trading algorithms will incorporate AI
                which will enable them to learn from the trading logs of
                millions of historical orders and figure out the best way to
                execute new orders entered into the system. This is accomplished
                by using machine learning techniques that detect a pattern in
                the data and make predictions.
              </p>
              <div className="readmore">
                <Link to="/auth/register-page">Sign up</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="welcomeImg">
              <img src={about} alt="" />
            </div>
          </div>
          <div className="clearfix"></div>
          <br />
        </div>
      </div>

      {/* <div id="counter">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-3 col-xs-12 counter-item">
              <div className="counterbox">
                <div className="counter-icon"><i className="fa fa-users" aria-hidden="true"></i></div>
                <span className="counter-number" data-from="1" data-to="100" data-speed="1000">100+</span> <span className="counter-text">Happy Client</span> </div>
            </div>
            <div className="col-md-3 col-sm-3 col-xs-12 counter-item">
              <div className="counterbox">
                <div className="counter-icon"><i className="fa fa-code" aria-hidden="true"></i></div>
                <span className="counter-number" data-from="1" data-to="8312" data-speed="2000">8312</span> <span className="counter-text">Code Line</span> </div>
            </div>
            <div className="col-md-3 col-sm-3 col-xs-12 counter-item">
              <div className="counterbox">
                <div className="counter-icon"><i className="fa fa-laptop" aria-hidden="true"></i></div>
                <span className="counter-number" data-from="1" data-to="1632" data-speed="3000">1632</span> <span className="counter-text">Project Finished</span> </div>
            </div>
            <div className="col-md-3 col-sm-3 col-xs-12 counter-item">
              <div className="counterbox">
                <div className="counter-icon"><i className="fa fa-trophy" aria-hidden="true"></i></div>
                <span className="counter-number" data-from="1" data-to="206" data-speed="4000">206</span> <span className="counter-text">Awards</span> </div>
            </div>
          </div>
        </div>
      </div> */}

      <div style={{ backgroundColor: "white", paddingTop: "55px"}}>
      <h1 style={{ color: "black" }}>
            AI <span>Robot</span>
          </h1>
        <p
          style={{
            textAlign: "center",
            backgroundColor: "white",
            paddingRight: "5%",
            paddingLeft: "5%",
            color: "#3F3F3F",
            fontSize: "15px",
            marginBottom: 0,
          }}
        >
          The investment decisions made by AI will be <b>calculated</b>,{" "}
          <b>accurate</b> and <b>unbiased</b> unlike those made by humans, who
          are supposedly too emotional for the stock market. The new generation
          of trading algorithms will incorporate AI which will enable them to
          learn from the trading logs of millions of historical orders and
          figure out the best way to execute new orders entered into the system.
          <br/>
          This is accomplished by using machine learning techniques that detect
          a pattern in the data and make predictions. Last year, it was
          estimated that 75% of global trade is handled by algorithms. This
          number is only expected to grow as startups and established businesses
          alike gradually implement AI as a financial tool. Artificial
          intelligence and machine learning is being implemented in trading and
          investments to better predict markets and execute trades at optimal
          times. AI use's algorithms to automatically buy and sell stocks and
          use pattern detection to monitor and predict the overall future health
          of global financial markets. There's no shortage of data these days,
          and a lot of it can provide keen economic insights. The challenge is
          deciphering what's relevant and what's not. 
          <br/>
          That's where machine
          learning comes in handy. In financial trading, it's used to parse
          massive piles of market data, find correlated patterns and apply
          mathematical analysis to predict where markets are heading. In some
          cases, trades are made almost instantly without human intervention. AI
          makes a real difference in financial trading by mining important data
          and providing cheap and easily available tools that benefit everyone,
          not just corporate.
        </p>
      </div>

      <div
        className="services-wrap"
        id="service"
        style={{ backgroundColor: "white" }}
      >
        <div className="container">
          <h1 style={{ color: "black" }}>
            <span>Services</span>
          </h1>
          <div className="row serviceWrp">
            <div className="col-md-4 item">
              <div className="serviceImg">
                <img alt="" src={planning1} />
              </div>
              <div className="serviceList">
                <h3>
                  <a href="auth/login-page">Stock</a>
                </h3>
                <p>
                  AI software will do precise mathematical calculations to trade stocks which offer the highest growth.
                </p>
                <div className="readmore">
                  <a href="auth/login-page">
                    Read More{" "}
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 item">
              <div className="serviceImg">
                <img alt="" src={planning2} />
              </div>
              <div className="serviceList">
                <h3>
                  <a href="auth/login-page">Commodities</a>
                </h3>
                <p>Trade commodities which predict increase in value and sell just before it declines.</p>
                <div className="readmore">
                  <a href="auth/login-page">
                    Read More{" "}
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 item">
              <div className="serviceImg">
                <img alt="" src={planning3} />
              </div>
              <div className="serviceList">
                <h3>
                  <a href="auth/login-page">Cryptocurrencies</a>
                </h3>
                <p>
                  AI software examines the market about every cryptocurrency and invests in one which offer the most growth.
                </p>
                <div className="readmore">
                  <a href="auth/login-page">
                    Read More{" "}
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-12" style={{marginTop: '20px', marginBottom: '20px'}}>
          <div className="card mt-4 border-0 mb-4">
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <div className="card-body d-flex align-items-center c-detail pl-0" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', marginBottom: '10px'}}>
                  <div className="mr-3 align-self-center">
                    <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon1.png"/>
                  </div>
                  <div className="">
                    <h6 className="font-weight-medium" style={{textAlign: 'center'}}>Address</h6>
                    <p className="">601 Sherwood Ave.<br/> San Bernandino</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="card-body d-flex align-items-center c-detail" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', marginBottom: '10px'}}>
                  <div className="mr-3 align-self-center">
                    <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon2.png" />
                  </div>
                  <div className="">
                    <h6 className="font-weight-medium" style={{textAlign: 'center'}}>Phone</h6>
                    <p className="">251 546 9442<br/> 630 446 8851</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="card-body d-flex align-items-center c-detail" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', marginBottom: '10px'}}>
                  <div className="mr-3 align-self-center">
                    <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon3.png" />
                  </div>
                  <div className="">
                    <h6 className="font-weight-medium" style={{textAlign: 'center'}}>Email</h6>
                    <p className="">
                      contact@aitradingrobot.com<br/>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      <div className="copyright" style={{ color: "white" }}>
        ©Copyright 2021 AI Trading Software. All Rights Reserved
      </div>

      <div className="page-scroll scrollToTop">
        <a href="#">
          <i className="fa fa-arrow-up" aria-hidden="true"></i>
        </a>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;