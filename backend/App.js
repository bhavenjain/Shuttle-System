const dotenv = require('dotenv')
const mongoose = require('mongoose')
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const busRoutes = require('./routers/bus')
// const Routes = require('./routers/routes')

dotenv.config({ path: './config.env' })
require('./db/connection')

// require('./middleware/data')

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(busRoutes)
// app.use(Routes)

app.listen(5000, () => {
  console.log('server started')
})
