import { useContext, useState } from 'react';
import { TransactionContext } from '../context/TransactionContext';

function TransactionList() {
  const { transactions, dispatch } = useContext(TransactionContext);
  const [filter, setFilter] = useState('all');

  const [editingTransaction, setEditingTransaction] = useState(null);
  const [updatedText, setUpdatedText] = useState('');
  const [updateAmount, setUpdateAmount] = useState('');

  //Filtrar transacciones segun la pocion seleccionada
  const filteredTransactions = transactions.filter((tx) => {
    if (filter === 'income') return tx.amount > 0;
    if (filter === 'expense') return tx.amount < 0;
    return true;
  });

  // Funcion para iniciar la edicion de una transaccion
  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
    setUpdatedText(transaction.name);
    setUpdateAmount(transaction.amount);
  };

  // Funcion para guardar la edicion
  const handleSaveEdit = () => {
    dispatch({
      type: 'EDIT_TRANSACTION',
      payload: {
        id: editingTransaction.id,
        name: updatedText,
        amount: parseFloat(updateAmount),
      },
    });
    setEditingTransaction(null); // salir del modo edicion
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center">Historial de transacciones</h3>

      {/* Filtro de transacciones */}
      <div className="mb-3 text-center">
        <select
          className="form-select-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option defaultValue={'all'}>Todas</option>
          <option value={'income'}>Ingresos</option>
          <option value={'expense'}>Gastos</option>
        </select>
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
              {editingTransaction?.id === tx.id ? (
                <>
                  <input
                    type="text"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                    className="form-control me-2"
                  />
                  <input
                    type="number"
                    value={updateAmount}
                    onChange={(e) => setUpdateAmount(e.target.value)}
                    className="form-control me-2"
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="btn btn-success btn-sm me-2"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingTransaction(null)}
                    className="btn btn-secondary btn-sm me-2"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <span>
                    <strong>${tx.amount}: </strong>
                    {tx.name}
                  </span>
                  <div>
                    <button
                      onClick={() => handleEditClick(tx)}
                      className="btn btn-warning btn-sm me-2"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() =>
                        dispatch({ type: 'DELETE_TRANSACTION', payload: tx.id })
                      }
                      className="btn btn-danger btn-sm"
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TransactionList;
