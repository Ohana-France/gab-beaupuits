import CMS from 'netlify-cms-app'
import { fr } from 'netlify-cms-locales'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import GaleriePostPreview from './preview-templates/GaleriePostPreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('index-page', IndexPagePreview)
CMS.registerPreviewTemplate('about-page', AboutPagePreview)
CMS.registerPreviewTemplate('galerie-post', GaleriePostPreview)
CMS.registerLocale('fr', fr)