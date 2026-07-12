"use client";
import { useState } from "react";

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const monthlyRate = interestRate / 12 / 100;
  const months = tenure * 12;
  const emi = monthlyRate === 0
    ? loanAmount / months
    : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = emi * months;
  const totalInterest = totalPayment - loanAmount;

  return (
    <main className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow mt-6">
        <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: "#0a1628" }}>EMI Calculator</h1>

        <div className="mb-5">
          <label className="text-sm font-bold flex justify-between">
            <span>Loan Amount</span>
            <span style={{ color: "#c9a84c" }}>₹{loanAmount.toLocaleString("en-IN")}</span>
          </label>
          <input type="range" min="100000" max="50000000" step="50000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full mt-2" />
        </div>

        <div className="mb-5">
          <label className="text-sm font-bold flex justify-between">
            <span>Interest Rate</span>
            <span style={{ color: "#c9a84c" }}>{interestRate}%</span>
          </label>
          <input type="range" min="5" max="15" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full mt-2" />
        </div>

        <div className="mb-6">
          <label className="text-sm font-bold flex justify-between">
            <span>Loan Tenure</span>
            <span style={{ color: "#c9a84c" }}>{tenure} Years</span>
          </label>
          <input type="range" min="1" max="30" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full mt-2" />
        </div>

        <div className="rounded-xl p-5 text-center" style={{ background: "#0a1628" }}>
          <p className="text-xs" style={{ color: "#e8d5a3" }}>Monthly EMI</p>
          <p className="text-3xl font-bold text-white">₹{Math.round(emi).toLocaleString("en-IN")}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-gray-100 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500">Total Interest</p>
            <p className="font-bold text-sm" style={{ color: "#0a1628" }}>₹{Math.round(totalInterest).toLocaleString("en-IN")}</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500">Total Payment</p>
            <p className="font-bold text-sm" style={{ color: "#0a1628" }}>₹{Math.round(totalPayment).toLocaleString("en-IN")}</p>
          </div>
        </div>

        <a href="https://wa.me/917820008509?text=EMI Calculator se property enquiry" className="mt-6 block text-center py-3 rounded-lg font-bold text-white" style={{ background: "#25D366" }}>
          WhatsApp Se Enquiry Karein
        </a>
      </div>
    </main>
  );
}
