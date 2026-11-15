const express = require('express')
const multer = require('multer')
require('dotenv').config()



const PORT = process.env.PORT || 8888
const sequelize = require('./database/database')
const studentRouter = require('./routes/studentRouter')
const app = express()
app.use(express.json())

app.use(studentRouter)

app.use((err,req, res , next) => {
if (err instanceof multer.MulterError) {
    return res.status(400).json({
        message:err.message
    })
}
})


const dbconnection = async ()=>{
try {
    await sequelize.authenticate()
    console.log('connection to server established successfully')
} catch (error) {
   console.log('failed to connect to database',error.message) 
}
} 
dbconnection()


app.listen(PORT,()=>{
    console.log( `server is running on PORT ${PORT}`)
}
)