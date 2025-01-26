export function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export function lightenColor(hex, amount) {
  // Convert hex color to RGB
  const num = parseInt(hex.slice(1), 16)
  const r = Math.min(255, Math.floor((num >> 16) + amount))
  const g = Math.min(255, Math.floor(((num >> 8) & 0x00ff) + amount))
  const b = Math.min(255, Math.floor((num & 0x0000ff) + amount))

  // Convert RGB back to hex
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0').toUpperCase()}`
}

