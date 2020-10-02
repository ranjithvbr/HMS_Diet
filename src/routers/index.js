import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Drawerpage from "../components/Drawer page/Drawerpage";
// import Login from '../components/Diet_login/Login'
// import Forgot from '../components/Diet_login/Forgot'
// import ResetPassword from '../components/Diet_login/ResetPassword'
import DashboardMaster from '../components/DietDashboard/DashboardMaster'
import TotalOrderMaster from '../components/TotalOrder/TotalOrderMaster';
import CancelledOrdersMaster from '../components/CancelledOrder/CancelledOrdersMaster'
import AdvertiseMaster from "../components/Advertisement Booking/AdvertisementMaster"
import DealsMaster from "../components/Deals/DealsMaster"
import ManageMaster from '../components/Manage/ManageMaster'
import RevenueMaster from '../components/Diet_Revenue/RevenueMaster'
import MediaUploadsMaster from "../components/MediaUploads/MediaUploadsMaster";
import TodaysPreparationMaster from '../components/TodaysPreparation/TodaysPreparationMaster'
import DelieveriesMaster from '../components/TodaysDelivery/DelieveriesMaster'
import PaymentReceived from "../components/PaymentReceived/PaymentReceived"
import CancelPayment from '../components/CancelPayment/PaymentMethod'
import ProfileComp from '../components/LabProfile/ProfileComp' 


const AppRouter = () => (
  <div>
   
    <BrowserRouter>
    <Drawerpage>
        <Switch>
          
        {/* <Route path="/" component={Login} /> */}
        {/* <Route path="/login" component={Login} />
        <Route path="/Forgotpassword" component={Forgot} />
        <Route path ="/ResetPassword" component={ResetPassword} /> */}
        <Route path="/dashboard" component={DashboardMaster} exact  />
        <Route path="/totalorder" component={TotalOrderMaster} exact />
        <Route path="/cancelorder" component={CancelledOrdersMaster} exact  />
        <Route path="/advertisement" component={AdvertiseMaster} exact />
        <Route path="/deals" component={DealsMaster}  exact />
        <Route path="/revenue" component={RevenueMaster} exact />
        <Route path="/manage" component={ManageMaster} exact />
        <Route path="/mediauploads" component={MediaUploadsMaster} exact />
        <Route path="/profile" component={ProfileComp} exact />
        <Route path="/todayspreparation" component={TodaysPreparationMaster} exact />
        <Route path="/todaysdelivery" component={DelieveriesMaster} exact />
        <Route path="/payment" component={CancelPayment} exact />
        <Route path="/paymentreceived" component={PaymentReceived} exact />
         
      </Switch>
      </Drawerpage>
  
  </BrowserRouter>
  </div>
);

export default AppRouter;



