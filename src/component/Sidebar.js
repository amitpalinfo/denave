import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import denave from "../denave";
import _ from "lodash";
import Select from "react-select";

import {
  countryFilterSelected,
  industryFilterSelected,
  subindustryFilterSelected,
  activityFilterSelected,
  companySizeFilterSelected,
  departmentFilterSelected,
  seniorityFilterSelected,
} from "../store/slices/companySlices";

export default function Sidebar() {
  const dispatch = useDispatch();
  const [countryFilter, setCountryFilter] = useState([]);
  const [industryFilter, setIndustryFilter] = useState([]);
  const [subIndustryFilter, setSubIndustryFilter] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState([]);
  const [activityFilter, setActivityFilter] = useState([]);
  const [companySizeFilter, setcompanySizeFilter] = useState([]);
  const [senorityFilter, setSenorityFilter] = useState([]);
  const [dropdown, setDropDown] = useState({
    Industry: false,
    sub_industry: null,
  });

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);

  const { industryDataFilter, subindustryDataFilter } = useSelector(
    (state) => state.denave
  );

  useEffect(()=>{
    setIndustryFilter(industryDataFilter);
    setDropDown((dropdown) => {
      return {
        ...dropdown,
        Industry: !dropdown.Industry,
      };
    })

  },[industryDataFilter])

  const handleChange = (c) => () => {
    // return the first index or -1
    const clickedCategory = countryFilter.indexOf(c);
    let all = [...countryFilter];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }

    setCountryFilter(all);
  };

  //Industry Filter
  const handleSelectChange = (selectedIndustry, type) => {
    if (type == "industry")
      setIndustryFilter(selectedIndustry.map((e) => e.value));
    if (type == "subindustry")
      setSubIndustryFilter(selectedIndustry.map((e) => e.value));
    if (type == "country")
      setCountryFilter(selectedIndustry.map((e) => e.value));

    if (type == "department")
      setDepartmentFilter(selectedIndustry.map((e) => e.value));

    if (type == "activity")
      setActivityFilter(selectedIndustry.map((e) => e.value));

    if (type == "company_size")
      setcompanySizeFilter(selectedIndustry.map((e) => e.value));

    if (type == "senority")
      setSenorityFilter(selectedIndustry.map((e) => e.value));
  };

  useEffect(() => {
    dispatch(countryFilterSelected(selectedOptions));
    dispatch(industryFilterSelected(industryFilter));
    dispatch(subindustryFilterSelected(subIndustryFilter));
    dispatch(activityFilterSelected(activityFilter));
    dispatch(companySizeFilterSelected(companySizeFilter));
    dispatch(departmentFilterSelected(departmentFilter));
    dispatch(seniorityFilterSelected(senorityFilter));
  }, [
    selectedOptions,
    industryFilter,
    subIndustryFilter,
    activityFilter,
    companySizeFilter,
    departmentFilter,
    senorityFilter,
  ]);

  let Industry = _.groupBy(
    denave.filter((e) => e),
    "Industry"
  );
  // setIndustryFilter()
  const filteredDataIndustry = Object.keys(Industry)
    .filter((e) => e)
    .map((d) => {
      return { value: d, label: d };
    });

  useEffect(() => {
    if (subindustryDataFilter.length) {
      let Industry = _.groupBy(
        denave.filter((e) =>
          subindustryDataFilter.length
            ? subindustryDataFilter.includes(e.Sub_Industry)
            : e
        ),
        "Industry"
      );
      const filteredDataIndustrssy = Object.keys(Industry);
      filteredDataIndustrssy.forEach((e) => {
        if (!industryFilter.includes(e)) {
          setIndustryFilter((prev) => [...prev, e]);
        }
      });
    }
  }, [subindustryDataFilter]);

  // industryDataFilter
  const subInd = denave
    .filter((f) =>
      industryDataFilter.length
        ? industryDataFilter.includes(f.Industry)
        : f.Industry
    )
    .filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.Sub_Industry === obj.Sub_Industry)
    );

  const filteredDataSubIndustry = subInd
    .filter((e) => e.Sub_Industry)
    .map((d) => {
      return { value: d.Sub_Industry, label: d.Sub_Industry };
    });

  let country = _.groupBy(denave, "Country");
  const filteredDatacountry = Object.keys(country)
    .filter((e) => e)
    .map((d) => {
      return { value: d, label: d };
    });

  let department = _.groupBy(denave, "Department");
  const filteredDataDepartment = Object.keys(department)
    .filter((e) => e)
    .map((d) => {
      return { value: d, label: d };
    });

  let senorityLevel = _.groupBy(denave, "Seniority_Level");
  const filteredDataSenority = Object.keys(senorityLevel)
    .filter((e) => e)
    .map((d) => {
      return { value: d, label: d };
    });

  let activityType = _.groupBy(denave, "activity_type");
  const filteredDataActivity = Object.keys(activityType)
    .filter((e) => e)
    .map((d) => {
      return { value: d, label: d };
    });

  let CompanySize = _.groupBy(
    denave.filter((e) => e.Company_Size),
    "Company_Size"
  );

  const filteredDataCompanySize = Object.keys(CompanySize)
    .filter((e) => e)
    .map((d) => {
      return { value: d, label: d };
    });

  // const locations = [
  //   { country: "United States", state: "New York", city: "New York City" },
  //   { country: "United States", state: "California", city: "Los Angeles" },
  //   { country: "Canada", state: "Ontario", city: "Toronto" },
  //   { country: "Canada", state: "British Columbia", city: "Vancouver" },
  //   { country: "Australia", state: "New South Wales", city: "Sydney" },
  //   { country: "Australia", state: "Victoria", city: "Melbourne" },
  //   { country: "india", state: "punjab", city: "Mohali" },
  //   { country: "india", state: "punjab", city: "Balongi" },
  // ];

  // Map Location By Country, state ,city
  const locations = denave.map((e) => {
    return {
      country: e.Country,
      state: e.State,
      city: e.City,
    };
  });

  // Country FIlter Function
  const generateOptions = (searchText) => {
    if (searchText.length >= 2) {
      const filteredLocations = locations.filter(
        (loc) =>
          loc.country.toLowerCase().includes(searchText.toLowerCase()) ||
          loc.state.toLowerCase().includes(searchText.toLowerCase()) ||
          loc.city.toLowerCase().includes(searchText.toLowerCase())
      );

      let country = locations.filter((loc) =>
        loc.country.toLowerCase().includes(searchText.toLowerCase())
      );

      let state = locations.filter((loc) =>
        loc.state.toLowerCase().includes(searchText.toLowerCase())
      );

      let city = locations.filter((loc) =>
        loc.city.toLowerCase().includes(searchText.toLowerCase())
      );

      const searchLabel = filteredLocations
        .map((loc) => ({
          value: country.length
            ? { country: loc.country }
            : state.length
            ? { state: loc.state, country: loc.country }
            : city.length
            ? { city: loc.city, state: loc.state, country: loc.country }
            : "",

          label: country.length
            ? loc.country
            : state.length
            ? loc.state + "," + loc.country
            : city.length
            ? loc.city + "," + loc.state + "," + loc.country
            : "",
        }))
        .filter(
          (obj, index, self) =>
            index === self.findIndex((t) => t.country === obj.country)
        )
        .filter(
          (obj, index, self) =>
            index === self.findIndex((t) => t.city === obj.city)
        )
        .filter(
          (obj, index, self) =>
            index === self.findIndex((t) => t.state === obj.state)
        );

      return searchLabel;
    }
  };

  console.log("industryFilter",filteredDataIndustry)

  return (
    <div className="sidebar text-justify	">
      <div className="logo">
        <img src={"./logo.png"} alt="" />
      </div>

      <div className="nav_menu">
        <div className="row">
          <div className="column-1">
            <p>Date</p>
          </div>
          <div className="column-2">
            <div className="option">
              <input type="radio" id="html" name="fav_language" value="HTML" />
              <label for="html">Created Date</label>
            </div>
            <div className="option">
              <input type="radio" id="html" name="fav_language" value="HTML" />
              <label for="html">Modified Date</label>
            </div>
            <div className="date_input">
              <input type="date" id="DAte" />
            </div>
          </div>
        </div>

        <div className="Nav_part">
          <div className="nav_heading">
            <p>Company</p>
          </div>
          <div className="nav_list">
            {/* Industry */}
            <button
              className={`dropdown-btn ${dropdown.Industry ? "active" : ""} `}
              onClick={() =>
                setDropDown((dropdown) => {
                  return {
                    ...dropdown,
                    Industry: !dropdown.Industry,
                  };
                })
              }
            >
              <i className="fa-solid fa-chevron-right"></i>Industry
            </button>

            {dropdown.Industry && (
              <div className="dropdown-container">
                <Select
                  closeMenuOnSelect={false}
                  defaultValue={filteredDataIndustry?.filter((f) =>
                    industryFilter.includes(f.value)
                  )}
                  isMulti
                  options={filteredDataIndustry}
                  onChange={(e) => handleSelectChange(e, "industry")}
                  placeholder="Search Industry"
                />
              </div>
            )}
            {/* SubIndustry */}
            <button
              className={`dropdown-btn mt-3 ${
                dropdown.sub_industry ? "active" : ""
              } `}
              onClick={() =>
                setDropDown((dropdown) => {
                  return {
                    ...dropdown,
                    sub_industry: !dropdown.sub_industry,
                  };
                })
              }
            >
              <i className="fa-solid fa-chevron-right"></i>Sub Industry
            </button>
            {dropdown.sub_industry && (
              <div className="dropdown-container">
                <Select
                  closeMenuOnSelect={false}
                  defaultValue={filteredDataSubIndustry?.filter((f) =>
                    subIndustryFilter.includes(f.value)
                  )}
                  onChange={(e) => handleSelectChange(e, "subindustry")}
                  isMulti
                  options={filteredDataSubIndustry}
                  placeholder="Search sub-Industry"
                />
              </div>
            )}

            {/* Activity Type */}
            <button
              className={`dropdown-btn mt-3 ${
                dropdown.activityType ? "active" : ""
              } `}
              onClick={() =>
                setDropDown((dropdown) => {
                  return {
                    ...dropdown,
                    activityType: !dropdown.activityType,
                  };
                })
              }
            >
              <i className="fa-solid fa-chevron-right"></i>Activity Type
            </button>
            {dropdown.activityType && (
              <div className="dropdown-container">
                <Select
                  closeMenuOnSelect={false}
                  defaultValue={filteredDataActivity?.filter((f) =>
                    activityFilter.includes(f.value)
                  )}
                  onChange={(e) => handleSelectChange(e, "activity")}
                  isMulti
                  options={filteredDataActivity}
                  placeholder="Search Activity"
                />
              </div>
            )}

            {/* Company Size */}
            <button
              className={`dropdown-btn mt-3 ${
                dropdown.companySize ? "active" : ""
              } `}
              onClick={() =>
                setDropDown((dropdown) => {
                  return {
                    ...dropdown,
                    companySize: !dropdown.companySize,
                  };
                })
              }
            >
              <i className="fa-solid fa-chevron-right"></i>Company Size
            </button>
            {dropdown.companySize && (
              <div className="dropdown-container">
                <Select
                  closeMenuOnSelect={false}
                  defaultValue={filteredDataCompanySize?.filter((f) =>
                    companySizeFilter.includes(f.value)
                  )}
                  isMulti
                  options={filteredDataCompanySize}
                  onChange={(e) => handleSelectChange(e, "company_size")}
                  placeholder="Company Size"
                />
              </div>
            )}

            {/* Region */}
            <button
              className={`dropdown-btn mt-3 ${
                dropdown.region ? "active" : ""
              } `}
              onClick={() =>
                setDropDown((dropdown) => {
                  return {
                    ...dropdown,
                    region: !dropdown.region,
                  };
                })
              }
            >
              <i className="fa-solid fa-chevron-right"></i>Region
              <span className="text-sm" style={{ color: "red" }}>
                {" "}
                *
              </span>
            </button>
            {dropdown.region && (
              <div className="dropdown-container">
                {/* <Select
                  closeMenuOnSelect={true}
                  value={selectedOptions}
                  options={options}
                  onInputChange={(value) => setOptions(generateOptions(value))}
                  onChange={(options) => setSelectedOptions(options)}
                  placeholder="Search region"
                  isMulti
                /> */}
              </div>
            )}

            {/* Country */}
            <button
              className={`dropdown-btn mt-3 ${
                dropdown.country ? "active" : ""
              } `}
              onClick={() =>
                setDropDown((dropdown) => {
                  return {
                    ...dropdown,
                    country: !dropdown.country,
                  };
                })
              }
            >
              <i className="fa-solid fa-chevron-right"></i>Contry, State, City
              <span className="text-sm" style={{ color: "red" }}>
                {" "}
                *
              </span>
            </button>
            {dropdown.country && (
              <div className="dropdown-container">
                <Select
                  closeMenuOnSelect={true}
                  value={selectedOptions}
                  options={options}
                  onInputChange={(value) => setOptions(generateOptions(value))}
                  onChange={(options) => setSelectedOptions(options)}
                  placeholder="Search country, state , city"
                  isMulti
                />
              </div>
            )}

            {/* Domain Name */}
            <button
              className={`dropdown-btn mt-3 ${
                dropdown.domainName ? "active" : ""
              } `}
              onClick={() =>
                setDropDown({
                  domainName: !dropdown.domainName,
                })
              }
            >
              <i className="fa-solid fa-chevron-right"></i>Domain Name
            </button>
            {dropdown.domainName && (
              <div className="dropdown-container">
                <div className="check">
                  <input
                    type="checkbox"
                    id="india"
                    name="india"
                    className=""
                    onChange={handleChange("india")}
                  />
                  <label for="india" className="ml-1 cursor-pointer checkbox">
                    india
                  </label>
                </div>
                <div className="check">
                  <input
                    type="checkbox"
                    id="uk"
                    name="uk"
                    className=""
                    onChange={handleChange("uk")}
                  />
                  <label for="uk" className=" ml-1 cursor-pointer checkbox">
                    uk
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="Nav_part">
          <div className="nav_heading">
            <p>Contact</p>
          </div>
          <div className="nav_list">
            {/* Department */}
            <button
              className={`dropdown-btn mt-3 ${
                dropdown.department ? "active" : ""
              } `}
              onClick={() =>
                setDropDown((dropdown) => {
                  return {
                    ...dropdown,
                    department: !dropdown.department,
                  };
                })
              }
            >
              <i className="fa-solid fa-chevron-right"></i>Department
            </button>

            {dropdown.department && (
              <div className="dropdown-container">
                <Select
                  closeMenuOnSelect={false}
                  defaultValue={filteredDataDepartment?.filter((f) =>
                    departmentFilter.includes(f.value)
                  )}
                  isMulti
                  options={filteredDataDepartment}
                  onChange={(e) => handleSelectChange(e, "department")}
                  placeholder="Search Department"
                />
              </div>
            )}
            {/* Senority Level */}
            <button
              className={`dropdown-btn mt-3 ${
                dropdown.senority ? "active" : ""
              } `}
              onClick={() =>
                setDropDown((dropdown) => {
                  return {
                    ...dropdown,
                    senority: !dropdown.senority,
                  };
                })
              }
            >
              <i className="fa-solid fa-chevron-right"></i>senority
            </button>

            {dropdown.senority && (
              <div className="dropdown-container">
                <Select
                  closeMenuOnSelect={false}
                  defaultValue={filteredDataSenority?.filter((f) =>
                    senorityFilter.includes(f.value)
                  )}
                  isMulti
                  options={filteredDataSenority}
                  onChange={(e) => handleSelectChange(e, "senority")}
                  placeholder="Search Senority Level"
                />
              </div>
            )}

            {/* Job Title */}

            <button
              className={`dropdown-btn mt-3 ${
                dropdown.senority ? "active" : ""
              } `}
              onClick={() =>
                setDropDown((dropdown) => {
                  return {
                    ...dropdown,
                    senority: !dropdown.senority,
                  };
                })
              }
            >
              <i className="fa-solid fa-chevron-right"></i>Job Title
            </button>

            {dropdown.jobTitle && (
              <div className="dropdown-container">
                <Select
                  closeMenuOnSelect={false}
                  defaultValue={filteredDataSenority?.filter((f) =>
                    senorityFilter.includes(f.value)
                  )}
                  isMulti
                  options={filteredDataSenority}
                  onChange={(e) => handleSelectChange(e, "senority")}
                  placeholder="Search Senority Level"
                />
              </div>
            )}
          </div>
        </div>

        <div className="Nav_part">
          <div className="nav_heading">
            <p>Company Category</p>
          </div>
          <div className="nav_list">
            <ul className="navigation_list">
              <li className="item">
                <a href="#" className="link">
                  <i className="fa-solid fa-chevron-right"></i>Category
                </a>
              </li>
              <li className="item">
                <a href="#" className="link">
                  <i className="fa-solid fa-chevron-right"></i>Sub-Category
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="Nav_part">
          <div className="nav_heading">
            <p>Profiling Status</p>
          </div>
          <div className="check_list">
            <div className="check">
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1"> STD</label>
            </div>
            <div className="check">
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1"> Email</label>
            </div>
            <div className="check">
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1"> Mobile</label>
            </div>
          </div>
        </div>

        <div className="button_save">
          <button type="button">Save</button>
        </div>
      </div>
    </div>
  );
}
