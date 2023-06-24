function validateUrl(str) {
  try {
    const newUrl = new URL(str)
    return newUrl.protocol === 'https:' || newUrl.protocol === 'http:'
  } catch (error) {
    return false
  }
}

module.exports = validateUrl
