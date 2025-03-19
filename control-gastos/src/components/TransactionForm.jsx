import React, { useContext, useState } from 'react';
import { TransactionContext } from '../context/TransactionContext';

function TransactionForm() {
  const { dispatch } = useContext(TransactionContext);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !amount) {
      alert('Por favor ingresa nombre y valor.');
      return;
    }

    const newTransaction = {
      id: Date.now(),
      name,
      amount: parseFloat(amount),
    };

    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });

    //Limpiaar el formulario
    setName('');
    setAmount('');
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center">Agregar Transaccion</h2>
      <form onSubmit={handleSubmit} className="p-3 border rounded shadow">
        <div className="mb-3">
          <label className="form-label">Nombre de la transaccion: </label>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre de la transaccion"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Monto: </label>
          <input
            type="number"
            className="form-control"
            placeholder="$0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Agregar
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
