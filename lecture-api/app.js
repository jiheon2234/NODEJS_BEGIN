const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const path = require('path')
const session = require('express-session');
const nunjucks = require('nunjucks')
const dotenv = require('dotenv')
dotenv.config(); //process.env


const passport = require('passport')

const {sequelize} = require('./models');

const authRouter = require('./routes/auth')
const indexRouter = require('./routes/index')
const v1Router = require('./routes/v1');
const v2Router = require('./routes/v2')


const passportConfig = require('./passport');
passportConfig();


sequelize.sync()
    .then(()=>{
        console.log('DB 연결 성공')
    }).catch((err)=>{
    console.error(err)
})


const app = express()
app.set('port', process.env.PORT || 8002);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
})

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'public')))

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use(session({
    resave: false,
    saveUninitialized : false,
    secret: process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false,
    }
}))
app.use(passport.initialize())
app.use(passport.session());

app.use('/v1',v1Router)
app.use('/v2',v2Router)
app.use('/auth',authRouter)
app.use('/',indexRouter)



app.use((req,res,next)=>{
    const error = new Error(`${req.method} ${req.url} does not exists`)
    error.status = 404;
    next(error)
})

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log('server started in :',app.get('port') )
})