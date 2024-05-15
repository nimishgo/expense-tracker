import PropTypes from "prop-types";
import { useState } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";

function ExpensesList({ expense, setExpense, setIncome, income }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editIndex, setEditIndex] = useState(null);
  const [fields, setFields] = useState({
    category: "",
    name: "",
    expense: "",
    date: "",
  });
  const [form, setForm] = useState(false);

  const [oldExpense, setOldExpense] = useState(0);

  const expensesPerPage = 3;
  const totalPages = Math.ceil(expense.length / expensesPerPage);
  const startIndex = (currentPage - 1) * expensesPerPage;
  const currentExpenses = expense.slice(
    startIndex,
    startIndex + expensesPerPage
  );

  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = (index) => {
    const newExpenses = [...expense];
    newExpenses.splice(index, 1);
    setExpense(newExpenses);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFields(expense[index]);
    setOldExpense(expense[index].expense);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFields((prevFields) => ({
      ...prevFields,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (income + oldExpense - e.target.expense.value < 0) {
      enqueueSnackbar("Income cannot be less than 0!", { variant: "error" });
      return; // Prevent further execution
    }

    setIncome(
      (income) => income + Number(oldExpense) - Number(e.target.expense.value)
    );

    if (editIndex !== null) {
      const newExpenses = [...expense];
      newExpenses[editIndex] = fields;
      setExpense(newExpenses);
      setEditIndex(null);
    } else {
      setExpense((prevExpenses) => [...prevExpenses, fields]);
    }
    setFields({
      category: "",
      name: "",
      expense: "",
      date: "",
    });
  };

  return (
    <div>
      <h2>Recent Transactions : </h2>
      <div className="expense_lists">
        <ul>
          {currentExpenses.map((exp, index) => (
            <li key={index} className="items">
              {console.log()}
              <span>{`Category: ${exp.category}, Name: ${exp.name}, Expense: ${
                exp.expense
              }, Date: ${new Date(exp.date).toLocaleDateString()}`}</span>
              &nbsp; &nbsp; &nbsp;
              <button onClick={() => handleDelete(startIndex + index)}>
                Delete
              </button>
              &nbsp; &nbsp; &nbsp;
              <button
                onClick={() => {
                  setForm(!form);
                  handleEdit(startIndex + index);
                }}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      {editIndex !== null && form && (
        <div className="modal_shell">
          <form onSubmit={handleSubmit} className="form_income">
            <label htmlFor="category">Category </label>
            <input
              type="text"
              id="category"
              value={fields.category}
              onChange={handleChange}
              className="form_input"
            />
            <br />
            <label htmlFor="name">Name </label>
            <input
              type="text"
              id="name"
              value={fields.name}
              onChange={handleChange}
              className="form_input"
            />
            <br />
            <label htmlFor="expense">Expense </label>
            <input
              type="number"
              id="expense"
              value={fields.expense}
              onChange={handleChange}
              className="form_input"
            />
            <br />
            <label htmlFor="date">Date </label>
            <input
              type="datetime-local"
              id="date"
              value={fields.date}
              onChange={handleChange}
              className="form_input"
            />
            <br />
            <div className="form_buttons">
              <button type="submit">Update</button>
              <button onClick={() => setForm(!form)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

ExpensesList.propTypes = {
  expense: PropTypes.array.isRequired,
  income: PropTypes.number,
  setExpense: PropTypes.func.isRequired,
  setIncome: PropTypes.func.isRequired,
};

const ExpensesListWithSnackbar = (props) => (
  <SnackbarProvider>
    <ExpensesList {...props} />
  </SnackbarProvider>
);

export default ExpensesListWithSnackbar;
