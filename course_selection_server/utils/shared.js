function checkValid(target) {
  if (target !== 0 && (!target || !target.trim())) return false
  return true
}


module.exports = {
  checkValid
}