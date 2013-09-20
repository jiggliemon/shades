var connect = require('connect')
var http = require('http')
var lessMiddleware = require('less-middleware')
var path = require('path')
var yayo = require('yayo/middleware')

var port = 3000
var root = __dirname

var app = connect()
  .use(connect.favicon())
  .use(connect.logger('dev'))
  .use(connect.cookieParser())
  .use(connect.session({ secret: 'my secret here' }))

  .use(lessMiddleware({
    src    : path.join(root, 'public', 'less'),
    dest   : path.join(root, 'public', 'css'),
    prefix : '/css',
    compress: true
  }))

  .use(connect.static('public'))
  .use(yayo(root))
  
  //.use(connect.directory('public'))
  .use(function(req, res, next){
    console.log(typeof app.route)
    res.end('Hello from Connect!\n')
    next()
  })

console.log('Starting server at http://localhost:'+port)

http.createServer(app).listen(3000)
