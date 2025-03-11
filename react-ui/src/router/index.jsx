import { Routes, Route } from "react-router-dom";
import Overview from "../views/Overview";
import Performance from "../views/Performance";
import Campaigns from "../views/Campaigns";
import Orders from "../views/Orders";
import Products from "../views/Products";
import Message from "../views/Message";
import SalesPlatform from "../views/SalesPlatform";
import Feedback from "../views/Feedback";
import HelpDocs from "../views/HelpDocs";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/performance" element={<Performance />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/products" element={<Products />} />
      <Route path="/message" element={<Message />} />
      <Route path="/sales-platform" element={<SalesPlatform />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/help-docs" element={<HelpDocs />} />
    </Routes>
  );
};

export default AppRouter;