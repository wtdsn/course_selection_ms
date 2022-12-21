const { queryAsync } = require('../db/index.js')

async function login(req, res) {
  /*  db.query('SELECT * FROM students', (err, result) => {
     if (err) {
       console.log("Error At", err.stack);
       res.staus(500).send({ message: "查询报错" })
       return
     }
     console.log(result)
     res.send({
       code: 1
     })
   }) */
  const result = await queryAsync('SELECT * FROM students')

  if (result.code === 0) {
    res.staus(500).send({ message: "查询报错" })
    return
  }

  console.log(result)
  res.send({
    code: 1
  })
}


function logout(req, res) {

}


module.exports = {
  login,
  logout
}