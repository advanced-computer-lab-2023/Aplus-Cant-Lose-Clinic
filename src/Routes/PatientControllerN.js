// #Task route solution
const userModel = require('../Models/User.js');
const { default: mongoose } = require('mongoose');

const viewAllPerscriptions = async(req,res) => {
   //add a new user to the database with
try{
      res.status(200);
   
   }catch(e){
   
      res.status(404);

   }

}

const filterPerscriptions = async (req, res) => {
   //retrieve all users from the database

try{

      res.status(200);

   }catch(e){

      res.status(404);
      //res.status(404).send("the page is not found")

   }

}


const selectPerscriptions = async (req, res) => {
   //update a user in the database

try{

      res.status(200);

   }catch(e){

      res.status(404);
}

  }

  const searchMedicine = async (req, res) => {
   //retrieve all users from the database

try{

      res.status(200);

   }catch(e){

      res.status(404);
      //res.status(404).send("the page is not found")

   }

}

const filterMedicine = async (req, res) => {
   //retrieve all users from the database

try{

      res.status(200);

   }catch(e){

      res.status(404);
      //res.status(404).send("the page is not found")

   }

}

module.exports = {viewAllPerscriptions, filterPerscriptions, selectPerscriptions,searchMedicine,filterMedicine};
