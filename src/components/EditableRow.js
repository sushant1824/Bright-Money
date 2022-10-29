import React from "react";

const EditableRow = ({
  billId,
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        {billId}
      </td>  
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a description..."
          name="description"
          value={editFormData.description}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
      <select name="category" onChange={handleEditFormChange} value={editFormData.category} className="drop-down-filter">
            <option value="all">all</option>
            <option value="Food & Dining">Food & Dining</option>
            <option value="utility">utility</option>
            <option value="shopping">shopping</option>
            <option value="education">education</option>
            <option value="Travel">Travel</option>
            <option value="Personal Care">Personal Care</option>
        </select>
      </td>
      <td>
        <input
          type="number"
          required="required"
          placeholder="Enter amount..."
          name="amount"
          value={editFormData.amount}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter date..."
          name="date"
          value={editFormData.date}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;