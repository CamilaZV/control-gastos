import { createContext, useEffect, useReducer } from 'react';

// Estado inicial
const initialState = {
  transactions: [], //Lista de ingresos/gastos
};

//Reducer para manejar acciones
function transactionReducer(state, action) {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };

    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(
          (tx) => tx.id !== action.payload
        ),
      };

    case 'EDIT_TRANSACTION': // Nuevo caso
      return {
        ...state,
        transactions: state.transactions.map((tx) =>
          tx.id === action.payload.id ? action.payload : tx
        ),
      };

    default:
      return state;
  }
}

// Crear el contexto
export const TransactionContext = createContext();

// Proveedor del contexto
export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  // useEffect(() => {
  //   localStorage.setItem('transactions', JSON.stringify(state.transactions));
  // }, [state.transactions]);

  //Cargar transacciones de la API con fetch
  useEffect(() => {
    fetch('http://localhost:5000/transactions')
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: 'SET_TRANSACTIONS', payload: data });
      })
      .catch((error) => console.error('Error carganado transacciones:', error));
  }, []);

  //Agregar transaccion
  const addTransaction = async (transaction) => {
    try {
      const response = await fetch('http://localhost:5000/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction),
      });

      const newTransaction = await response.json();
      dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
    } catch (error) {
      console.error('Error al agregar transaccion:', error);
    }
  };

  //Eliminar transaccion
  const deleteTransaction = async (id) => {
    try {
      await fetch(`http://localhost:5000/transactions/${id}`, {
        method: 'DELETE',
      });
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id,
      });
    } catch (error) {
      console.error('Error al eliminaar transaccion', error);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions: state.transactions,
        dispatch,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
