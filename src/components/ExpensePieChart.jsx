import PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = ({ expense }) => {
  const expenseByCategory = expense.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + parseFloat(curr.expense);
    return acc;
  }, {});

  const categories = Object.keys(expenseByCategory);
  const expenses = Object.values(expenseByCategory);

  const data = {
    labels: categories,
    datasets: [
      {
        data: expenses,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF9F40",
          "#4BC0C0",
          "#9966FF",
          "#FF6384",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF9F40",
          "#4BC0C0",
          "#9966FF",
          "#FF6384",
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Expenses by Category</h2>
      <Pie data={data} id="pie_chart" />
    </div>
  );
};

ExpensePieChart.propTypes = {
  expense: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      expense: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ExpensePieChart;
