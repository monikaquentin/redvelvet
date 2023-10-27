const hexDump = (hash) => {
  try {
    const buffer = new Uint8Array(hash.match(/[\da-f]{2}/gi).map((hex) => parseInt(hex, 16)))
    const formattedHex = []

    for (let i = 0; i < buffer.length; i += 16) {
      const chunk = buffer.slice(i, i + 16)
      const hex = Array.from(chunk, (byte) => byte.toString(16).padStart(2, '0')).join(' ')
      const binary = Array.from(chunk, (byte) => (byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : '.')).join('')
      const line = `${i.toString(16).padStart(4, '0')}: ${hex.padEnd(48)}  ${binary}\n`
      formattedHex.push(line)
    }

    return formattedHex.join('')
  } catch (error) {
    return false
  }
}

const reverseHexDump = (dump) => {
  try {
    const lines = dump.split('\n').filter(Boolean)
    const separateValues = (str) => str.match(/[\da-f]{2}/gi).join(' ')
    const hex = lines
      .map((line) => {
        const parts = line.split(':')
        const hexValue = parts[1].trim()
        const index = hexValue.indexOf('  ')
        const valueToProcess = index !== -1 ? hexValue.slice(0, index) : hexValue

        return separateValues(valueToProcess)
      })
      .join('\n')
      .replace(/\n/g, '')
      .replace(/\s/g, '')

    return hex
  } catch (error) {
    return false
  }
}

const hexToBytes = (hex) => {
  const bytes = []
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16))
  }
  return bytes
}

const hexToUint8Array = (hex) => {
  const byteArray = hexToBytes(hex)
  return new Uint8Array(byteArray)
}

export { hexDump, reverseHexDump, hexToBytes, hexToUint8Array }
