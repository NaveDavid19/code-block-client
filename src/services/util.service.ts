export const utilService = {
  makeId,
  loadFromStorage,
  saveToStorage,
  debounce,
  processString,
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

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

function processString(input: string): string {
  // Step 1: Normalize newline characters (covers \n, \r\n, and \r)
  let result = input.replace(/\r\n|\n|\r/g, '')

  // Step 2: Remove all white spaces (spaces, tabs, etc.)
  result = result.replace(/\s+/g, '')

  // Step 3: Replace double quotes with single quotes
  result = result.replace(/"/g, "'")

  // Step 4: Convert to lowercase to ignore case differences
  result = result.toLowerCase()

  // Step 5: Remove slashes (/) to ignore them
  result = result.replace(/\//g, '')

  // Optional Step 6: Remove comments (both single-line and multi-line)
  // Uncomment if comments should be ignored in the comparison
  result = result.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '')

  // Step 6: Remove all semicolons
  result = result.replace(/;/g, '')

  // Optional Step 8: Normalize spacing around certain symbols (if needed)
  result = result.replace(/\s*([{}()=+*/-])\s*/g, '$1')

  return result
}
