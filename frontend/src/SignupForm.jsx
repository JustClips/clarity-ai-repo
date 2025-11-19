// /frontend/src/SignupForm.jsx

import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const [signup, { loading }] = useMutation(SIGNUP_MUTATION, {
    onError: (error) => {
      setMessage(error.message.replace('GraphQL error: ', ''));
      setIsError(true);
    },
    onCompleted: (data) => {
      const { token, user } = data.signup;
      setMessage(`Success! User ${user.email} created. Welcome!`);
      setIsError(false);
      console.log('Token Received:', token);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    signup({ variables: { email, password } });
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px', margin: '50px auto' }}>
      <h2>ClarityAI Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px' }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>

      {message && (
        <p style={{ 
          marginTop: '15px', 
          color: isError ? 'red' : 'green',
          border: `1px solid ${isError ? 'red' : 'green'}`,
          padding: '10px'
        }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default SignupForm;
