const bcrypt = require('bcryptjs')

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && bcrypt.compareSync(password, users[i].hashedPassword)) {
          res.status(200).send(users[i])
          return
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
       
        
        const {username, email, firstName, lastName, password} = req.body

        const salt = bcrypt.genSaltSync(5)
        const hashedPassword = bcrypt.hashSync(password, salt)
        console.log(salt)
        console.log(hashedPassword)

        const user = {
          username,
          email,
          firstName,
          lastName,
          hashedPassword
        }
        console.log(user)

        users.push(user)

        const returnedUser = {...user}
        delete returnedUser.hashedPassword

        res.status(200).send(returnedUser)
    }
}