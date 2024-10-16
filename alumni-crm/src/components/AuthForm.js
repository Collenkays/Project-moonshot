import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useHistory, useLocation } from 'react-router-dom';

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const { login, register } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoginPage) {
      const result = await login(email, password);
      if (result.success) {
        history.push('/dashboard');
      } else {
        // Handle login error
      }
    } else {
      const result = await register({ email, password, name, graduationYear });
      if (result.success) {
        history.push('/dashboard');
      } else {
        // Handle registration error
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{isLoginPage ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        {!isLoginPage && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Graduation Year"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </>
        )}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {isLoginPage ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;