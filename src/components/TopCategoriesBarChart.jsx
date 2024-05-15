import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopCategoriesBarChart = ({ expense }) => {
  const expenseByCategory = expense.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + parseFloat(curr.expense);
    return acc;
  }, {});

  const sortedCategories = Object.keys(expenseByCategory)
    .sort((a, b) => expenseByCategory[b] - expenseByCategory[a])
    .slice(0, 5);
  const topExpenses = sortedCategories.map(
    (category) => expenseByCategory[category]
  );

  const data = {
    labels: sortedCategories,
    datasets: [
      {
        label: "Expenses by Category",
        data: topExpenses,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF9F40",
          "#4BC0C0",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF9F40",
          "#4BC0C0",
        ],
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top Trending Categories",
      },
    },
  };

  return (
    <div className="bar_chart">
      <h2>Top Trending Categories</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

TopCategoriesBarChart.propTypes = {
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

export default TopCategoriesBarChart;
