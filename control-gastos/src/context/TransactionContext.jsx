import { createContext, useEffect, useReducer } from 'react';

// Estado inicial
const initialState = {
  transactions: JSON.parse(localStorage.getItem('transactions')) || [], //Lista de ingresos/gastos
};

//Reducer para manejar acciones
function transactionReducer(state, action) {
  switch (action.type) {
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

    case "EDIT_TRANSACTION": // Nuevo caso
      return {...state,
        transactions: state.transactions.map(tx => tx.id === action.payload.id ? action.payload : tx)
      }

    default:
      return state;
  }
}

// Crear el contexto
export const TransactionContext = createContext();

// Proveedor del contexto
export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(state.transactions));
  }, [state.transactions]);

  return (
    <TransactionContext.Provider
      value={{ transactions: state.transactions, dispatch }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

