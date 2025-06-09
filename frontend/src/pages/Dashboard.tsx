import React, { useState, useEffect } from 'react';

/**
 * @deprecated This function is deprecated. Use UserContext instead.
 */
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Invalid token", e);
    return null;
  }
}

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Bootstrap CSS CDN
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Custom CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .spinner-custom {
        animation: spin 1s linear infinite;
      }
      .table-hover tbody tr:hover {
        background-color: #f8f9fa !important;
      }
      .cursor-pointer {
        cursor: pointer;
      }
      .avatar-custom {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
    `;
    document.head.appendChild(style);

    fetchUsers();

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem("token");
  
      const response = await fetch('/api/user/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Błąd podczas pobierania użytkowników');
      }
  
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const handleExpensesClick = () => {
    window.location.href = `/expenses/${selectedUser.id}`;
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary spinner-custom mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="text-muted">Ładowanie użytkowników...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="alert alert-danger text-center" role="alert" style={{maxWidth: '400px'}}>
          <h4>Błąd</h4>
          <p>{error}</p>
          <button onClick={fetchUsers} className="btn btn-danger">
            Spróbuj ponownie
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light p-4">
      <div className="container-fluid">
        
        <div className="text-center mb-4">
          <h1 className="display-4 fw-bold text-dark mb-2">Dashboard</h1>
          <p className="text-muted">Lista użytkowników ({users.length})</p>
        </div>

        <div className="bg-white rounded shadow-sm overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th className="text-center">ID</th>
                  <th>Użytkownik</th>
                  <th>Email</th>
                  <th>Telefon</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => handleUserClick(user)}
                    className="cursor-pointer"
                  >
                    <td className="text-center align-middle">
                      <small className="text-muted">#{user.id}</small>
                    </td>
                    <td className="align-middle">
                      <div className="d-flex align-items-center">
                        <div className="avatar-custom rounded-circle d-flex align-items-center justify-content-center text-white fw-semibold me-3"
                             style={{width: '40px', height: '40px', fontSize: '0.875rem'}}>
                          {user.name.charAt(0)}{user.surname.charAt(0)}
                        </div>
                        <div>
                          <div className="fw-medium text-dark">
                            {user.name} {user.surname}
                          </div>
                          <small className="text-primary">@{user.nickname}</small>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">{user.email}</td>
                    <td className="align-middle">{user.phoneNumber || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="text-center py-5">
              <div className="display-1 mb-3">👥</div>
              <h3 className="h5 fw-medium text-dark mb-2">Brak użytkowników</h3>
              <p className="text-muted mb-0">Nie znaleziono żadnych użytkowników.</p>
            </div>
          )}
        </div>
      </div>
      {selectedUser && (
        <div className="modal d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Szczegóły użytkownika</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              
              <div className="modal-body">
                <div className="text-center mb-4">
                  <div className="avatar-custom rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold"
                       style={{width: '80px', height: '80px', fontSize: '1.5rem'}}>
                    {selectedUser.name.charAt(0)}{selectedUser.surname.charAt(0)}
                  </div>
                  <h5 className="mt-3 mb-1">{selectedUser.name} {selectedUser.surname}</h5>
                  <p className="text-muted">@{selectedUser.nickname}</p>
                </div>
                
                <div className="row g-3">
                  <div className="col-12">
                    <strong>Email:</strong> {selectedUser.email}
                  </div>
                  <div className="col-12">
                    <strong>Telefon:</strong> {selectedUser.phoneNumber || 'Brak'}
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Zamknij
                </button>
                <button type="button" className="btn btn-primary" onClick={handleExpensesClick}>
                  Rozlicz
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;