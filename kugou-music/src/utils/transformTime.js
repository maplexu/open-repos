export default time => {
  let date = new Date(time)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()

  return `${y}-${format(m)}-${format(d)}`
}

function format (n) {
  return n < 10 ? '0' + n : n
}
