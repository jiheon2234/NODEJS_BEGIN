const express =require('express')
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const nunjucks = require('nunjucks')
const dotenv = require('dotenv')
dotenv.config();

const webSocket = require('./socket')
const indexRouter = require('./routes');
const app = express()
app.set('port',process.env.PORT || 8005);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
})

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended : false}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized : false,
    secret: process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false,
    }
}))

const server = app.listen(app.get('port'), ()=>{
    console.log(app.get('port'),'번 포트에서 대기중');
})
webSocket(server)

app.use('/',indexRouter);