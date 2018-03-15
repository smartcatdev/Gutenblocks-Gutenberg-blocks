import {
  mediaUpload
} from '@wordpress/utils'

export const handleImageUpload = (file, done) => {
  mediaUpload([file], (media) => done(media[0]), 'image')
}