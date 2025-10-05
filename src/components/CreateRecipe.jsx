import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createRecipe } from '../api/recipes.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export function CreateRecipe() {
  const [token] = useAuth()

  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

  const queryClient = useQueryClient()
  const createRecipeMutation = useMutation({
    mutationFn: () => createRecipe(token, { title, contents }),
    onSuccess: () => queryClient.invalidateQueries(['recipes']),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createRecipeMutation.mutate()
  }

  if (!token) return <div>Please log in to create new recipes.</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>
          <h2>Recipe Title:</h2>{' '}
        </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <h2>Recipe Ingredients and Instructions:</h2>
      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <br />
      <br />
      <input
        type='submit'
        value={createRecipeMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title || createRecipeMutation.isPending}
      />
      {createRecipeMutation.isSuccess ? (
        <>
          <br />
          Recipe created successfully!
        </>
      ) : null}
    </form>
  )
}
