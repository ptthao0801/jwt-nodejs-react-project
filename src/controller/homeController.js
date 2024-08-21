import mysql from 'mysql2';

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jwt',
});

const handleHelloWorld = (req,res) => {
    const name = 'Thao';
    return res.render('home.ejs', {name});
}

const handleAbout = (req,res) => {
    return res.send("About")
}

const handleUserPage = (req,res) => {
    return res.render('user.ejs');
}

const handleCreateNewUser = (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    connection.query(
          'INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, password, username],
          function(err, results, fields) {
            console.log(results); // results contains rows returned by server
          }
    );
    
    return res.send('handleCreateNewUser')
}
module.exports = {
    handleAbout,
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser
}