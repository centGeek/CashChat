import React, { useState, useEffect } from 'react';

const Expenses = () => {
  const getUserIdFromUrl = () => {
    const path = window.location.pathname;
    const parts = path.split('/');
    return parts[parts.length - 1];
  };
  
  const id = getUserIdFromUrl();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .spinner-custom {
        animation: spin 1s linear infinite;
      }
      .card-hover:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
      }
      .expense-card {
        border-left: 4px solid #007bff;
      }
      .expense-value {
        font-size: 1.25rem;
        font-weight: bold;
      }
      .type-badge {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
      }
    `;
    document.head.appendChild(style);

    fetchExpenses();

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, [id]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem("token");
  
      const response = await fetch(`/api/expense/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Błąd ${response.status}: ${errorText || 'Błąd podczas pobierania wydatków'}`);
      }
  
      const responseText = await response.text();
      
      if (!responseText) {
        setExpenses([]);
        return;
      }
      
      try {
        const data = JSON.parse(responseText);
        setExpenses(data || []);
        
        if (data && data.length > 0) {
          setUserInfo(data[0].userEntity);
        }
      } catch (parseError) {
        console.error('Błąd parsowania JSON:', parseError);
        console.error('Otrzymana odpowiedź:', responseText);
        throw new Error('Otrzymano nieprawidłową odpowiedź z serwera');
      }
    } catch (err) {
      console.error('Błąd podczas pobierania wydatków:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN'
    }).format(value);
  };

  const getTypeOfDivisionBadge = (type) => {
    const types = {
      'EQUAL': { text: 'Równo', class: 'bg-primary' },
      'PERCENTAGE': { text: 'Procent', class: 'bg-success' },
      'AMOUNT': { text: 'Kwota', class: 'bg-warning' },
      'CUSTOM': { text: 'Własny', class: 'bg-info' }
    };
    
    const typeInfo = types[type] || { text: type, class: 'bg-secondary' };
    return (
      <span className={`badge ${typeInfo.class} type-badge`}>
        {typeInfo.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary spinner-custom mb-3" role="status" style={{width: '3rem', height: '3rem'}}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="text-muted">Ładowanie wydatków...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="alert alert-danger text-center" role="alert">
                <h4 className="alert-heading">Błąd</h4>
                <p>{error}</p>
                <hr />
                <div className="d-flex gap-2 justify-content-center">
                  <button onClick={fetchExpenses} className="btn btn-danger">
                    Spróbuj ponownie
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-4">
        
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <button onClick={goBack} className="btn btn-outline-secondary me-3">
              <i className="bi bi-arrow-left"></i> Powrót
            </button>
          </div>
          <div className="text-center flex-grow-1">
            <h1 className="display-5 fw-bold text-dark mb-2">Wydatki użytkownika</h1>
            {userInfo && (
              <p className="text-muted mb-0">
                {userInfo.name} {userInfo.surname} (@{userInfo.nickname})
              </p>
            )}
            <p className="text-muted">Znaleziono {expenses.length} wydatków</p>
          </div>
          <div style={{width: '120px'}}></div>
        </div>

        {/* Summary Card */}
        {expenses.length > 0 && (
          <div className="row mb-4">
            <div className="col-md-4 mx-auto">
              <div className="card bg-primary text-white text-center">
                <div className="card-body">
                  <h5 className="card-title">Łączna wartość</h5>
                  <h3 className="card-text">
                    {formatCurrency(expenses.reduce((sum, expense) => sum + parseFloat(expense.value), 0))}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {expenses.length > 0 ? (
          <div className="row">
            {expenses.map((expense) => (
              <div key={expense.id} className="col-lg-6 col-xl-4 mb-4">
                <div className="card h-100 expense-card card-hover">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="card-title text-truncate me-2">
                        {expense.description}
                      </h5>
                      {getTypeOfDivisionBadge(expense.typeOfDivision)}
                    </div>
                    
                    <div className="expense-value text-success mb-3">
                      {formatCurrency(expense.value)}
                    </div>
                    
                    {expense.groupEntity && (
                      <div className="mb-2">
                        <small className="text-muted">Grupa:</small>
                        <div className="fw-medium">{expense.groupEntity.name}</div>
                      </div>
                    )}
                    
                    <div className="mt-auto">
                      <small className="text-muted">
                        ID: #{expense.id}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="mb-4">
              <i className="bi bi-receipt" style={{fontSize: '4rem', color: '#6c757d'}}></i>
            </div>
            <h3 className="h4 fw-medium text-dark mb-3">Brak wydatków</h3>
            <p className="text-muted mb-4">
              Ten użytkownik nie ma jeszcze żadnych wydatków.
            </p>
            <button onClick={goBack} className="btn btn-primary">
              Powrót
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expenses;