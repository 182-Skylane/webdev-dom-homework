export const now = new Date()
export const dateString =
    now.getDate().toString().padStart(2, '0') +
    '.' +
    (now.getMonth() + 1).toString().padStart(2, '0') +
    '.' +
    now.getFullYear().toString().slice(2) +
    ' ' +
    now.getHours().toString().padStart(2, '0') +
    ':' +
    now.getMinutes().toString().padStart(2, '0')
