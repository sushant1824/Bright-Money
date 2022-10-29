import React, { useState, Fragment, useEffect } from "react";
import "./App.css";
import data from "./bills.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow.js";
import TimeSeries from "./Timeseries";


const App = () => {
  const [userBills, setUserBills] = useState(data);

  const [selectedCategory,setSelectedCategory] = useState("all");

  const [selectedBills,setSelectedBills] = useState(data);

  const [totalBill,setTotalBill] = useState();

  useEffect(() => {
    let total = 0;
    userBills.forEach((bill)=>{
      total+=bill.amount;
    })
    setTotalBill(parseInt(total));
    console.log(typeof(total));
  }, [userBills]);



  const [addFormData, setAddFormData] = useState({
    id:"",
    description: "",
    category: "",
    amount: 0,
    date: "",
  });

  const [editFormData, setEditFormData] = useState({
    description: "",
    category: "",
    amount: 0,
    date: "",
  });

  const [editBillId, setEditBillId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    if(fieldName === "amount") {fieldValue = parseInt(event.target.value) }
    console.log(typeof(fieldValue));
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event,billId) => {
    event.preventDefault();
    console.log(billId);
    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;
    if(fieldName === "amount") {fieldValue = parseInt(event.target.value) }

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    let flag = false;
    userBills.map((bill) => {
            if(bill.id === addFormData.id){
            flag = true;
        }
    })
    if(flag){
        alert("Id already in use");
    }
    else{
      if(totalBill+addFormData.amount>50000)
      {
        alert("You exceeded your monthly budget");
      }
      else{
        const newBill = {
        id: addFormData.id,
        description: addFormData.description,
        category: addFormData.category,
        amount: addFormData.amount,
        date: addFormData.date,
        };

        const newBills = [...userBills, newBill];
        setUserBills(newBills);
      }
    }
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedBill = {
      id: editBillId,
      description: editFormData.description,
      category: editFormData.category,
      amount: editFormData.amount,
      date: editFormData.date,
    };

    const newBills = [...userBills];

    const index = userBills.findIndex((bill) => bill.id === editBillId);

    newBills[index] = editedBill;

    setUserBills(newBills);
    setEditBillId(null);
  };

  const handleEditClick = (event, bill) => {
    event.preventDefault();
    setEditBillId(bill.id);

    const formValues = {
      description: bill.description,
      category: bill.category,
      amount: bill.amount,
      date: bill.date,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditBillId(null);
  };

  const handleRemoveClick = (billId) => {
    const newUserBills = [...userBills];

    const index = userBills.findIndex((bill) => bill.id === billId);

    newUserBills.splice(index, 1);

    setUserBills(newUserBills);
  };

  const handleCategoryChange = (event)=> {
    setSelectedCategory(event.target.value);
    if(event.target.value === "all"){
      setUserBills(selectedBills);
    }
    else{
      const filteredBills = selectedBills.filter(bill => bill.category === event.target.value);
      setUserBills(filteredBills);
    }
 }


  return (<>
    <div className="content-section">
      <h2>Your Monthly Budget Is : 50000</h2>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Description</th>
              <th>Category 
                <select name="category" onChange={handleCategoryChange} className="drop-down-filter">
                <option value="all">all</option>
                <option value="Food & Dining">Food & Dining</option>
                <option value="utility">utility</option>
                <option value="shopping">shopping</option>
                <option value="education">education</option>
                <option value="Travel">Travel</option>
                <option value="Personal Care">Personal Care</option>
                </select>
              </th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userBills.map((bill) => (
              <Fragment>
                {editBillId === bill.id ? (
                  <EditableRow
                    billId = {editBillId}
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    bill={bill}
                    handleEditClick={handleEditClick}
                    handleRemoveClick={handleRemoveClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <h2>Total Amount : {totalBill} </h2>
      <h2>Add new Bill</h2>
      <form onSubmit={handleAddFormSubmit}>
      <input
          type="text"
          name="id"
          required="required"
          placeholder="Enter id..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="description"
          required="required"
          placeholder="Enter a description..."
          onChange={handleAddFormChange}
        />
        <select name="category" onChange={handleAddFormChange} className="drop-down-filter">
            <option value="all">all</option>
            <option value="Food & Dining">Food & Dining</option>
            <option value="utility">utility</option>
            <option value="shopping">shopping</option>
            <option value="education">education</option>
            <option value="Travel">Travel</option>
            <option value="Personal Care">Personal Care</option>
        </select>
        <input
          type="number"
          name="amount"
          required="required"
          placeholder="Enter amount..."
          onChange={handleAddFormChange}
        />
        <input
          type="date"
          name="date"
          required="required"
          placeholder="Enter date..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
      
    </div>
    <TimeSeries width={400} height={300} data={userBills}/>
    </>
  );
};

export default App;