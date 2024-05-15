import { useState } from "react";
import PropTypes from "prop-types";

import AddBalanceForm from "./AddBalanceForm";

export default function AddBalance({ income, setIncome }) {
  const [form, setForm] = useState(false);
  const balanceHandle = () => {
    setForm(!form);
  };

  return (
    <>
      <h3>Wallet Balance</h3>
      <p>{income}</p>
      <button onClick={balanceHandle}>+ &nbsp; Add Balance</button>
      {form && (
        <AddBalanceForm
          setIncome={setIncome}
          setForm={setForm}
          balanceHandle={balanceHandle}
        />
      )}
    </>
  );
}

AddBalance.propTypes = {
  income: PropTypes.number.isRequired,
  setIncome: PropTypes.func,
};
