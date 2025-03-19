import React, { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'

function Summary() {

    const { transactions } = useContext(TransactionContext)

    // Calcular ingresos, gastos y balance total 
    const income = transactions
        .filter(tx => tx.amount > 0)
        .reduce((acc, tx) => acc + tx.amount, 0);

    const expense = transactions
        .filter(tx => tx.amount < 0)
        .reduce((acc, tx) => acc + tx.amount, 0);

        const balance = income + expense;

  return (
    <div className='container mt-4'>
        <div className='row text-center'>
            <div className='col-md-4'>
                <div className='p-3 border rounded bg-light shadow'>
                    <h4>Ingresos</h4>
                    <p className='text-success fw-bold'>${income.toFixed(2)}</p>
                </div>
            </div>
            <div className="col-md-4 mt-2">
                <div className="p-3 border rounded bg-light shadow">
                    <h4>Gastos</h4>
                    <p className="text-danger fw-bold">${expense.toFixed(2)}</p>
                </div>
            </div>
            <div className="col-md-4 mt-2">
                <div className="p-3 border rounded bg-light shadow">
                    <h4>Saldo TOTAL</h4>
                    <p className={`fw-bold ${balance >= 0 ? "text-success" : "text-danger"}`}>${balance.toFixed(2)}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Summary