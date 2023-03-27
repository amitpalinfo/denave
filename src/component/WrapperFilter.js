import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  countryFilterSelected,
  industryFilterSelected,
  subindustryFilterSelected,
  resetAll
} from "../store/slices/companySlices";
export default function WrapperFilter() {
  const dispatch = useDispatch();
  const [allFilter, SetAllFilter] = useState([]);
  const {
    countryData,
    industryDataFilter,
    subindustryDataFilter,
    activityDataFilter,
    companySizeDataFilter,
    departmentDataFilter,
    seniorityDataFilter,
  } = useSelector((state) => state.denave);

  useEffect(() => {
    const mergeFilter = [
      ...countryData.map((e) => e.label),
      ...industryDataFilter,
      ...subindustryDataFilter,
      ...activityDataFilter,
      ...companySizeDataFilter,
      ...departmentDataFilter,
      ...seniorityDataFilter,
    ];
    SetAllFilter(mergeFilter);
  }, [
    countryData,
    industryDataFilter,
    subindustryDataFilter,
    activityDataFilter,
    companySizeDataFilter,
    departmentDataFilter,
    seniorityDataFilter,
  ]);

  const removeFilter = (name) => {
    let checkCountryArr = countryData.some((array) => array.label.includes(name));
    let checkIndustryArr = industryDataFilter.some((array) =>
      array.includes(name)
    );
    let checkSubIndustryArr = subindustryDataFilter.some((array) =>
      array.includes(name)
    );

    if (checkCountryArr)
       
      dispatch(countryFilterSelected(countryData.filter((e) => e.label !== name)));

    if (checkIndustryArr)
      dispatch(
        industryFilterSelected(industryDataFilter.filter((e) => e !== name))
      );

    if (checkSubIndustryArr)
      dispatch(
        subindustryFilterSelected(
          subindustryDataFilter.filter((e) => e !== name)
        )
      );
  };
  return (
    <div className="wrapper_filters">
      <div className="filter_outer">
        {(allFilter || []).map((e) => {
          return (
            <div className="remoove" key={e} onClick={() => removeFilter(e)}>
              <span>{e}</span>
              <i className="fa-solid fa-xmark"></i>
            </div>
          );
        })}
      </div>

      <div className="button_options">
        <div className="remoove">
          <a href="#">Show More</a>
        </div>
        <div className="remoove">
          <a href="#" onClick={()=>dispatch(resetAll())} >Clear All</a>
        </div>
      </div>
    </div>
  );
}
