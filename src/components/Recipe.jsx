import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext.jsx'
import { deleteRecipe, toggleLikeRecipe } from '../api/recipes.js'
import { User } from './User.jsx'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import { EditRecipe } from './EditRecipe.jsx'

export function Recipe({ _id, title, contents, image, author, likes = [], likeCount = 0 }) {
  const [editing, setEditing] = useState(false)
  const [token] = useAuth()
  const queryClient = useQueryClient()
  const { sub } = token ? jwtDecode(token) : {}
  
  const likeMutation = useMutation({
    mutationFn: () => toggleLikeRecipe(token, _id),
    onSuccess: () => {
      queryClient.invalidateQueries(['recipes'])
    },
  })

  const deleteRecipeMutation = useMutation({
    mutationFn: () => deleteRecipe(token, _id),
    onSuccess: () => {
      queryClient.invalidateQueries(['recipes'])
    },
  })

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipeMutation.mutate()
    }
  }

  if (editing) {
    return (
      <EditRecipe
        _id={_id}
        title={title}
        contents={contents}
        image={image}
        author={author}
        onDone={() => setEditing(false)}
      />
    )
  }

  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      <br />
      <div>
        <img
          src={image}
          alt={image}
          style={{
            minWidth: '200px',
            minHeight: '200px',
            maxWidth: '200px',
            maxHeight: '200px',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            border: '1px solid black',
          }}
        />
      </div>
      <div>Image url: {image}</div>
      {author && (
        <em>
          <br />
          Written by <User id={author} />
        </em>
      )}
      <br />
      {sub == author && (
        <button
          onClick={handleDelete}
          disabled={deleteRecipeMutation.isPending}
        >
          {deleteRecipeMutation.isPending ? 'Deleting...' : 'Delete'}
        </button>
      )}

      {sub == author && <button onClick={() => setEditing(true)}>Edit</button>}

      {deleteRecipeMutation.isSuccess && (
        <>
          <br />
          Recipe deleted successfully!
        </>
      )}
      
      <div style={{ marginTop: '1rem' }}>
        <span style={{ marginRight: '0.5rem' }}>
          {likeCount} {likeCount === 1 ? 'like' : 'likes'}
        </span>
        {token && (
          <button
            onClick={() => likeMutation.mutate()}
            disabled={likeMutation.isPending}
            style={{
              backgroundColor: likes.includes(sub) ? '#e0e0e0' : 'white',
            }}
          >
            {likes.includes(sub) ? 'Unlike' : 'Like'}
          </button>
        )}
      </div>
    </article>
  )
}

Recipe.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  image: PropTypes.string,
  likes: PropTypes.arrayOf(PropTypes.string),
  likeCount: PropTypes.number,
}
