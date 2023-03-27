import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import denave from "../denave";
import { FilterData } from "../service/FilterData";
import Modal from "./Modal";
export default function Blocks() {
  const dispatch = useDispatch();
  const {
    countryData,
    industryDataFilter,
    subindustryDataFilter,
    activityDataFilter,
    companySizeDataFilter,
    departmentDataFilter,
    seniorityDataFilter,
  } = useSelector((state) => state.denave);

  // console.log("activityDataFilter",activityDataFilter)

  const [industryData, setIndustryData] = useState([]);
  const [companySize, setCompanySize] = useState([]);
  const [departmentData, setdepartmentData] = useState([]);
  const [seniorityData, setSeniorityDataData] = useState([]);
  const [subIndustryData, setSubIndustryData] = useState([]);
  const [activityTypeData, setActivityTypeData] = useState([]);

  useEffect(() => {
    chartFun();
  }, [
    countryData,
    industryDataFilter,
    subindustryDataFilter,
    activityDataFilter,
    companySizeDataFilter,
    departmentDataFilter,
    seniorityDataFilter,
  ]);

  const chartFun = () => {
    const filterData = FilterData(
      countryData,
      industryDataFilter,
      subindustryDataFilter,
      activityDataFilter,
      companySizeDataFilter,
      departmentDataFilter,
      seniorityDataFilter
    );

    // Industry Chart
    let Industry = _.groupBy(filterData, "Industry");

    const company = Object.keys(Industry);

    const companyIndustry =
      Industry &&
      Object.keys(Industry).map(function (key) {
        return Industry[key].filter((e) => e.Country)?.length;
      });

    const industryHoverLabel =
      Industry &&
      Object.keys(Industry).map(function (key) {
        const oo = Industry[key]
          .filter((e) => e.Country)
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
        hole: 0.4,
        type: "pie",
        textinfo: "value",
        textposition: "inside",
        domain: { column: 0 },

        text: Object.values(industryHoverLabel).map((h) =>
          JSON.stringify(h)
            .replace(/[,]/g, "<br>")
            .replace(/[{}]/g, "")
            .replace(/["]/g, "")
        ),
        hovertemplate: "<b>%{text}</b><extra></extra>",
      },
    ];

    setIndustryData(data);

    // Company Size Chart

    let CompanySize = _.groupBy(
      filterData.filter((e) => e.Company_Size),
      "Company_Size"
    );

    const CompanySizeLabel = Object.keys(CompanySize);

    const CompanySizeCountry =
      CompanySize &&
      Object.keys(CompanySize).map(function (key) {
        return CompanySize[key].filter((e) => e.Country)?.length;
      });

    const companyHoverLabel =
      CompanySize &&
      Object.keys(CompanySize).map(function (key) {
        const oo = CompanySize[key]
          .filter((e) => e.Country)
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
        hole: 0.4,
        type: "pie",
        textinfo: "value",
        textposition: "inside",
        text: Object.values(companyHoverLabel).map((h) =>
          JSON.stringify(h)
            .replace(/[,]/g, "<br>")
            .replace(/[{}]/g, "")
            .replace(/["]/g, "")
        ),
        hovertemplate: "<b>%{text}</b><extra></extra>",
      },
    ];

    setCompanySize(CompanySizeData);

    // Department chart
    let departmentData = _.groupBy(filterData, "Department");

    const departmentDataLabel = Object.keys(departmentData);

    const departmentDataLabelCountry =
      departmentData &&
      Object.keys(departmentData).map(function (key) {
        return departmentData[key].filter((e) => e.Country)?.length;
      });

    const departmentHoverLabel =
      departmentData &&
      Object.keys(departmentData).map(function (key) {
        const oo = departmentData[key]
          .filter((e) => e.Country)
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
        hole: 0.4,
        type: "pie",
        textinfo: "value",
        textposition: "inside",
        text: Object.values(departmentHoverLabel).map((h) =>
          JSON.stringify(h)
            .replace(/[,]/g, "<br>")
            .replace(/[{}]/g, "")
            .replace(/["]/g, "")
        ),
        hovertemplate: "<b>%{text}</b><extra></extra>",
      },
    ];

    setdepartmentData(departmentDataLabelCountryData);

    // Senority Data
    let senorityData = _.groupBy(filterData, "Seniority_Level");

    const senorityDataLabel = Object.keys(senorityData);

    const senorityDataLabelDataLabelCountry =
      senorityData &&
      Object.keys(senorityData).map(function (key) {
        return senorityData[key].filter((e) => e.Country)?.length;
      });

    const senorityHoverLabel =
      senorityData &&
      Object.keys(senorityData).map(function (key) {
        const oo = senorityData[key]
          .filter((e) => e.Country)
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
        hole: 0.4,
        type: "pie",
        textinfo: "value",
        textposition: "inside",
        text: Object.values(senorityHoverLabel).map((h) =>
          JSON.stringify(h)
            .replace(/[,]/g, "<br>")
            .replace(/[{}]/g, "")
            .replace(/["]/g, "")
        ),
        hovertemplate: "<b>%{text}</b><extra></extra>",
      },
    ];

    setSeniorityDataData(senorityDataLabelCountryData);

    // Sub Industry Chart

    if (subindustryDataFilter.length) filterIndustry(company);
    else setSubIndustryData([]);
  };

  // On Industry Graph Click filter Sub Industry
  const filterIndustry = (inds) => {
    // Get unique count of sub industry by Industry
    const filterData = FilterData(
      countryData,
      industryDataFilter,
      subindustryDataFilter,
      activityDataFilter,
      companySizeDataFilter,
      departmentDataFilter,
      seniorityDataFilter
    );

    let industry = _.groupBy(filterData, "Industry");


    const subLabel=filterData.filter((e)=>inds.includes(e.Industry)).filter(
            (obj, index, self) =>
              index ===
                self.findIndex((t) => t.Sub_Industry === obj.Sub_Industry) &&
              inds.includes(obj.Industry)
          ).map((dd)=>dd.Sub_Industry)

    
          
    const jj= filterData.filter((e)=>inds.includes(e.Industry)).reduce((prev,curr)=>{
      if(!prev[curr.Sub_Industry])
            prev[curr.Sub_Industry]=[]
      prev[curr.Sub_Industry].push(curr)  
      
      return prev          

    },[])

    const subvalue= Object.keys(jj).map((e)=>{

    return jj[e].filter((e)=>e).length


    })

    
       

    // Get unique count of sub industry by Industry
    const subcompanyIndustry = Object.keys(industry)
      .map((key) => {
        const uniqueObjects = industry[key]
          .filter((e) => inds.includes(e.Industry))
          .filter(
            (obj, index, self) =>
              index ===
                self.findIndex((t) => t.Sub_Industry === obj.Sub_Industry) &&
              inds.includes(obj.Industry)
          ).length;

        return uniqueObjects;
      })
      .filter((e) => e !== 0);

    const subindustryHoverLabel2 = Object.keys(industry)
      .map((key) => {
        const uniqueObjects = industry[key]
          .filter((e) => inds.includes(e.Industry))
          .filter(
            (obj, index, self) =>
              index ===
                self.findIndex((t) => t.Sub_Industry === obj.Sub_Industry) &&
              inds.includes(obj.Industry)
          )
          .map((o, index) => index + 1 + ": " + o.Sub_Industry);

        return uniqueObjects;
      })
      .filter((e) => e.length);

    const subindustryHoverLabel = Object.keys(jj)
      .map((key) => {
        const uniqueObjectss = jj[key]
          
          .filter((e) => inds.includes(e.Industry))
          .reduce((prev, curr) => {
            prev[curr.Country] = (prev[curr.Country] || 0) + 1;
            return prev;
          }, {});

        return uniqueObjectss;
      })
      .filter((e) => JSON.stringify(e) !== "{}");

    console.log("subindustryHoverLabel",subindustryHoverLabel)  

    const subIndustrydataSelected = [
      {
        values: subvalue,
        labels: subLabel,
        hole: 0.4,
        type: "pie",
        textinfo: "value",
        textposition: "inside",
        domain: { column: 0 },

        // customdata: subindustryHoverLabel2.map((e) => e.join("<br>")), // custom keys

        text: subindustryHoverLabel.map((h) =>
          JSON.stringify(h)
            .replace(/[,]/g, "<br>")
            .replace(/[{}]/g, "")
            .replace(/["]/g, "")
        ),

        hovertemplate:
          "<b> %{text}</b><extra></extra>",
      },
    ];

    setSubIndustryData(subIndustrydataSelected);

    // Activitity

    // Get unique count of sub industry by Industry

    const subLabelActivity=filterData.filter((e)=>inds.includes(e.Industry)).filter(
      (obj, index, self) =>
        index ===
          self.findIndex((t) => t.activity_type === obj.activity_type) &&
        inds.includes(obj.Industry)
    ).map((dd)=>dd.activity_type)

    const jjActivity= filterData.filter((e)=>inds.includes(e.Industry)).reduce((prev,curr)=>{
      if(!prev[curr.activity_type])
            prev[curr.activity_type]=[]
      prev[curr.activity_type].push(curr)  
      
      return prev          

    },[])

    const subvalueActivity= Object.keys(jjActivity).map((e)=>{
    return jjActivity[e].filter((e)=>e).length
    })



    const industryActivity = Object.keys(industry)
      .map((key) => {
        const uniqueObjects = industry[key]
          .filter((e) => inds.includes(e.Industry))
          .filter(
            (obj, index, self) =>
              index ===
                self.findIndex((t) => t.activity_type === obj.activity_type) &&
              inds.includes(obj.Industry)
          ).length;

        return uniqueObjects;
      })
      .filter((e) => e !== 0);

    const activityHoverLabel2 = Object.keys(industry)
      .map((key) => {
        const uniqueObjects = industry[key]
          .filter((e) => inds.includes(e.Industry))
          .filter(
            (obj, index, self) =>
              index ===
                self.findIndex((t) => t.activity_type === obj.activity_type) &&
              inds.includes(obj.Industry)
          )
          .map((o, index) => index + 1 + ": " + o.activity_type);

        return uniqueObjects;
      })
      .filter((e) => e.length);

    const activityHoverLabel = Object.keys(jjActivity)
      .map((key) => {
        const uniqueObjectss = jjActivity[key]
          
          .filter((e) => inds.includes(e.Industry))
          .reduce((prev, curr) => {
            prev[curr.Country] = (prev[curr.Country] || 0) + 1;
            return prev;
          }, {});

        return uniqueObjectss;
      })
        .filter((e) => JSON.stringify(e) !== "{}");

    const activitySelected = [
      {
        values: subvalueActivity,
        labels: subLabelActivity,
        hole: 0.4,
        type: "pie",
        textinfo: "value",
        textposition: "inside",
        domain: { column: 0 },

        // customdata: activityHoverLabel2.map((e) => e.join("<br>")), // custom keys

        text: activityHoverLabel.map((h) =>
          JSON.stringify(h)
            .replace(/[,]/g, "<br>")
            .replace(/[{}]/g, "")
            .replace(/["]/g, "")
        ),

        hovertemplate:
          "<b> %{text}</b> <extra></extra>",
      },
    ];

    setActivityTypeData(activitySelected);
  };
  



  return (
    <div className="block">
      
      <div className="left">
        <div className="pie_chart">
          <div className="pie_design">
            <div className="heading">
              <h1>Company</h1>
            </div>
            <div className="box_pie">
              <div className="flex ">
                <div className="w-1/2 ">
                  <Plot
                    id="myDiv"
                    data={industryData}
                    layout={{
                      width: 500,
                      hieght: 400,
                      showlegend: true,
                      margin: {
                        l: 0, // left margin
                        r: 35, // right margin
                      },
                      autosize: false,
                      backgroundcolor: "transparent",
                      paper_bgcolor: "transparent",
                      plot_bgcolor: "transparent",
                      title: {
                        text: "Industry",
                        font: {
                          family: "Arial",
                          size: 20,
                          color: "#145389",
                          weight: "bold",
                        },
                      },
                    }}
                    config={{
                      showLink: false,
                      displaylogo: false,
                      displayModeBar: false,
                    }}
                    onClick={(data) => filterIndustry([data.points[0]?.label])}
                  />
                </div>
                <div className="w-1/2">
                  <Plot
                    data={companySize}
                    layout={{
                      width: 500,
                      hieght: 400,
                      showlegend: true,
                      margin: {
                        l: 0, // left margin
                        r: 35, // right margin
                      },

                      autosize: false,
                      backgroundcolor: "transparent",
                      paper_bgcolor: "transparent",
                      plot_bgcolor: "transparent",
                      title: {
                        text: "Company Size",
                        font: {
                          family: "Arial",
                          size: 20,
                          color: "#145389",
                          weight: "bold",
                        },
                      },
                    }}
                    config={{
                      showLink: false,
                      displaylogo: false,
                      displayModeBar: false,
                    }}

                    //   onClick={(data) => filterIndustry(data.points[0]?.label)}
                  />
                </div>
              </div>
            </div>
          </div>
          {subIndustryData.length > 0 && (
            <div className="pie_chart">
              <div className="pie_design">
                <div className="box_pie">
                  <div className="flex ">
                    <div className="w-1/2 ">
                      <Plot
                        data={subIndustryData}
                        layout={{
                          width: 500,
                          hieght: 400,
                          showlegend: true,
                          margin: {
                            l: 0, // left margin
                            r: 35, // right margin
                          },
                          autosize: false,
                          backgroundcolor: "transparent",
                          paper_bgcolor: "transparent",
                          plot_bgcolor: "transparent",
                          title: {
                            text: "Sub Industries",
                            font: {
                              family: "Arial",
                              size: 20,
                              color: "#145389",
                              weight: "bold",
                            },
                          },
                        }}
                        config={{
                          showLink: false,
                          displaylogo: false,
                          displayModeBar: false,
                        }}

                        //   onClick={(data) => filterIndustry(data.points[0]?.label)}
                      />
                    </div>
                    <div className="w-1/2">
                      <Plot
                        data={activityTypeData}
                        layout={{
                          width: 500,
                          hieght: 400,
                          showlegend: true,
                          margin: {
                            l: 0, // left margin
                            r: 35, // right margin
                          },

                          autosize: false,
                          backgroundcolor: "transparent",
                          paper_bgcolor: "transparent",
                          plot_bgcolor: "transparent",
                          title: {
                            text: "Activity Type",
                            font: {
                              family: "Arial",
                              size: 20,
                              color: "#145389",
                              weight: "bold",
                            },
                          },
                        }}
                        config={{
                          showLink: false,
                          displaylogo: false,
                          displayModeBar: false,
                        }}

                        //   onClick={(data) => filterIndustry(data.points[0]?.label)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="pie_design">
            <div className="heading">
              <h1>Contacts</h1>
            </div>
            <div className="box_pie">
              <div className="flex ">
                <div className="w-1/2 ">
                  <Plot
                    data={departmentData}
                    layout={{
                      width: 500,
                      hieght: 400,
                      showlegend: true,
                      margin: {
                        l: 0, // left margin
                        r: 35, // right margin
                      },
                      autosize: false,
                      backgroundcolor: "transparent",
                      paper_bgcolor: "transparent",
                      plot_bgcolor: "transparent",
                      title: {
                        text: "Departments",
                        font: {
                          family: "Arial",
                          size: 20,
                          color: "#145389",
                          weight: "bold",
                        },
                      },
                    }}
                    config={{
                      showLink: false,
                      displaylogo: false,
                      displayModeBar: false,
                    }}

                    //   onClick={(data) => filterIndustry(data.points[0]?.label)}
                  />
                </div>
                <div className="w-1/2">
                  <Plot
                    data={seniorityData}
                    layout={{
                      width: 500,
                      hieght: 400,
                      showlegend: true,
                      margin: {
                        l: 0, // left margin
                        r: 35, // right margin
                      },

                      autosize: false,
                      backgroundcolor: "transparent",
                      paper_bgcolor: "transparent",
                      plot_bgcolor: "transparent",

                      title: {
                        text: "Seniority Level",
                        font: {
                          family: "Arial",
                          size: 20,
                          color: "#145389",
                          weight: "bold",
                        },
                      },
                    }}
                    config={{
                      showLink: false,
                      displaylogo: false,
                      displayModeBar: false,
                    }}

                    //   onClick={(data) => filterIndustry(data.points[0]?.label)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SubIndustry */}

        <div className="table_design">
          <div className="heading">
            <h1>Profiling Status</h1>
          </div>
          <div className="box_table">
            <div className="point">
              <p className="text">STD-Profiling</p>
              <p className="description">5000</p>
            </div>
            <div className="point">
              <p className="text">STD + M</p>
              <p className="description">3000</p>
            </div>
            <div className="point">
              <p className="text">Partial Profiled</p>
              <p className="description">7000</p>
            </div>
            <div className="point">
              <p className="text">Accounts - STD</p>
              <p className="description">5000</p>
            </div>
            <div className="point">
              <p className="text">Accounts - STD + M</p>
              <p className="description">3000</p>
            </div>
            <div className="point">
              <p className="text">STD Contacts/Account</p>
              <p className="description">3:1</p>
            </div>
          </div>
        </div>
      </div>

      <div className="asside_content">
        <div className="table_design">
          <div className="box_table">
            <div className="point_primary">
              LinkedIn<p></p>
              <p className="description_primary">5000</p>
            </div>
            <div className="headings">
              <p>Validation</p>
            </div>
            <div className="point">
              <p className="text">STD + M</p>
              <p className="description">3000</p>
            </div>
            <div className="point">
              <p className="text">Partial Profiled</p>
              <p className="description">7000</p>
            </div>
            <div className="point">
              <p className="text">Accounts - STD</p>
              <p className="description">5000</p>
            </div>
            <div className="point">
              <p className="text">Accounts - STD + M</p>
              <p className="description">3000</p>
            </div>
            <div className="point_secondary">
              <p className="text_secondary">STD Contacts/Account</p>
              <p className="description_secondary">3:1</p>
            </div>
            <div className="point_primary">
              <p className="text_primary">Mobile</p>
              <p className="description_primary">5000</p>
            </div>
            <div className="point_primary">
              <p className="text_primary">LinkedIn</p>
              <p className="description_primary">5000</p>
            </div>
            <div className="point_primary">
              <p className="text_primary">Email</p>
              <p className="description_primary">3000</p>
            </div>
            <div className="point_primary">
              <p className="text_primary">Mobile</p>
              <p className="description_primary">7000</p>
            </div>
            <div className="headings">
              <p>Validation</p>
            </div>
            <div className="point">
              <p className="text">STD + M</p>
              <p className="description">3000</p>
            </div>
            <div className="point">
              <p className="text">Partial Profiled</p>
              <p className="description">7000</p>
            </div>
            <div className="point">
              <p className="text">Accounts - STD</p>
              <p className="description">5000</p>
            </div>
            <div className="point">
              <p className="text">Accounts - STD + M</p>
              <p className="description">3000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
