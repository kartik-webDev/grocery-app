import React from "react";

const Transactions = ({ transactions }) => {
  return (
    <div className="max-w-md text-yellow-600 mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Transaction History</h2>
      <ul className="list-disc pl-5">
        {transactions.map((txn, index) => (
          <li key={index} className="mb-2">
            {txn.type}: ₹{txn.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;