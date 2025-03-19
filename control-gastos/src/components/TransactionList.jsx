import { useContext, useState } from 'react';
import { TransactionContext } from '../context/TransactionContext';

function TransactionList() {
  const { transactions, dispatch } = useContext(TransactionContext);
  const [filter, setFilter] = useState('all');

  //Filtrar transacciones segun la pocion seleccionada
  const filteredTransactions = transactions.filter(tx =>{
    if (filter === 'income') return tx.amount > 0;
    if (filter === 'expense') return tx.amount < 0;
    return true;
  }); 

  return (
    <div className="container mt-4">
      <h3 className="text-center">Historial de transacciones</h3>

      {/* Filtro de transacciones */}
      <div  className="mb-3 text-center">
        <button className="btn btn-outline-primary mx-1"  onClick={() => setFilter('all')}>Todas</button>
        <button className="btn btn-outline-success mx-1" onClick={() => setFilter('income')}>Ingresos</button>
        <button className="btn btn-outline-danger mx-1" onClick={() => setFilter('expense')}>Gastos</button>
      </div>

      <ul className="list-group">
        {filteredTransactions.length === 0 ? (
          <p className="text-center text-muted">
            No hay transacciones registradas en esta categoria.
          </p>
        ) : (
          filteredTransactions.map((tx) => (
            <li
              key={tx.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>${tx.amount}: </strong>{tx.name}
              </span>
              <button
                onClick={() =>
                  dispatch({ type: 'DELETE_TRANSACTION', payload: tx.id })
                }
                className="btn btn-danger btn-sm"
              >
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TransactionList;
