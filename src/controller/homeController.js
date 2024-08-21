import userService from '../service/userService';

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

    // userService.createNewUser(email, password, username)
    userService.getUserList();
    return res.send('handleCreateNewUser')
}
module.exports = {
    handleAbout,
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser
}