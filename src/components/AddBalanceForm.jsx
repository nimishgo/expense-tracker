import { useState } from "react";
import PropTypes from "prop-types";

const AddBalanceForm = ({ setIncome, balanceHandle, setForm }) => {
  const [val, setVal] = useState(0);
  return (
    <>
      <div className="modal_shell">
        <form
          className="form_income"
          onSubmit={(e) => {
            setIncome((v) => v + Number(val));
            setVal(0);
            balanceHandle(false);
            e.preventDefault();
          }}
        >
          <label htmlFor="form_input" id="input_label">
            Add Balance
          </label>
          <input
            type="number"
            className="form_input"
            id="form_input"
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
              console.log(e.target.value);
            }}
          />
          <br />
          <div className="form_buttons">
            <button type="submit">Add Balance</button>
            <button
              onClick={(e) => {
                setForm(false);
                e.preventDefault();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

AddBalanceForm.propTypes = {
  setIncome: PropTypes.func,
  balanceHandle: PropTypes.func,
  setForm: PropTypes.func,
};

export default AddBalanceForm;
