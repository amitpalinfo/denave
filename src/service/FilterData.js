import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { useSelector, useDispatch } from "react-redux";
import _, { values } from "lodash";
import denave from "../denave";

export const FilterData = (
  countryData,
  industryDataFilter,
  subindustryDataFilter,
  activityDataFilter,
  companySizeDataFilter,
  departmentDataFilter,
  seniorityDataFilter
) => {
  console.log("departmentDataFilter", countryData);
  // Get Country Array
  const countryArray = countryData
    .filter((aar) => aar.value.country)
    .map((c) => c.value)
    .filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.country === obj.country) &&
        obj.country
    )
    .map((r) => r.country);

  // Get State Array
  const stateArray = countryData
    .filter((aar) => aar.value.state)
    .map((c) => c.value)
    .filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.state === obj.state) && obj.state
    )
    .map((r) => r.state);

  // Get City Array
  const cityArray = countryData
    .filter((aar) => aar.value.city)
    .map((c) => c.value)
    .filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.city === obj.city) && obj.city
    )
    .map((r) => r.state);

  const filters = [
    {
      type: "Sub_Industry",
      values: subindustryDataFilter,
    },
    {
      type: "Industry",
      values: industryDataFilter,
    },
    {
      type: "activity_type",
      values: activityDataFilter,
    },
    {
      type: "Country",
      values: countryArray,
    },
    {
      type: "State",
      values: stateArray,
    },
    {
      type: "City",
      values: cityArray,
    },
    {
      type: "Company_Size",
      values: companySizeDataFilter,
    },
    {
      type: "Department",
      values: departmentDataFilter,
    },
    {
      type: "Seniority_Level",
      values: seniorityDataFilter,
    },
  ];

  // Filter all data with includes function

  let temparray = [...denave];

  filters
    .filter((dataFilter) => dataFilter.values.length > 0)
    .map(
      (filter) =>
        (temparray = temparray.filter((arrayData) =>
          filter.values.includes(arrayData[filter["type"]])
        ))
    );

  return temparray.filter((e) => e.Industry);
};
