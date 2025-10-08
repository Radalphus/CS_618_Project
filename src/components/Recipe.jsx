import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext.jsx'
import { deleteRecipe } from '../api/recipes.js'
import { User } from './User.jsx'
import { jwtDecode } from 'jwt-decode'

export function Recipe({ _id, title, contents, image, author }) {
  const [token] = useAuth()
  const queryClient = useQueryClient()
  const { sub } = token ? jwtDecode(token) : {}
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
      {deleteRecipeMutation.isSuccess && (
        <>
          <br />
          Recipe deleted successfully!
        </>
      )}
    </article>
  )
}

Recipe.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  image: PropTypes.string,
}
