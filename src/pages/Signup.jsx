import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'

import { signup } from '../api/users.js'

export function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const signupMutation = useMutation({
    mutationFn: () => signup({ username, password }),
    onSuccess: () => navigate('/login'),
    onError: () => alert('failed to sign up!'),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    signupMutation.mutate()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Link to='/'>Back to main page</Link>
      <hr />
      <br />
      <br />
      <br />
      <center>
        <div
          style={{
            background: '#a5bcf8ff',
            border: '1px solid black',
            borderRadius: '5px',
            padding: '10px',
            width: '400px',
          }}
        >
        <div>
          <label htmlFor='create-username'>Username: </label>
          <input
            type='text'
            name='create-username'
            id='create-username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      <br />
        <div>
          <label htmlFor='create-password'>Password: </label>
          <input
            type='password'
            name='create-password'
            id='create-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      <br />
        <input
        type='submit'
        value={signupMutation.isPending ? 'Signing up...' : 'Sign Up'}
        disabled={!username || !password || signupMutation.isPending}
        />
        </div>
      </center>
      </form>
  )
}
