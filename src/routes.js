import Buttons from "views/Components/Buttons.js";
import Calendar from "views/Calendar/Calendar.js";
import Charts from "views/Charts/Charts.js";
import Dashboard from "views/Dashboard/Dashboard.js";
import ErrorPage from "views/Pages/ErrorPage.js";
import ExtendedForms from "views/Forms/ExtendedForms.js";
import ExtendedTables from "views/Tables/ExtendedTables.js";
import FullScreenMap from "views/Maps/FullScreenMap.js";
import GoogleMaps from "views/Maps/GoogleMaps.js";
import GridSystem from "views/Components/GridSystem.js";
import Icons from "views/Components/Icons.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";
import LoginPage from "views/Pages/LoginPage.js";
import Notifications from "views/Components/Notifications.js";
import Panels from "views/Components/Panels.js";
import PricingPage from "views/Pages/PricingPage.js";
import RTLSupport from "views/Pages/RTLSupport.js";
import ReactTables from "views/Tables/ReactTables.js";
import RegisterPage from "views/Pages/RegisterPage.js";
import RegularForms from "views/Forms/RegularForms.js";
import RegularTables from "views/Tables/RegularTables.js";
import SweetAlert from "views/Components/SweetAlert.js";
import TimelinePage from "views/Pages/Timeline.js";
import Typography from "views/Components/Typography.js";
import UserProfile from "views/Pages/UserProfile.js";
import ValidationForms from "views/Forms/ValidationForms.js";
import VectorMap from "views/Maps/VectorMap.js";
import Widgets from "views/Widgets/Widgets.js";
import Wizard from "views/Forms/Wizard.js";
import Stock from "views/Stock/Stock.js";

// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRange from "@material-ui/icons/DateRange";
import GridOn from "@material-ui/icons/GridOn";
import Image from "@material-ui/icons/Image";
import Place from "@material-ui/icons/Place";
import Timeline from "@material-ui/icons/Timeline";
import WidgetsIcon from "@material-ui/icons/Widgets";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import ConfirmPage from "views/Pages/ConfirmPage";
import UserIcon from '@material-ui/icons/Face';
import UsersPage from "views/Pages/UsersPage";
import EditProfile from "views/Pages/EditProfile";
import PriceChangePage from "views/Pages/PriceChangePage";
import ForgotPassword from "views/Pages/ForgotPassword";
import Reset from "views/Pages/Reset";
import { AccountBalance, AccountBalanceWallet, AttachMoney, Gavel } from "@material-ui/icons";
import TransactionsPage from "views/Pages/TransactionsPage";
import InvestmentsPage from "views/Pages/InvestmentsPage";
import RobotPage from "views/Pages/RobotPage";
import UserInvestments from "views/Pages/UserInvestments";

