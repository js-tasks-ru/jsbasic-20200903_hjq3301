/**
 * @param   {{ name: string, age: number }[]} users
 * @returns {string[]}  объект
 */
function namify(users) {
  const names = users.map(users => {
    return users.name
  })
  return names
}
