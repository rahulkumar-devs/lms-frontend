import React from "react";
import DashboardHeader from "../../../components/admin/DashboardHeader";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div>
          <div className=" md:block hidden">
        <DashboardHeader/>
        </div>
      Dashboard
    </div>
  );
};

export default Dashboard;
