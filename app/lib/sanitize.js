import Ember from 'ember'

const {
  isBlank
} = Ember

// Converts anything into a String and removes newlines.
export default function sanitize (value) {
  if (isBlank(value)) { return '' }
  return String(value).replace(/\r?\n|\r/g, '')
}
