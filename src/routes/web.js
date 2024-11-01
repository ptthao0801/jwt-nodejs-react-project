import express from 'express';
import homeController from '../controller/homeController';

const router = express.Router();

//const name2 = 'Thao2';

const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWorld)

    router.get("/user", homeController.handleUserPage)

    return app.use("/", router);
}

export default initWebRoutes;