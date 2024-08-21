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

module.exports = {
    handleAbout,
    handleHelloWorld,
    handleUserPage
}