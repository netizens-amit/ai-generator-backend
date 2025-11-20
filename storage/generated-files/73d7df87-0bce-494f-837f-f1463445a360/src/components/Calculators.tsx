import React from 'react';
import { useState } from 'react';

function Calculators() {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [investmentAmount, setInvestmentAmount] = useState(5000);
  const [investmentYears, setInvestmentYears] = useState(5);
  const [interestRate, setInterestRate] = useState(5);

  const loanPayment = (amount: number, rate: number, years: number) => {
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    return (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  };

  const futureValue = (amount: number, rate: number, years: number) => {
    return amount * Math.pow(1 + rate / 100, years);
  };

  return (
    <section className="calculators">
      <h2>Financial Calculators</h2>
      <div className="calculator">
        <h3>Loan Calculator</h3>
        <label>
          Loan Amount
          <input
            type="range"
            min={1000}
            max={100000}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
          />
          ${loanAmount.toLocaleString()}
        </label>
        <label>
          Interest Rate
          <input
            type="range"
            min={1}
            max={20}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
          {interestRate}%
        </label>
        <label>
          Loan Term (Years)
          <input
            type="range"
            min={1}
            max={30}
            value={5}
            readOnly
          />
          5
        </label>
        <p>Monthly Payment: ${loanPayment(loanAmount, interestRate, 5).toFixed(2)}</p>
      </div>
      <div className="calculator">
        <h3>Investment Calculator</h3>
        <label>
          Initial Investment
          <input
            type="range"
            min={1000}
            max={100000}
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(Number(e.target.value))}
          />
          ${investmentAmount.toLocaleString()}
        </label>
        <label>
          Years to Invest
          <input
            type="range"
            min={1}
            max={50}
            value={investmentYears}
            onChange={(e) => setInvestmentYears(Number(e.target.value))}
          />
          {investmentYears}
        </label>
        <label>
          Expected Annual Return
          <input
            type="range"
            min={1}
            max={20}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
          {interestRate}%
        </label>
        <p>Future Value: ${futureValue(investmentAmount, interestRate, investmentYears).toFixed(2)}</p>
      </div>
    </section>
  );
}

export default Calculators;