const connectToMongoose=require('./db')
const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())
connectToMongoose();
const port = 5000
app.use(express.json())
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/notes', require('./Routes/notes'));
app.listen(port, () => {
  console.log(`iNotebook listening on port ${port}`)
})