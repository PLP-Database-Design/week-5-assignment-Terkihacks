// Lets import the packages
const mysql = require('mysql2')
const express = require("express")
const app = express()

//Inorder to use my env files
require('dotenv').config();

//Lets create a Connection object
const dbConfig = mysql.createConnection({
host: process.env.DB_HOST,
user: process.env.DB_USERNAME,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME
});
//Lets see if our connection is working
dbConfig.connect((err) =>{
//If the connection is not succesfull
if(err){
    console.log("Error connecting to the database",err)
}
//Where the connection is successfull
else{
    console.log("Successfully connected to MySql", dbConfig.threadId)
}
})


 //Lets get started

//Retrieve all patients  

app.get('/getPatients',(req,res) =>{
//Create a variable to store the info
 const getPatientsInfo = "SELECT patient_id, first_name, last_name, date_of_birth  FROM patients"
 //Lets catch errors for a safe space and execution

 dbConfig.query(getPatientsInfo,(err,data) =>{
 //If I have an error
 if(err) {
    return res.status(400).send('Failed to get patients',err)
 }
 //If Successful
 res.status(200).send(data)

 })
})


//Retrieve all the providers information
app.get('/getProviders',(req,res) =>{
    const getProvidersInfo = "SELECT first_name, last_name, provider_specialty FROM  providers"
    dbConfig.query(getProvidersInfo,(err,data) =>{
        //If there is an eror
        if(err){
            //Lets log out the err
            console.error('Error fetching provider info:', err);
            return res.status(400).send('Failed to get providers info')
        }
        //If successful
       res.status(200).send(data)
    })

})


//Filter the patients by FirstName
app.get('/filterPatient',(req,res) =>{

  const filterPatients = 'SELECT first_name FROM patients'
  dbConfig.query(filterPatients,(err,data) =>{
    //If there is a Error
    if(err){
        console.log("Error Filtering Patients",err)
        return res.status(400).send('Failed to get the Firstname')     
    }
    //If successful
    return res.status(200).send(data)
  })

})

//Retrieve All providers by speciality
app.get('/retrieveSpeciality',(req,res) =>{

    const retrieveProviderSpeciality = " SELECT first_name,last_name,provider_specialty FROM providers "
    //Lets catch some errors  not feelings
    dbConfig.query(retrieveProviderSpeciality,(err,data) =>{
        //If there is is an error
        if(err){
            console.log("Error Filtering Patients",err)
            return res.status(400).send('Failed to get the Info')
        }
        
        //If successful
        res.status(200).send(data)
    })
})



// Listen for the port for ou server.js file
// Currently my port 3000 has another project running
const PORT = 8000
app.listen(PORT, () =>{
    console.log(`server is runnig on http://localhost:${PORT}`) 
})
