import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // <-- dodaj import
import './styles.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();  // <-- inicjalizacja hooka

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        navigate('/dashboard');  // <-- przekierowanie po sukcesie
      } else {
        setError('Niepoprawne dane logowania');
      }
    } catch (err) {
      setError('Błąd połączenia z serwerem');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Animated background elements */}
      <div className="background-circles">
        <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="circle3"></div>
      </div>

      {/* Glassmorphism card */}
      <div className="card-wrapper">
        <div className="card">
          {/* Header */}
          <div className="header">
            <div className="logo-circle">
              <svg className="logo-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h1>CashChat</h1>
            <p className="subtitle">Zaloguj się do swojego konta</p>
          </div>

          {/* Login Form */}
          <form className="form" onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email">Adres email</label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                </svg>
                <input
                  id="email"
                  type="email"
                  placeholder="twoj@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password">Hasło</label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" disabled={isLoading} className="login-btn">
              {isLoading ? (
                <>
                  <svg className="spinner" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75"/>
                  </svg>
                  <span>Logowanie...</span>
                </>
              ) : (
                <span>Zaloguj się</span>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="footer-links">
            <button type="button">Zapomniałeś hasła?</button>
            <div className="footer-register">
              Nie masz konta?{' '}
              <button type="button">Zarejestruj się</button>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="floating-ball ball1"></div>
        <div className="floating-ball ball2"></div>
      </div>
    </div>
  );
}

export default LoginPage;
