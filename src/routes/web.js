import express from 'express';

const router = express.Router();

const handleHelloWorld = (req,res) => {
    return res.send("Hello world")
}
const initWebRoutes = (app) => {
    router.get("/", handleHelloWorld)
    return app.use("/", router);
}

export default initWebRoutes;