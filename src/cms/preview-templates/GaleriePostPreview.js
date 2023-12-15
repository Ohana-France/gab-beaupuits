import React from 'react'
import PropTypes from 'prop-types'
import { GaleriePostTemplate } from '../../templates/galerie-post'

const GaleriePostPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(['data', 'tags'])
  return (
    <GaleriePostTemplate
      content={widgetFor('body')}
      description={entry.getIn(['data', 'description'])}
      title={entry.getIn(['data', 'title'])}
      images={entry.getIn(['data', 'images'])}
    />
  )
}

GaleriePostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default GaleriePostPreview
