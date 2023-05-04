import React, { useReducer } from "react";

function BudgetCalculator({ totalBudget }) {
  const [state, dispatch] = useReducer(reducer, {
    budget: totalBudget,
    remaining: totalBudget,
  });

  function reducer(state, action) {
    switch (action.type) {
      case "ADD_TO_BUDGET":
        return {
          ...state,
          budget: state.budget + action.amount,
          remaining: state.remaining + action.amount,
        };
      case "SUBTRACT_FROM_BUDGET":
        return {
          ...state,
          remaining: state.remaining - action.amount,
        };
      default:
        return state;
    }
  }

  const handleAddToBudget = (amount) => {
    dispatch({ type: "ADD_TO_BUDGET", amount });
  };

  const handleSubtractFromBudget = (amount) => {
    dispatch({ type: "SUBTRACT_FROM_BUDGET", amount });
  };

  return (
    <div>
      <p>
        Total budget: <strong>${state.budget}</strong>
      </p>
      <p>
        Remaining budget: <strong>${state.remaining}</strong>
      </p>
      <BudgetForm onAddToBudget={handleAddToBudget} />
      <BudgetList onSubtractFromBudget={handleSubtractFromBudget} />
    </div>
  );
}

function BudgetForm({ onAddToBudget }) {
  const [amount, setAmount] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddToBudget(Number(amount));
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="amount">Add to budget:</label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function BudgetList({ onSubtractFromBudget }) {
  const expenses = [
    { id: 1, description: "Venue rental", amount: 500 },
    { id: 2, description: "Catering", amount: 200 },
    { id: 3, description: "Photography", amount: 300 },
  ];

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description} - ${expense.amount}
            <button onClick={() => onSubtractFromBudget(expense.amount)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BudgetCalculator;
