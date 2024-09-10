export const utilService = {
  makeId,
  loadFromStorage,
  saveToStorage,
  // debounce,
}

function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function saveToStorage(key: string, value: object) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key: string) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

// function debounce(func, timeout = 300) {
//   let timer
//   return (...args) => {
//     clearTimeout(timer)
//     timer = setTimeout(() => {
//       func.apply(this, args)
//     }, timeout)
//   }
// }
