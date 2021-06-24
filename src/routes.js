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
    rtlName: "لوحة القيادة",
    icon: UserIcon,
    component: UsersPage,
    layout: "/dashboard",
    adminOnly: true
  },
  {
    path: "/prices",
    name: "Price change",
    rtlName: "لوحة القيادة",
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
    rtlName: "لوحة القيادة",
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
    rtlName: "صفحات",
    icon: Image,
    state: "pageCollapse",
    hidden: true,
    views: [
      {
        path: "/pricing-page",
        name: "Pricing Page",
        rtlName: "عالتسعير",
        mini: "PP",
        rtlMini: "ع",
        component: PricingPage,
        layout: "/auth",
      },
      {
        path: "/rtl-support-page",
        name: "RTL Support",
        rtlName: "صودعم رتل",
        mini: "RS",
        rtlMini: "صو",
        component: RTLSupport,
        layout: "/rtl",
      },
      {
        path: "/timeline-page",
        name: "Timeline Page",
        rtlName: "تيالجدول الزمني",
        mini: "T",
        rtlMini: "تي",
        component: TimelinePage,
        layout: "/dashboard",
      },
      {
        path: "/login-page",
        name: "Login Page",
        rtlName: "هعذاتسجيل الدخول",
        mini: "L",
        rtlMini: "هعذا",
        component: LoginPage,
        layout: "/auth",
      },
      {
        path: "/forgot-password",
        name: "Password reset page",
        rtlName: "هعذاتسجيل الدخول",
        mini: "L",
        rtlMini: "هعذا",
        component: ForgotPassword,
        layout: "/auth",
      },
      {
        path: "/confirm",
        name: "Confirm Page",
        rtlName: "هعذاتسجيل الدخول",
        mini: "L",
        rtlMini: "هعذا",
        component: ConfirmPage,
        layout: "/auth",
      },
      {
        path: "/register-page",
        name: "Register Page",
        rtlName: "تسجيل",
        mini: "R",
        rtlMini: "صع",
        component: RegisterPage,
        layout: "/auth",
      },
      {
        path: "/reset",
        name: "Reset Page",
        rtlName: "تسجيل",
        mini: "R",
        rtlMini: "صع",
        component: Reset,
        layout: "/auth",
      },
      {
        path: "/lock-screen-page",
        name: "Lock Screen Page",
        rtlName: "اقفل الشاشة",
        mini: "LS",
        rtlMini: "هذاع",
        component: LockScreenPage,
        layout: "/auth",
      },
      {
        path: "/user-page",
        name: "User Profile",
        rtlName: "ملف تعريفي للمستخدم",
        mini: "UP",
        rtlMini: "شع",
        component: UserProfile,
        layout: "/dashboard",
      },
      {
        path: "/error-page",
        name: "Error Page",
        rtlName: "صفحة الخطأ",
        mini: "E",
        rtlMini: "البريد",
        component: ErrorPage,
        layout: "/auth",
      },
    ],
  },
  {
    collapse: true,
    name: "Components",
    rtlName: "المكونات",
    icon: Apps,
    state: "componentsCollapse",
    hidden: true,
    views: [
      {
        collapse: true,
        name: "Multi Level Collapse",
        rtlName: "انهيار متعدد المستويات",
        mini: "MC",
        rtlMini: "ر",
        state: "multiCollapse",
        views: [
          {
            path: "/buttons",
            name: "Buttons",
            rtlName: "وصفت",
            mini: "B",
            rtlMini: "ب",
            component: Buttons,
            layout: "/dashboard",
          },
        ],
      },
      {
        path: "/buttons",
        name: "Buttons",
        rtlName: "وصفت",
        mini: "B",
        rtlMini: "ب",
        component: Buttons,
        layout: "/dashboard",
      },
      {
        path: "/grid-system",
        name: "Grid System",
        rtlName: "نظام الشبكة",
        mini: "GS",
        rtlMini: "زو",
        component: GridSystem,
        layout: "/dashboard",
      },
      {
        path: "/panels",
        name: "Panels",
        rtlName: "لوحات",
        mini: "P",
        rtlMini: "ع",
        component: Panels,
        layout: "/dashboard",
      },
      {
        path: "/sweet-alert",
        name: "Sweet Alert",
        rtlName: "الحلو تنبيه",
        mini: "SA",
        rtlMini: "ومن",
        component: SweetAlert,
        layout: "/dashboard",
      },
      {
        path: "/notifications",
        name: "Notifications",
        rtlName: "إخطارات",
        mini: "N",
        rtlMini: "ن",
        component: Notifications,
        layout: "/dashboard",
      },
      {
        path: "/icons",
        name: "Icons",
        rtlName: "الرموز",
        mini: "I",
        rtlMini: "و",
        component: Icons,
        layout: "/dashboard",
      },
      {
        path: "/typography",
        name: "Typography",
        rtlName: "طباعة",
        mini: "T",
        rtlMini: "ر",
        component: Typography,
        layout: "/dashboard",
      },
    ],
  },
  {
    collapse: true,
    name: "Forms",
    rtlName: "إستمارات",
    icon: "content_paste",
    state: "formsCollapse",
    hidden: true,
    views: [
      {
        path: "/regular-forms",
        name: "Regular Forms",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: RegularForms,
        layout: "/dashboard",
      },
      {
        path: "/extended-forms",
        name: "Extended Forms",
        rtlName: "نماذج موسعة",
        mini: "EF",
        rtlMini: "هوو",
        component: ExtendedForms,
        layout: "/dashboard",
      },
      {
        path: "/validation-forms",
        name: "Validation Forms",
        rtlName: "نماذج التحقق من الصحة",
        mini: "VF",
        rtlMini: "تو",
        component: ValidationForms,
        layout: "/dashboard",
      },
      {
        path: "/wizard",
        name: "Wizard",
        rtlName: "ساحر",
        mini: "W",
        rtlMini: "ث",
        component: Wizard,
        layout: "/dashboard",
      },
    ],
  },
  {
    collapse: true,
    name: "Tables",
    rtlName: "الجداول",
    icon: GridOn,
    state: "tablesCollapse",
    hidden: true,
    views: [
      {
        path: "/regular-tables",
        name: "Regular Tables",
        rtlName: "طاولات عادية",
        mini: "RT",
        rtlMini: "صر",
        component: RegularTables,
        layout: "/dashboard",
      },
      {
        path: "/extended-tables",
        name: "Extended Tables",
        rtlName: "جداول ممتدة",
        mini: "ET",
        rtlMini: "هور",
        component: ExtendedTables,
        layout: "/dashboard",
      },
      {
        path: "/react-tables",
        name: "React Tables",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: ReactTables,
        layout: "/dashboard",
      },
    ],
  },
  {
    collapse: true,
    name: "Maps",
    rtlName: "خرائط",
    icon: Place,
    state: "mapsCollapse",
    hidden: true,
    views: [
      {
        path: "/google-maps",
        name: "Google Maps",
        rtlName: "خرائط جوجل",
        mini: "GM",
        rtlMini: "زم",
        component: GoogleMaps,
        layout: "/dashboard",
      },
      {
        path: "/full-screen-maps",
        name: "Full Screen Map",
        rtlName: "خريطة كاملة الشاشة",
        mini: "FSM",
        rtlMini: "ووم",
        component: FullScreenMap,
        layout: "/dashboard",
      },
      {
        path: "/vector-maps",
        name: "Vector Map",
        rtlName: "خريطة المتجه",
        mini: "VM",
        rtlMini: "تم",
        component: VectorMap,
        layout: "/dashboard",
      },
    ],
  },
  {
    path: "/widgets",
    name: "Widgets",
    rtlName: "الحاجيات",
    icon: WidgetsIcon,
    component: Widgets,
    layout: "/dashboard",
    hidden: true,
  },
  {
    path: "/charts",
    name: "Charts",
    rtlName: "الرسوم البيانية",
    icon: Timeline,
    component: Charts,
    layout: "/dashboard",
    hidden: true,
  },
  {
    path: "/calendar",
    name: "Calendar",
    rtlName: "التقويم",
    icon: DateRange,
    component: Calendar,
    layout: "/dashboard",
    hidden: true,
  },
];
export default dashRoutes;
