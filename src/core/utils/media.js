import {
  mediaUpload
} from '@wordpress/utils'

export const handleImageUpload = (file, done) => {
  return new Promise(resolve => {
    mediaUpload([file], (media) => resolve(media[0]), 'image')
  })
}
