/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import { DEFAULT_INCOME } from "./utils/constants";
import AddBalance from "./components/AddBalance";
import ExpensePieChart from "./components/ExpensePieChart";
import TopCategoriesBarChart from "./components/TopCategoriesBarChart";
import ExpensesListWithSnackbar from "./components/ExpensesList";
import AddExpenseWithSnackbar from "./components/AddExpense";

function App() {
  const [income, setIncome] = useState(DEFAULT_INCOME);
  const [expense, setExpense] = useState([]);

  // Load data from local storage on component mount
  useEffect(() => {
    const savedIncome = localStorage.getItem("income");
    const savedExpense = localStorage.getItem("expense");
    if (savedIncome) {
      setIncome(JSON.parse(savedIncome));
      console.log(JSON.parse(savedIncome));
    }

    if (savedExpense) {
      setExpense(JSON.parse(savedExpense));
    }
  }, []);

  // Save data to local storage whenever income or expense changes
  console.log(income, expense);
  useEffect(() => {
    localStorage.setItem("income", JSON.stringify(income));
  }, [income]);

  useEffect(() => {
    localStorage.setItem("expense", JSON.stringify(expense));
  }, [expense]);

  return (
    <>
      <Header />
      <div className="window_one">
        <div className="wallet_window">
          <AddBalance income={income} setIncome={setIncome} />
        </div>
        <div className="wallet_window">
          <AddExpenseWithSnackbar
            expense={expense}
            setExpense={setExpense}
            setIncome={setIncome}
            income={income}
          />
        </div>
        <ExpensePieChart expense={expense} />
      </div>
      <div className="bottom_info">
        <div className="expense_list">
          <ExpensesListWithSnackbar
            expense={expense}
            setExpense={setExpense}
            setIncome={setIncome}
            income={income}
          />
        </div>
        <div>
          <TopCategoriesBarChart expense={expense} />
        </div>
      </div>
    </>
  );
}

export default App;
