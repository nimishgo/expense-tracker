import PropTypes from "prop-types";
import { useState } from "react";
import { useSnackbar, SnackbarProvider } from "notistack";

function AddExpense({ expense, setExpense, setIncome, income }) {
  const [fields, setFields] = useState({
    category: "",
    name: "",
    expense: "",
    date: "",
  });
  const [form, setForm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target[2].id === "expense") {
      if (fields.expense !== "") {
        const newIncome = parseFloat(fields.expense);

        if (income - newIncome < 0) {
          enqueueSnackbar("Expense cannot be less than 0!", {
            variant: "error",
          });
          return;
        }

        setIncome((val) => val - newIncome);
      }
    }
    setForm(!form);
    setExpense((prevExpenses) => [...prevExpenses, fields]);
    setFields({
      category: "",
      name: "",
      expense: "",
      date: "",
    });
  };

  return (
    <>
      <h3>Expense</h3>
      <h4>
        Total Expense :{" "}
        {expense.reduce((acc, curr) => acc + parseFloat(curr.expense), 0)}
      </h4>
      <button onClick={() => setForm(!form)}>Add Expense</button>
      {form && (
        <div className="modal_shell">
          <form onSubmit={handleSubmit} className="form_income">
            <label htmlFor="category" id="input_label">
              Category{" "}
            </label>
            <input
              type="text"
              id="category"
              value={fields.category}
              onChange={handleChange}
              className="form_input"
            />
            <br />
            <label htmlFor="name" id="input_label">
              Name{" "}
            </label>
            <input
              type="text"
              id="name"
              value={fields.name}
              onChange={handleChange}
              className="form_input"
            />
            <br />
            <label htmlFor="expense" id="input_label">
              Expense{" "}
            </label>
            <input
              type="number"
              id="expense"
              value={fields.expense}
              onChange={handleChange}
              className="form_input"
            />
            <br />
            <label htmlFor="date" id="input_label">
              Date
            </label>
            <input
              type="datetime-local"
              id="date"
              value={fields.date}
              onChange={handleChange}
              className="form_input"
            />
            <br />
            <div className="form_buttons">
              <button type="submit">Submit</button>
              <button onClick={() => setForm(!form)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

AddExpense.propTypes = {
  expense: PropTypes.array.isRequired,
  setExpense: PropTypes.func.isRequired,
  setIncome: PropTypes.func.isRequired,
  income: PropTypes.number,
};

const AddExpenseWithSnackbar = (props) => (
  <SnackbarProvider>
    <AddExpense {...props} />
  </SnackbarProvider>
);

export default AddExpenseWithSnackbar;
