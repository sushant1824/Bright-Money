import React from "react";

const ReadOnlyRow = ({ bill, handleEditClick, handleRemoveClick }) => {
  return (
    <tr>
      <td>{bill.id}</td>
      <td>{bill.description}</td>
      <td>{bill.category}</td>
      <td>{bill.amount}</td>
      <td>{bill.date}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, bill)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleRemoveClick(bill.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;