import React, { useState, useEffect } from 'react';

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
      /* Styles for centering and stretching */
      .dashboard-container {
        display: flex;
        flex-direction: column;
        align-items: center; /* Centers content horizontally */
        width: 100%; /* Stretches to full width */
        padding: 0 4rem; /* Adds larger side margins */
      }
      .dashboard-content {
        width: 100%; /* Ensures inner content fills available width */
        max-width: 1600px; /* Optional: sets max width to prevent excessive stretching on very wide screens */
      }
    `;
    document.head.appendChild(style);

    fetchUsers();

    return () => {
      // Clean up injected styles when component unmounts
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors

      // Original fetch call to the API
      const response = await await fetch('/api/user/');
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

  // Loading state UI
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

  // Error state UI
  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="alert alert-danger text-center" role="alert">
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
    <div className="min-vh-100 bg-light py-5 d-flex justify-content-center"> {/* Aligns content to center */}
      <div className="dashboard-container"> {/* Container for responsive layout */}
        <div className="dashboard-content"> {/* Content wrapper */}

          {/* Header */}
          <div className="text-center mb-5 mt-4">
            <h1 className="display-3 fw-bold text-dark mb-2">Kto jest winny Ci pieniądze?</h1>
            <p className="lead text-muted">Wybierz! Liczba użytkowników ({users.length})</p>
          </div>

          {/* Table */}
          <div className="bg-white rounded shadow-lg overflow-hidden">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th className="text-center py-3">ID</th>
                    <th className="py-3">Użytkownik</th>
                    <th className="py-3">Email</th>
                    <th className="py-3">Telefon</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      onClick={() => handleUserClick(user)}
                      className="cursor-pointer"
                    >
                      <td className="text-center align-middle py-3">
                        <small className="text-muted">#{user.id}</small>
                      </td>
                      <td className="align-middle py-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar-custom rounded-circle d-flex align-items-center justify-content-center text-white fw-semibold me-3"
                               style={{width: '50px', height: '50px', fontSize: '1rem'}}>
                            {user.name.charAt(0)}{user.surname.charAt(0)}
                          </div>
                          <div>
                            <div className="fw-bold text-dark">
                              {user.name} {user.surname}
                            </div>
                            <small className="text-primary">@{user.nickname}</small>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle py-3">{user.email}</td>
                      <td className="align-middle py-3">{user.phoneNumber || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {users.length === 0 && (
              <div className="text-center py-5">
                <div className="display-4 mb-3">👥</div>
                <h3 className="h5 fw-medium text-dark mb-2">Brak użytkowników</h3>
                <p className="text-muted mb-0">Nie znaleziono żadnych użytkowników.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
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
                       style={{width: '100px', height: '100px', fontSize: '2rem'}}>
                    {selectedUser.name.charAt(0)}{selectedUser.surname.charAt(0)}
                  </div>
                  <h4 className="mt-3 mb-1">{selectedUser.name} {selectedUser.surname}</h4>
                  <p className="text-muted lead">@{selectedUser.nickname}</p>
                </div>

                <div className="row g-3 fs-5">
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
