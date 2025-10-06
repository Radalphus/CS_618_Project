import PropTypes from 'prop-types'
import { User } from './User.jsx'

export function Recipe({ title, contents, image, author }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      <div>
        <img
          src={image}
          alt={image}
          style={{
            maxWidth: '200px',
            maxHeight: '200px',
            width: 'auto',
            height: 'auto',
          }}
        />
      </div>
      {author && (
        <em>
          <br />
          Written by <User id={author} />
        </em>
      )}
    </article>
  )
}

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  image: PropTypes.string,
}
