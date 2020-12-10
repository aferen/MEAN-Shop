const crypto = require('crypto')

// const access_token_secret = process.env.ACCESS_TOKEN_SECRET
// const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET
const algorithm1 = 'aes192'//aes-192-cbc
const algorithm2 = 'aes256'
// Key length is dependent on the algorithm. In this case for aes192, it is
// 24 bytes (192 bits).
const access_token_key = crypto.scryptSync(process.env.ACCESS_TOKEN_SECRET, 'salt', 24)
const refresh_token_key = crypto.scryptSync(process.env.REFRESH_TOKEN_SECRET, 'salt', 32)

const iv = Buffer.alloc(16, 0) // Initialization crypto vector

module.exports = {
  /**
   * Checks is password matches
   * @param {string} password - password
   * @param {Object} user - user object
   * @returns {boolean}
   */
  async checkPassword(password, user) {
    return new Promise((resolve, reject) => {
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          reject(this.buildErrObject(422, err.message))
        }
        if (!isMatch) {
          resolve(false)
        }
        resolve(true)
      })
    })
  },

  /**
   * Encrypts text
   * @param {string} text - text to encrypt
   */

  access_token_encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm1, access_token_key, iv)

    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    return encrypted
  },

  /**
   * Decrypts text
   * @param {string} text - text to decrypt
   */

  access_token_decrypt(text) {
    const decipher = crypto.createDecipheriv(algorithm1, access_token_key, iv)

    try {
      let decrypted = decipher.update(text, 'hex', 'utf8')
      decrypted += decipher.final('utf8')
      return decrypted
    } catch (err) {
      return err
    }
  },


  refresh_token_encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm2, refresh_token_key, iv)

    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    return encrypted
  },


  refresh_token_decrypt(text) {
    const decipher = crypto.createDecipheriv(algorithm2, refresh_token_key, iv)

    try {
      let decrypted = decipher.update(text, 'hex', 'utf8')
      decrypted += decipher.final('utf8')
      return decrypted
    } catch (err) {
      return err
    }
  }
}
