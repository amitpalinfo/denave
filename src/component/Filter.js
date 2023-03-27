import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { useSelector, useDispatch } from "react-redux";
import { allApiData, filterCompanyData } from "../store/slices/companySlices";
import test from "../test";
import denave from "../denave";
import _ from "lodash";

export default function Filter() {
  const dispatch = useDispatch();

  // const dataaa = useSelector((state) => state.dummy);

  const [industryData, setIndustryData] = useState([]);
  const [IndustryHoverLabel, setIndustryHoverLabel] = useState([]);
  const [subIndustryData, setSubIndustryData] = useState([]);
  const [departmentData, setdepartmentData] = useState([]);
  const [seniorityData, setSeniorityDataData] = useState([]);
  const [countryFilter, setCountryFilter] = useState([]);

  const chartFun = () => {
    // Industry Chart
    let Industry = _.groupBy(
      denave.filter((e) => countryFilter.includes(e.Country)),
      "Industry"
    );

    const company = Object.keys(Industry);

    const companyIndustry =
      Industry &&
      Object.keys(Industry).map(function (key) {
        return Industry[key].filter((e) =>
          countryFilter && countryFilter.length > 0
            ? countryFilter.includes(e.Country)
            : e.Country
        )?.length;
      });

    const industryHoverLabel =
      Industry &&
      Object.keys(Industry).map(function (key) {
        const oo = Industry[key]
          .filter((e) =>
            countryFilter && countryFilter.length > 0
              ? countryFilter.includes(e.Country)
              : e.Country
          )
          .reduce((prev, curr) => {
            prev[curr.Country] = (prev[curr.Country] || 0) + 1;
            return prev;
          }, {});

        return oo;
      });

    const data = [
      {
        values: companyIndustry,
        labels: company,
        type: "pie",
        textinfo: "value",
        textposition: "inside",

        text: Object.values(industryHoverLabel).map((h) =>
          JSON.stringify(h)
            .replace(/[,]/g, "<br>")
            .replace(/[{}]/g, "")
            .replace(/["]/g, "")
        ),
        hovertemplate: " %{text}",
      },
    ];

    setIndustryData(data);

    // Company Size Chart

    let CompanySize = _.groupBy(
      denave.filter((e) => countryFilter.includes(e.Country)),
      "Company_Size"
    );

    const CompanySizeLabel = Object.keys(CompanySize);

    const CompanySizeCountry =
      CompanySize &&
      Object.keys(CompanySize).map(function (key) {
        return CompanySize[key].filter((e) =>
          countryFilter && countryFilter.length > 0
            ? countryFilter.includes(e.Country)
            : e.Country
        )?.length;
      });

    const companyHoverLabel =
      CompanySize &&
      Object.keys(CompanySize).map(function (key) {
        const oo = CompanySize[key]
          .filter((e) =>
            countryFilter && countryFilter.length > 0
              ? countryFilter.includes(e.Country)
              : e.Country
          )
          .reduce((prev, curr) => {
            prev[curr.Country] = (prev[curr.Country] || 0) + 1;
            return prev;
          }, {});

        return oo;
      });

    const CompanySizeData = [
      {
        values: CompanySizeCountry,
        labels: CompanySizeLabel,
        type: "pie",
        textinfo: "value",
        textposition: "inside",
        text: Object.values(companyHoverLabel).map((h) =>
          JSON.stringify(h)
            .replace(/[,]/g, "<br>")
            .replace(/[{}]/g, "")
            .replace(/["]/g, "")
        ),
        hovertemplate: " %{text}",
      },
    ];

    setSubIndustryData(CompanySizeData);

    // Department chart
    let departmentData = _.groupBy(
      denave.filter((e) => countryFilter.includes(e.Country)),
      "Department"
    );

    const departmentDataLabel = Object.keys(departmentData);

    const departmentDataLabelCountry =
      CompanySize &&
      Object.keys(departmentData).map(function (key) {
        return departmentData[key].filter((e) =>
          countryFilter && countryFilter.length > 0
            ? countryFilter.includes(e.Country)
            : e.Country
        )?.length;
      });

    const departmentHoverLabel =
      departmentData &&
      Object.keys(departmentData).map(function (key) {
        const oo = departmentData[key]
          .filter((e) =>
            countryFilter && countryFilter.length > 0
              ? countryFilter.includes(e.Country)
              : e.Country
          )
          .reduce((prev, curr) => {
            prev[curr.Country] = (prev[curr.Country] || 0) + 1;
            return prev;
          }, {});

        return oo;
      });

    const departmentDataLabelCountryData = [
      {
        values: departmentDataLabelCountry,
        labels: departmentDataLabel,
        type: "pie",
        textinfo: "value",
        textposition: "inside",
        text: Object.values(departmentHoverLabel).map((h) =>
          JSON.stringify(h)
            .replace(/[,]/g, "<br>")
            .replace(/[{}]/g, "")
            .replace(/["]/g, "")
        ),
        hovertemplate: " %{text}",
      },
    ];

    setdepartmentData(departmentDataLabelCountryData);

    // Senority Data
    let senorityData = _.groupBy(
      denave.filter((e) => countryFilter.includes(e.Country)),
      "Seniority_Level"
    );

    const senorityDataLabel = Object.keys(senorityData);

    const senorityDataLabelDataLabelCountry =
      senorityData &&
      Object.keys(senorityData).map(function (key) {
        return senorityData[key].filter((e) =>
          countryFilter && countryFilter.length > 0
            ? countryFilter.includes(e.Country)
            : e.Country
        )?.length;
      });

    const senorityHoverLabel =
      senorityData &&
      Object.keys(senorityData).map(function (key) {
        const oo = senorityData[key]
          .filter((e) =>
            countryFilter && countryFilter.length > 0
              ? countryFilter.includes(e.Country)
              : e.Country
          )
          .reduce((prev, curr) => {
            prev[curr.Country] = (prev[curr.Country] || 0) + 1;
            return prev;
          }, {});

        return oo;
      });

    const senorityDataLabelCountryData = [
      {
        values: senorityDataLabelDataLabelCountry,
        labels: senorityDataLabel,
        type: "pie",
        textinfo: "value",
        textposition: "inside",
        text: Object.values(senorityHoverLabel).map((h) =>
          JSON.stringify(h)
            .replace(/[,]/g, "<br>")
            .replace(/[{}]/g, "")
            .replace(/["]/g, "")
        ),
        hovertemplate: " %{text}",
      },
    ];

    setSeniorityDataData(senorityDataLabelCountryData);
  };

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

    setSubIndustryData(subdata);
  };

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

  useEffect(() => {
    chartFun();
  }, [countryFilter]);

  return (
    <div className="dashboard-section">
      <div className="top">
        <div className="flex flex-row h-screen">
          <div className="bg-gray-900 text-white w-1/5 p-4">
            <h3 className="text-lg font-medium mb-4">Filter</h3>

            <div className="w-full">
              <div className="mb-4 mt-4">
                <label for="company" className="font-medium cursor-pointer">
                  Company
                </label>
                <div className="ml-6">
                  <input
                    type="checkbox"
                    id="it & communication"
                    name="it & communication"
                    className="mr-2"
                  />
                  <label for="it & communication" className="cursor-pointer">
                    IT & Communication
                  </label>
                </div>

                <div className="ml-8">
                  <input
                    type="checkbox"
                    id="it software & programming"
                    name="it software & programming"
                    className="mr-2"
                  />
                  <label
                    for="it software & programming"
                    className="cursor-pointer"
                  >
                    It Software & Programming
                  </label>
                </div>
              </div>
              {/* Country */}

              <div className="mb-4 mt-4">
                <label for="country" className="font-medium cursor-pointer">
                  Country
                </label>
                <div className="ml-8">
                  <input
                    type="checkbox"
                    id="india"
                    name="india"
                    className="mr-2"
                    onChange={handleChange("india")}
                  />
                  <label for="india" className="cursor-pointer">
                    india
                  </label>
                </div>
                <div className="ml-8">
                  <input
                    type="checkbox"
                    id="uk"
                    name="uk"
                    className="mr-2"
                    onChange={handleChange("uk")}
                  />
                  <label for="uk" className="cursor-pointer">
                    uk
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-6">
            {countryFilter && countryFilter.length > 0 ? (
              <>
                <div class="grid grid-cols-2 gap-4  ">
                  <div>
                    <div className="">
                      <Plot
                        data={industryData}
                        layout={{
                          width: 500,
                          autosize: false,

                          height: 500,
                          title: "Industry",
                        }}
                        config={{
                          showLink: false,
                          displaylogo: false,
                        }}
                        onClick={(data) =>
                          filterIndustry(data.points[0]?.label)
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <div className="">
                      <Plot
                        data={subIndustryData}
                        layout={{
                          width: 500,
                          height: 500,
                          autosize: false,

                          title: "Company Size",
                        }}
                        config={{
                          showLink: false,
                          displaylogo: false,
                        }}
                        onClick={(data) =>
                          filterIndustry(data.points[0]?.label)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="">
                      <Plot
                        data={departmentData}
                        layout={{
                          width: 500,
                          height: 500,
                          autosize: false,

                          title: "Departments",
                        }}
                        config={{
                          showLink: false,
                          displaylogo: false,
                        }}
                        onClick={(data) =>
                          filterIndustry(data.points[0]?.label)
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <div className="">
                      <Plot
                        data={seniorityData}
                        layout={{
                          width: 500,
                          height: 500,
                          autosize: false,

                          title: "Seniority Level",
                        }}
                        config={{
                          showLink: false,
                          displaylogo: false,
                        }}
                        onClick={(data) =>
                          filterIndustry(data.points[0]?.label)
                        }
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p>Please select atleast one country filter</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
