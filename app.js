const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const sassMiddleware = require('node-sass-middleware')
const session = require('express-session')

let index = require('./routes/index')
let users = require('./routes/users')
let register = require('./routes/register')
let login = require('./routes/login')
let edit = require('./routes/edit')

const app = express()
const connection = require('./mongo-init')
if (connection) {
  console.log('database connected')
  // connection.db.info().then(function (info) {
  //   console.log(info)
  // })
}

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(sassMiddleware({
  src: path.join(__dirname, 'public/stylesheets'),
  dest: path.join(__dirname, 'public/dist/css'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}))

app.use(session({
  secret: 'cartographer',
  resave: true,
  saveUninitialized: true,
  maxAge: Date.now() + (60 * 60 * 12),
  cookie: {secure: false}
}))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/users', users)
app.use('/register', register)
app.use('/login', login)
app.use('/edit', edit)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
module.exports = app
