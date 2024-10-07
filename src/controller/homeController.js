import userService from '../service/userService';

const handleHelloWorld = (req,res) => {
    const name = 'Thao';
    return res.render('home.ejs', {name});
}

const handleAbout = (req,res) => {
    return res.send("About")
}

// khai bao bat dong bo voi function nay, bat phai cho getUserList() vi getUserList() can lam xong moi chay duoc function nay, neu ko cho -> undefined
const handleUserPage = async (req,res) => {
    
    let userList = await userService.getUserList();
    return res.render('user.ejs', {userList});
}

const handleCreateNewUser = (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    userService.createNewUser(email, password, username)
    return res.redirect('/user')
}

const handleDeleteUser = async (req, res) => {
    let id = req.params.id;
    await userService.deleteUser(id);

    return res.redirect("/user")
}

const getUpdateUserPage = async (req,res) => {
    let id = req.params.id;
    let user = await userService.getUserById(id);
    let userData = {};
    userData = user;

    return res.render('user-update.ejs', {userData})
}

const handleUpdateUser = async (req, res) => {
    let id = req.body.id;
    let email = req.body.email;
    let username = req.body.username;
    await userService.updateUserInfor(email, username, id);

    return res.redirect('/user')
}

module.exports = {
    handleAbout,
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
    getUpdateUserPage,
    handleUpdateUser
}