var dashRoutes = [
  {
    path: "/users",
    name: "Users",
    rtlName: "???????? ??????????????",
    icon: UserIcon,
    component: UsersPage,
    layout: "/dashboard",
    adminOnly: true
  },
  {
    path: "/prices",
    name: "Price change",
    rtlName: "???????? ??????????????",
    icon: AttachMoney,
    component: PriceChangePage,
    layout: "/dashboard",
    adminOnly: true
  },
  {
    path: "/transactions",
    name: "Transactions",
    icon: AccountBalance,
    component: TransactionsPage,
    layout: "/dashboard",
  },
  {
    path: "/trader",
    name: "AI Trading",
    icon: Gavel,
    component: RobotPage,
    layout: "/dashboard",
  },
  {
    path: "/investments",
    name: "Investments",
    icon: AccountBalanceWallet,
    component: InvestmentsPage,
    layout: "/dashboard"
  },
  {
    path: "/stocks",
    name: "Stock info",
    rtlName: "???????? ??????????????",
    icon: ShowChartIcon,
    component: Stock,
    layout: "/dashboard",
  },
  {
    path: "/user-investments",
    name: "User investments",
    component: UserInvestments,
    layout: "/dashboard",
    hidden: true,
    adminOnly: true
  },
  {
    path: "/edit-profile",
    name: "Edit Profile",
    component: EditProfile,
    layout: "/dashboard",
    hidden: true
  },
  {
    collapse: true,
    name: "Pages",
    rtlName: "??????????",
    icon: Image,
    state: "pageCollapse",
    hidden: true,
    views: [
      {
        path: "/pricing-page",
        name: "Pricing Page",
        rtlName: "????????????????",
        mini: "PP",
        rtlMini: "??",
        component: PricingPage,
        layout: "/auth",
      },
      {
        path: "/rtl-support-page",
        name: "RTL Support",
        rtlName: "?????????? ??????",
        mini: "RS",
        rtlMini: "????",
        component: RTLSupport,
        layout: "/rtl",
      },
      {
        path: "/timeline-page",
        name: "Timeline Page",
        rtlName: "???????????????? ????????????",
        mini: "T",
        rtlMini: "????",
        component: TimelinePage,
        layout: "/dashboard",
      },
      {
        path: "/login-page",
        name: "Login Page",
        rtlName: "?????????????????? ????????????",
        mini: "L",
        rtlMini: "????????",
        component: LoginPage,
        layout: "/auth",
      },
      {
        path: "/forgot-password",
        name: "Password reset page",
        rtlName: "?????????????????? ????????????",
        mini: "L",
        rtlMini: "????????",
        component: ForgotPassword,
        layout: "/auth",
      },
      {
        path: "/confirm",
        name: "Confirm Page",
        rtlName: "?????????????????? ????????????",
        mini: "L",
        rtlMini: "????????",
        component: ConfirmPage,
        layout: "/auth",
      },
      {
        path: "/register-page",
        name: "Register Page",
        rtlName: "??????????",
        mini: "R",
        rtlMini: "????",
        component: RegisterPage,
        layout: "/auth",
      },
      {
        path: "/reset",
        name: "Reset Page",
        rtlName: "??????????",
        mini: "R",
        rtlMini: "????",
        component: Reset,
        layout: "/auth",
      },
      {
        path: "/lock-screen-page",
        name: "Lock Screen Page",
        rtlName: "???????? ????????????",
        mini: "LS",
        rtlMini: "????????",
        component: LockScreenPage,
        layout: "/auth",
      },
      {
        path: "/user-page",
        name: "User Profile",
        rtlName: "?????? ???????????? ????????????????",
        mini: "UP",
        rtlMini: "????",
        component: UserProfile,
        layout: "/dashboard",
      },
      {
        path: "/error-page",
        name: "Error Page",
        rtlName: "???????? ??????????",
        mini: "E",
        rtlMini: "????????????",
        component: ErrorPage,
        layout: "/auth",
      },
    ],
  },
  {
    collapse: true,
    name: "Components",
    rtlName: "????????????????",
    icon: Apps,
    state: "componentsCollapse",
    hidden: true,
    views: [
      {
        collapse: true,
        name: "Multi Level Collapse",
        rtlName: "???????????? ?????????? ??????????????????",
        mini: "MC",
        rtlMini: "??",
        state: "multiCollapse",
        views: [
          {
            path: "/buttons",
            name: "Buttons",
            rtlName: "????????",
            mini: "B",
            rtlMini: "??",
            component: Buttons,
            layout: "/dashboard",
          },
        ],
      },
      {
        path: "/buttons",
        name: "Buttons",
        rtlName: "????????",
        mini: "B",
        rtlMini: "??",
        component: Buttons,
        layout: "/dashboard",
      },
      {
        path: "/grid-system",
        name: "Grid System",
        rtlName: "???????? ????????????",
        mini: "GS",
        rtlMini: "????",
        component: GridSystem,
        layout: "/dashboard",
      },
      {
        path: "/panels",
        name: "Panels",
        rtlName: "??????????",
        mini: "P",
        rtlMini: "??",
        component: Panels,
        layout: "/dashboard",
      },
      {
        path: "/sweet-alert",
        name: "Sweet Alert",
        rtlName: "?????????? ??????????",
        mini: "SA",
        rtlMini: "??????",
        component: SweetAlert,
        layout: "/dashboard",
      },
      {
        path: "/notifications",
        name: "Notifications",
        rtlName: "??????????????",
        mini: "N",
        rtlMini: "??",
        component: Notifications,
        layout: "/dashboard",
      },
      {
        path: "/icons",
        name: "Icons",
        rtlName: "????????????",
        mini: "I",
        rtlMini: "??",
        component: Icons,
        layout: "/dashboard",
      },
      {
        path: "/typography",
        name: "Typography",
        rtlName: "??????????",
        mini: "T",
        rtlMini: "??",
        component: Typography,
        layout: "/dashboard",
      },
    ],
  },
  {
    collapse: true,
    name: "Forms",
    rtlName: "????????????????",
    icon: "content_paste",
    state: "formsCollapse",
    hidden: true,
    views: [
      {
        path: "/regular-forms",
        name: "Regular Forms",
        rtlName: "?????????? ??????????",
        mini: "RF",
        rtlMini: "????",
        component: RegularForms,
        layout: "/dashboard",
      },
      {
        path: "/extended-forms",
        name: "Extended Forms",
        rtlName: "?????????? ??????????",
        mini: "EF",
        rtlMini: "??????",
        component: ExtendedForms,
        layout: "/dashboard",
      },
      {
        path: "/validation-forms",
        name: "Validation Forms",
        rtlName: "?????????? ???????????? ???? ??????????",
        mini: "VF",
        rtlMini: "????",
        component: ValidationForms,
        layout: "/dashboard",
      },
      {
        path: "/wizard",
        name: "Wizard",
        rtlName: "????????",
        mini: "W",
        rtlMini: "??",
        component: Wizard,
        layout: "/dashboard",
      },
    ],
  },
  {
    collapse: true,
    name: "Tables",
    rtlName: "??????????????",
    icon: GridOn,
    state: "tablesCollapse",
    hidden: true,
    views: [
      {
        path: "/regular-tables",
        name: "Regular Tables",
        rtlName: "???????????? ??????????",
        mini: "RT",
        rtlMini: "????",
        component: RegularTables,
        layout: "/dashboard",
      },
      {
        path: "/extended-tables",
        name: "Extended Tables",
        rtlName: "?????????? ??????????",
        mini: "ET",
        rtlMini: "??????",
        component: ExtendedTables,
        layout: "/dashboard",
      },
      {
        path: "/react-tables",
        name: "React Tables",
        rtlName: "???? ?????? ??????????????",
        mini: "RT",
        rtlMini: "????",
        component: ReactTables,
        layout: "/dashboard",
      },
    ],
  },
  {
    collapse: true,
    name: "Maps",
    rtlName: "??????????",
    icon: Place,
    state: "mapsCollapse",
    hidden: true,
    views: [
      {
        path: "/google-maps",
        name: "Google Maps",
        rtlName: "?????????? ????????",
        mini: "GM",
        rtlMini: "????",
        component: GoogleMaps,
        layout: "/dashboard",
      },
      {
        path: "/full-screen-maps",
        name: "Full Screen Map",
        rtlName: "?????????? ?????????? ????????????",
        mini: "FSM",
        rtlMini: "??????",
        component: FullScreenMap,
        layout: "/dashboard",
      },
      {
        path: "/vector-maps",
        name: "Vector Map",
        rtlName: "?????????? ????????????",
        mini: "VM",
        rtlMini: "????",
        component: VectorMap,
        layout: "/dashboard",
      },
    ],
  },
  {
    path: "/widgets",
    name: "Widgets",
    rtlName: "????????????????",
    icon: WidgetsIcon,
    component: Widgets,
    layout: "/dashboard",
    hidden: true,
  },
  {
    path: "/charts",
    name: "Charts",
    rtlName: "???????????? ????????????????",
    icon: Timeline,
    component: Charts,
    layout: "/dashboard",
    hidden: true,
  },
  {
    path: "/calendar",
    name: "Calendar",
    rtlName: "??????????????",
    icon: DateRange,
    component: Calendar,
    layout: "/dashboard",
    hidden: true,
  },
];
export default dashRoutes;
