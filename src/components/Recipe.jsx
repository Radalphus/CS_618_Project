import PropTypes from 'prop-types'
import { User } from './User.jsx'

export function Recipe({ title, contents, image, author }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      <br/>
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
    </article>
  )
}

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  image: PropTypes.string,
}
