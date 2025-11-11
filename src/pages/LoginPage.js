import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser, saveUserSession } from '../data/consultantsData';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState('consultant'); // consultant, admin, client
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const user = authenticateUser(username, password, loginType);

    if (user) {
      // Oturum bilgisini kaydet
      const sessionData = {
        ...user,
        role: loginType
      };
      saveUserSession(sessionData);

      // Yönlendirme
      if (loginType === 'admin') {
        navigate('/admin');
      } else if (loginType === 'consultant') {
        navigate('/falci-panel');
      } else {
        navigate('/');
      }
    } else {
      setError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>🔐 Giriş Yap</h1>

        <div className="login-type-selector">
          <button
            className={loginType === 'consultant' ? 'active' : ''}
            onClick={() => setLoginType('consultant')}
          >
            👤 Falcı Girişi
          </button>
          <button
            className={loginType === 'admin' ? 'active' : ''}
            onClick={() => setLoginType('admin')}
          >
            🔐 Admin Girişi
          </button>
          <button
            className={loginType === 'client' ? 'active' : ''}
            onClick={() => setLoginType('client')}
          >
            👥 Danışan Girişi
          </button>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Kullanıcı Adı</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Kullanıcı adınızı girin"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn">
            Giriş Yap
          </button>
        </form>

        <div className="demo-credentials">
          <h3>📝 Demo Kullanıcılar</h3>
          <div className="demo-box">
            <strong>Falcı Girişleri:</strong>
            <ul>
              <li>Kullanıcı: <code>onur</code> / Şifre: <code>onur123</code></li>
              <li>Kullanıcı: <code>elmas</code> / Şifre: <code>elmas123</code></li>
              <li>Kullanıcı: <code>ayse</code> / Şifre: <code>ayse123</code></li>
            </ul>
          </div>
          <div className="demo-box">
            <strong>Admin Girişi:</strong>
            <ul>
              <li>Kullanıcı: <code>admin</code> / Şifre: <code>admin123</code></li>
            </ul>
          </div>
          <div className="demo-box">
            <strong>Danışan Girişi:</strong>
            <ul>
              <li>Kullanıcı: <code>demo</code> / Şifre: <code>demo123</code></li>
            </ul>
          </div>
        </div>

        <button onClick={() => navigate('/')} className="back-btn">
          ← Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
