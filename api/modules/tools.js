const bcrypt = require('bcrypt')

const tools = {
    enbcrypt(password) {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        return hash
    },
    comparePassword(textPlainPassword, hash) {
        return bcrypt.compareSync(textPlainPassword, hash)
    }
}

module.exports = tools
