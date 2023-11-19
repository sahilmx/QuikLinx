import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import QRCode from 'react-google-qrcode';



export default function MHome() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);

  const [tableDataItems, setTableDataItems] = useState([]);

  // useEffect(() => {
  //   console.log("state", selectedRows);
  // }, [selectedRows]);

  useEffect(() => {

    var config = {
      method: 'get',
      url: 'http://127.0.0.1:3003/admin/vendor/get',
      headers:{
        'Authorization': 'Bearer '+sessionStorage.getItem('access_token'), 

      }
     
    };
    
    axios(config)
    .then(function (response) {
      console.log("this is the response of the vendor apis ",response.data.data);
      setTableDataItems(response.data.data);
      console.log("this is the datatables items", response.data.data)
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }, [])
  
  const handleButtonEditClick=(r)=>{

    //handle the edit functionality 

  // navigate(`/editVendor?vendor=${r.id}`)
    navigate('/editVendor', {state:r});

  }

  const handleButtonClick = (r) => {
    console.log(r);
    console.log({tableDataItems});
    let tbc=[...tableDataItems];
    let data;
    tbc.forEach((element)=>{
        
         if(element.id==r.id){
          if(element.deleted==0) {element.deleted=1;
          console.log("status changed to 1 ")
          }
          else {element.deleted=0;
            console.log("status changed to 0 ")
          }
          data = JSON.stringify({
            "deleted": `${element.deleted}`
          }); 
      }
    });
   
    setTableDataItems(tbc);
    var config = {
      method: 'put',
      url: `http://127.0.0.1:3003/admin/vendor/${r._id}`,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem('access_token'), 

      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
    })
    .catch(function (error) {
      console.log(error);
    });
    
  };

  const handleChange = useCallback((state) => {
    // setSelectedRows(state.selectedRows);
  }, []);


 

  const columns = [

      {
        name: "Id",
        selector: (row) => row._id,
        sortable: true,
       
      },
      {
        name: "Name",
        selector: (row) => row.pName,
        sortable: true,
        
      },
      {
        name: "Email",
        selector: (row) => row.pEmail,
        sortable: true,
      },
      {
        name: "Mobile",
        selector: (row) => row.pPhone,
        sortable: true,
      },
      {
        name: "Created On",
        selector: (row) => row.createdAt,
        sortable: true,
      },
      {
        name: "Panel Status",
        selector: (row) => {if(row.pDemoValue==0){
          return "Demo"
        }else if(row.pDemoValue==1){
          return  "Testing/Staging"
        }else if(row.pDemoValue==2){
          return  "Pre-Production"
        }else if(row.pDemoValue==3){
          return "Production (Live)"
        }else return "Null"},
        sortable: true,
      },
      {
        name:"Change Status",
        cell: (r) => <button  className="btn btn-outline-primary btn-sm" onClick={()=>handleButtonClick(r)}>{r.deleted?'In-Active':'Active'}</button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
      {
        name:"Action",
        cell: (r) => <button  className="btn btn-outline-success btn-sm" onClick={()=>handleButtonEditClick(r)}>Edit</button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      }
    ];
  return (
    <div className="main-wrapper">
      <div className="page-content">
        <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
          <div>
            <h4 className="mb-3 mb-md-0">Welcome to Dashboard</h4>


          
          </div>
          <div className="d-flex align-items-center flex-wrap text-nowrap">
            <button
              type="button"
              className="btn btn-outline-primary btn-icon-text mb-2 mb-md-0"
              onClick={() => navigate("/addCompanyDetails")}
            >
              Register Company
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-xl-12">
            <DataTable
              title="Vendors"
              data={tableDataItems}
              columns={columns}
              //selectableRows
              onSelectedRowsChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
