import {
  mediaUpload
} from '@wordpress/utils'

export const readFile = (path) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(path)
  reader.onload = resolve 
  reader.onerror = reject
})


export const handleImageUpload = (file, done) => {
  mediaUpload([file], (media) => done(media[0]), 'image')
}