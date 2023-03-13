import express, { json } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv'
dotenv.config()

const router = express.Router();
let apiPage = 1

const getSpecies = async (page) => {
  try{
    const fetch = await axios.get(process.env.API_URL,{
      params: {
        key: process.env.SECRET_KEY,
        page: page
      }
    })
    return fetch.data
  }
  catch (error) {
    console.log(error)
  }
}

let allSpecies = []
let species = null
do{
  species = await getSpecies(apiPage);
  allSpecies = allSpecies.concat(species.data);
  apiPage++
} while(species.current_page < species.last_page)
console.log(allSpecies.length)
router.get('/', function(req, res, next) {
  res.render('index', { title: message});
});

export {router as indexRouter}
