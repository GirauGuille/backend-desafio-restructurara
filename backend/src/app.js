import express from 'express';
import './DAL/db/dbConfig.js';
import { __dirname } from './utils/dirname.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import apiRouter from './routes/api.router.js';
import viewsRouter from './routes/views.router.js';
import { messagesModel } from './DAL/db/models/messages.model.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import cors from 'cors';
import config from './config/config.js';
import './passport/passportStrategies.js';

const app = express();
const PORT = config.PORT;
const FileStoreSession = FileStore(session);
app.use(cors());


/* cookie */
app.use(cookieParser());

/* middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public/html'));
app.use(express.static(__dirname + '/public'));

/* handlebars */
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongo_uri,
    }),
    resave: false,
    saveUninitialized: false,
    secret: 'secreto',

    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 1 semana
}));

/* passport para autenticación de usuarios */
app.use(passport.initialize());
app.use(passport.session());


app.use('/api', apiRouter);
app.use('/', viewsRouter)
app.get('/', (req, res) => {
    res.redirect('/login');
});
app.set("port", PORT || 8080);

/* server */
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${httpServer.address().port}`);
    console.log(`http://localhost:${PORT}`);});
    httpServer.on("error", error => console.log(`Error en servidor: ${error.message}`));


// websocket

const io = new Server(httpServer)

io.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`)

    socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.id}`)
    })

    socket.on("message", async (data) => {

        const newMessage = new messagesModel({
            user: data.user,
            message: data.msg,
        });
        await newMessage.save();

        socket.broadcast.emit("message", data)
    })

    socket.on('usuarioNuevo', async (usuario) => {
        socket.broadcast.emit('broadcast', usuario)

        const messages = await messagesModel.find();

        socket.emit('chat', messages)
    })
})