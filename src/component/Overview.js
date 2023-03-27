import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import denave from "../denave";
import _ from "lodash";
import { FilterData } from "../service/FilterData";
import Modal from "./Modal";
export default function Overview() {
  const [account, setAccount] = useState(0);
  const [email, setEmail] = useState(0);
  const [mobile, setMobile] = useState(0);
  const [linkedinId, setLinkedinId] = useState(0);

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
    chartFunCount();
  }, [
    countryData,
    industryDataFilter,
    subindustryDataFilter,
    activityDataFilter,
    companySizeDataFilter,
    departmentDataFilter,
    seniorityDataFilter,
  ]);

  const chartFunCount = () => {
    const filterData = FilterData(
      countryData,
      industryDataFilter,
      subindustryDataFilter,
      activityDataFilter,
      companySizeDataFilter,
      departmentDataFilter,
      seniorityDataFilter
    );

    // entity_name Chart
    let entity_name = _.groupBy(filterData, "entity_name");

    setAccount(Object.keys(entity_name).length);

    // email
    let email = _.groupBy(filterData, "email_id");
    setEmail(Object.keys(email).filter((e) => e.length !== 0).length);

    // mobile
    let mobile = _.groupBy(filterData, "phone_number");
    setMobile(Object.keys(mobile).filter((e) => e.length !== 0).length);

    // linkdin
    let linkdin = _.groupBy(filterData, "linkedin_id");
    setLinkedinId(Object.keys(linkdin).filter((e) => e.length !== 0).length);
  };


  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {alert("ss")
    setModalIsOpen(!modalIsOpen);
  };

  const closeModal = () => {
    setModalIsOpen(!modalIsOpen);
  };
  const [formState, setFormState] = useState({
    client_name: '',
    project_name: '',
    product_name: '',
    purpose:''
  });

  const [successMsg,setSuccessMsg]=useState({
    status:false,
    msg:null
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formState);
    setSuccessMsg({
      status:true,
      msg:"Your downlaod request is submitted successfully!. We will update soon with dowload link to your email "    })
  };

  return (
    
    <div className="overview">
      <Modal isOpen={modalIsOpen} onClose={closeModal}>
     {!successMsg.status ?

      <form className="get_data_form" onSubmit={handleSubmit}>
      <label>
        Client Name
       <input type="text" value={formState.client_name} name={"client_name"} className="form_label" onChange={handleInputChange}  />
      </label>
      <br />
      <label>
      Project Name
        <input type="text" value={formState.project_name} name={"project_name"} className="form_label" onChange={handleInputChange}  />
      </label>
      <br />
      <label>
      Product Name
        <input type="text" value={formState.product_name} name={"product_name"} className="form_label" onChange={handleInputChange} />
      </label>
      <br />
      <label>
      Purpose
      <select name="purpose" className="form_label" onChange={handleInputChange} >
        <option value="">Select an option</option>
        <option value="Telecalling">Telecalling</option>
        <option value="Digital Marketing">Digital Marketing</option>
        <option value="Social Media Campaign">Social Media Campaign</option>
        <option value="Lead Generation">Lead Generation</option>
        <option value="Email Marketing Campaign">Email Marketing Campaign</option>
        <option value="Others">Others</option>
      </select>
      </label>
      <br />
      <button type="submit">Get Data</button>
    </form>
    : <p>{successMsg.msg}</p>

     }
      </Modal>
      <div className="outter">
        <div className="heading">
          <h1>Overview</h1>
        </div>

        <div className="overview_detail_main">
          <div className="parts">
            <div className="part">
              <div className="up">
                <p> Accounts</p>
              </div>
              <div className="down">
                <p> {account}</p>
              </div>
            </div>
            <div className="part">
              <div className="up">
                <p> Contacts</p>
              </div>
              <div className="down">
                <p> 20000</p>
              </div>
            </div>
            <div className="part">
              <div className="up">
                <p> LinkrdIn</p>
              </div>
              <div className="down">
                <p> {linkedinId}</p>
              </div>
            </div>
            <div className="part">
              <div className="up">
                <p> Email</p>
              </div>
              <div className="down">
                <p> {email}</p>
              </div>
            </div>
            <div className="part">
              <div className="up">
                <p> Mobile</p>
              </div>
              <div className="down">
                <p> {mobile}</p>
              </div>
            </div>
          </div>
          <div className="button_save">
            <button type="button" onClick={()=>setModalIsOpen(!modalIsOpen)}>Get Data</button>
          </div>
        </div>
      </div>
    </div>
  );
}
