import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { editRecipe } from '../api/recipes.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export function EditRecipe({
  _id,
  title: oldTitle,
  contents: oldContents,
  image: oldImage,
  author,
  onDone,
}) {
  const [token] = useAuth()

  const [title, setTitle] = useState(oldTitle)
  const [contents, setContents] = useState(oldContents)
  const [image, setImage] = useState(oldImage)

  const queryClient = useQueryClient()
  const editRecipeMutation = useMutation({
    mutationFn: () =>
      editRecipe(token, { _id, title, contents, image, author }),
    onSuccess: () => {
      queryClient.invalidateQueries(['recipes'])
      onDone()
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    editRecipeMutation.mutate()
  }

  if (!token) return <div>Please log in to edit new recipes.</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='edit-title'>
          <h2>Recipe Title:</h2>{' '}
        </label>
        <input
          type='text'
          name='edit-title'
          id='edit-title'
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
      <div>
        <label htmlFor='edit-image'>
          <h2>Recipe Image:</h2>{' '}
        </label>
        <input
          type='text'
          name='edit-image'
          id='edit-image'
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <br />
      <br />
      <input
        type='submit'
        value={editRecipeMutation.isPending ? 'Saving...' : 'Save'}
        disabled={!title || editRecipeMutation.isPending}
      />
      {editRecipeMutation.isSuccess ? (
        <>
          <br />
          Recipe editd successfully!
        </>
      ) : null}
    </form>
  )
}

EditRecipe.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  image: PropTypes.string,
  onDone: PropTypes.func,
}
