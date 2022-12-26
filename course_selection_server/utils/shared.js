function checkValid(target) {
  if (typeof target === 'string') {
    if (!target || !target.trim()) return false
  }

  return true
}


module.exports = {
  checkValid
}