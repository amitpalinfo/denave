import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  apiData: [],
  filterData: [],
  countryData: [],
  industryDataFilter: [],
  subindustryDataFilter: [],
  activityDataFilter: [],
  companySizeDataFilter: [],
  departmentDataFilter: [],
  seniorityDataFilter: [],
  // current_user: [],
  // enrolled_courses: [],
};
export const CompanySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    allApiData: (state, action) => {
      state.apiData = action.payload;
    },

    filterCompanyData: (state, action) => {
      state.filterData = action.payload;
    },

    countryFilterSelected: (state, action) => {
      state.countryData = action.payload;
    },
    industryFilterSelected: (state, action) => {
      state.industryDataFilter = action.payload;
    },
    subindustryFilterSelected: (state, action) => {
      state.subindustryDataFilter = action.payload;
    },
    activityFilterSelected: (state, action) => {
      state.activityDataFilter = action.payload;
    },
    companySizeFilterSelected: (state, action) => {
      state.companySizeDataFilter = action.payload;
    },
    departmentFilterSelected: (state, action) => {
      state.departmentDataFilter = action.payload;
    },
    seniorityFilterSelected: (state, action) => {
      state.seniorityDataFilter = action.payload;
    },

    resetAll:(state,payload)=>{
      state.countryData=[];
      state.filterData=[];
      state.seniorityDataFilter=[];
      state.departmentDataFilter=[];
      state.companySizeDataFilter=[];
      state.subindustryDataFilter=[];
      state.activityDataFilter=[];
      state.industryDataFilter=[];
    },

    allFilterData: (state, action) => {},
  },
});
export const {
  allApiData,
  filterCompanyData,
  countryFilterSelected,
  industryFilterSelected,
  subindustryFilterSelected,
  allFilterData,
  activityFilterSelected,
  companySizeFilterSelected,
  departmentFilterSelected,
  seniorityFilterSelected,
  resetAll
} = CompanySlice.actions;
export default CompanySlice.reducer;
