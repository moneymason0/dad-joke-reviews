const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

var bodyParser = require('body-parser')

const { Pool } = require('pg'); 
const pool = new Pool({
  user: 'postgres',
  host: 'postgres-db',
  database: 'dad-joke-reviews',
  password: 'password',
  port: 5432,
})

app.use(bodyParser.json())
app.use(express.static('public'))

//---------------------------------------------------------------------- JOKES ROUTES ------------------------------------------------------------------------------
app.get("/jokes", function(req, res){
    //SELECT jokes.id, jokes.joke_question, jokes.joke_answer, AVG(reviews.reviews_rating), COUNT(reviews.reviews_rating) FROM jokes INNER JOIN reviews ON jokes.id=reviews.joke_id
    pool.query('SELECT jokes.id, jokes.joke_question, jokes.joke_answer, AVG(reviews.review_rating), COUNT(reviews.review_rating) FROM jokes LEFT JOIN reviews ON jokes.id=reviews.joke_id GROUP BY jokes.id;', (err, data) => {  
      res.json(data.rows);
    })
 })

 app.get("/jokes/:Id/reviews", function(req, res){
  const id = req.params.Id;
  pool.query('SELECT * FROM reviews WHERE joke_id=$1',[id], (err, data) => {  
    res.json(data.rows);
  })
})

app.post("/jokes", function(req, res){
  const question = req.body.joke_question;
  const answer = req.body.joke_answer;

  pool.query('INSERT INTO jokes (joke_question, joke_answer) VALUES ($1, $2)',[question, answer], (err, data) => {res.send('POST Successfull') })
    res.json(data.rows);
})
//---------------------------------------------------------------------- REVIEW ROUTES ------------------------------------------------------------------------------
app.post("/reviews", function(req, res){
    const joke_id = req.body.joke_id;
    const rating = req.body.review_rating;
    const name = req.body.name;
  
    pool.query('INSERT INTO reviews (joke_id, review_rating, name) VALUES ($1, $2, $3)',[joke_id, rating, name], (err, data) => { res.send('POST Successfull')})
      res.json(data.rows);
    })

app.delete("/reviews/:Id", function(req, res){
    const id = req.params.Id;
    pool.query('DELETE FROM reviews WHERE id = $1',[id], (err, data) => {res.send('DELETE Successfull')})
})
//---------------------------------------------------------------------------------------------------------------------------
app.listen(port, function(){
    console.log(`Server is running! on port ${port}`);
})