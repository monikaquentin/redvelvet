class Aes256 {
  // Define a function to handle encryption.
  static async encrypt(message, sharedKey) {
    try {
      // Define a delimiter for hex strings.
      const DELIMITER = import.meta.env.VITE_APP_DELIMITER
      // Convert the shared key to bytes.
      const keyBytes = new Uint8Array(sharedKey.match(/[\da-f]{2}/gi).map((hex) => parseInt(hex, 16)))
      const rawKeyData = keyBytes.buffer

      // Define the encryption algorithm and key type.
      const importAlgorithm = {
        name: 'AES-GCM',
        length: 256
      }
      const keyType = 'raw'

      // Import the derived key.
      const importedKey = await window.crypto.subtle.importKey(keyType, rawKeyData, importAlgorithm, true, [
        'encrypt',
        'decrypt'
      ])

      // Encode the client message and generate a random initialization vector (IV).
      const encoded = new TextEncoder().encode(message)
      const iv = window.crypto.getRandomValues(new Uint8Array(12))

      // Encrypt the message.
      const ciphertext = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv, tagLength: 128 },
        importedKey,
        encoded
      )

      // Extract the tag from the ciphertext.
      const result = new Uint8Array(ciphertext)
      const tag = result.slice(-16)

      // Convert various data to hexadecimal strings and format the encrypted message.
      const ivHex = Array.from(new Uint8Array(iv), (byte) => byte.toString(16).padStart(2, '0')).join('')
      const ciphertextHex = Array.from(result.slice(0, -16), (byte) => byte.toString(16).padStart(2, '0')).join('')
      const tagHex = Array.from(tag, (byte) => byte.toString(16).padStart(2, '0')).join('')
      const response = `${ivHex}${DELIMITER}${ciphertextHex}${DELIMITER}${tagHex}`

      return response
    } catch (error) {
      // Handle errors here
    }
  }

  // Define a function to handle decryption.
  static async decrypt(cipher, sharedKey) {
    try {
      // Define a delimiter for hex strings.
      const DELIMITER = import.meta.env.VITE_APP_DELIMITER

      // Convert the shared key to bytes.
      const keyBytes = new Uint8Array(sharedKey.match(/[\da-f]{2}/gi).map((hex) => parseInt(hex, 16)))
      const rawKeyData = keyBytes.buffer

      // Split the cipher into IV, ciphertext, and tag.
      const [ivHex, ciphertextHex, tagHex] = cipher.split(DELIMITER)

      // Convert hexadecimal IV, ciphertext, and tag to Uint8Arrays.
      const iv = new Uint8Array(ivHex.match(/[\da-f]{2}/gi).map((hex) => parseInt(hex, 16)))
      const ciphertext = new Uint8Array(ciphertextHex.match(/[\da-f]{2}/gi).map((hex) => parseInt(hex, 16)))
      const tag = new Uint8Array(tagHex.match(/[\da-f]{2}/gi).map((hex) => parseInt(hex, 16)))

      // Combine ciphertext and tag
      const encryptedData = new Uint8Array([...ciphertext, ...tag])

      // Define the encryption algorithm and key type.
      const importAlgorithm = {
        name: 'AES-GCM',
        iv
      }

      // Import the derived key and decrypt the message.
      const importedKey = await window.crypto.subtle.importKey('raw', rawKeyData, importAlgorithm, true, [
        'encrypt',
        'decrypt'
      ])
      // Decrypt the message.
      const response = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv, tagLength: 128 },
        importedKey,
        encryptedData
      )

      // Convert the response data to a string.
      const message = new TextDecoder().decode(response)

      return message
    } catch (error) {
      // Handle errors here
    }
  }
}

export default Aes256
