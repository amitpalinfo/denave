import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { useSelector, useDispatch } from "react-redux";
import {
  allApiData,
  filterCompanyData,
  industryFilterSelected,
} from "../store/slices/companySlices";
import test from "../test";
import denave from "../denave";
import _ from "lodash";
import TopBar from "./TopBar";
import WrapperFilter from "./WrapperFilter";
import Overview from "./Overview";
import Blocks from "./Blocks";
import Search from "./Search";
import Login from "./Login";
export default function Main() {
  const countryData = useSelector((state) => state.denave.countryData);
  const industryDataFilter = useSelector(
    (state) => state.denave.industryDataFilter
  );

  const [industryData, setIndustryData] = useState([]);

  const filterIndustry = (inds) => {
    let output = _.groupBy(denave, "entity_name");

    const company = Object.keys(output);

    const companySubIndustry = output[inds].filter(
      (e) => e.Sub_Industry
    )?.length;

    const subdata = [
      {
        values: [companySubIndustry],
        labels: [inds],
        type: "pie",
        textinfo: "value",
        textposition: "inside",
      },
    ];
  };

  if (countryData.length)
    return (
      <div className="dashboard-section">
        <TopBar />
        <WrapperFilter />
        <Overview />
        <Blocks />
      </div>
    );
  else
    return (
      <div className="dashboard-section">
       
        <TopBar />
        <Search />
      </div>
    );
}
