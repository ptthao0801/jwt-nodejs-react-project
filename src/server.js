import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import configCors from './config/cors'
require('dotenv').config();
import bodyParser from 'body-parser';
import connection from './config/connectDB';
import {createJWT, verifyToken} from './middleware/JWTactions';

const app = express();
const PORT = process.env.PORT || 8082;

//config cors
configCors(app)

//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection db
connection();

//init web routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = " + PORT);
})

//test jwt
createJWT();
verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGhhbyIsImFkZHJlc3MiOiJoYSBub2kiLCJpYXQiOjE3Mjc4OTM0MjB9.XE026MtU0z_e5AXFctRrmzBLwl5qxaZJR-iPRWCkQ3s')