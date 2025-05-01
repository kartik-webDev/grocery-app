
import React, { useState } from "react";

const PayLater = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, item: "Laptop", amount: 50000, dueDate: "2025-05-10", paid: false },
    { id: 2, item: "Smartphone", amount: 25000, dueDate: "2025-05-15", paid: false },
  ]);

  const handlePayment = (id) => {
    setTransactions(transactions.map(tx => 
      tx.id === id ? { ...tx, paid: true } : tx
    ));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h1 className="text-xl font-bold mb-4">Pay Later Transactions</h1>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.id} className="flex justify-between items-center p-3 border-b">
            <div>
              <p>{tx.item}</p>
              <p className="text-sm text-gray-500">Amount: ₹{tx.amount}</p>
              <p className="text-sm text-gray-500">Due: {tx.dueDate}</p>
            </div>
            <button
              className={`px-3 py-2 text-white ${
                tx.paid ? "bg-green-500 cursor-not-allowed" : "bg-blue-500"
              }`}
              onClick={() => handlePayment(tx.id)}
              disabled={tx.paid}
            >
              {tx.paid ? "Paid" : "Pay Now"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PayLater;