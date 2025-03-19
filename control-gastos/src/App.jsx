import { useState } from 'react';
import { TransactionProvider } from './context/TransactionContext';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import { Navbar, Nav } from 'react-bootstrap';
import { FaChartPie, FaPlus, FaList } from 'react-icons/fa';

function App() {
  const [activePage, setActivePage] = useState('summary');

  return (
    <TransactionProvider>
      <div className="container mt-4">
        {/* Navbar de Bootstrap*/}
        <Navbar
          bg="primary"
          variant="dark"
          expand="lg"
          className="mb-4 rounded"
        >
          <div className="container">
            <Navbar.Brand>💰 Control de Gastos</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  onClick={() => setActivePage('summary')}
                  active={activePage === 'summary'}
                >
                  <FaChartPie /> Resumen
                </Nav.Link>
                <Nav.Link
                  onClick={() => setActivePage('form')}
                  active={activePage === 'form'}
                >
                  <FaPlus /> Agregar
                </Nav.Link>
                <Nav.Link
                  onClick={() => setActivePage('list')}
                  active={activePage === 'list'}
                >
                  <FaList /> Historial
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>

        {/* Renderizado condicional de componentes */}
        {activePage === 'summary' && <Summary />}
        {activePage === 'list' && <TransactionList />}
        {activePage === 'form' && <TransactionForm />}
      </div>
    </TransactionProvider>
  );
}

export default App;
