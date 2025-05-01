import React, { useState } from "react";

const Wallet = () => {
  const [balance, setBalance] = useState(5000);
  const [amount, setAmount] = useState("");

  const handleDeposit = () => {
    if (balance + Number(amount)<=30000) {
        setBalance(balance + Number(amount));
        setAmount("");
    }
    else alert("Can't add more than 30000")
  };

  const handleWithdraw = () => {
    if (balance >= amount) {
      setBalance(balance - Number(amount));
      setAmount("");
    } else {
      alert("Insufficient balance!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Wallet</h2>
      <p className="text-lg text-center mb-4">Balance: ₹{balance}</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter amount"
      />
      <div className="flex justify-between">
        <button
          onClick={handleDeposit}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Deposit
        </button>
        <button
          onClick={handleWithdraw}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default Wallet;