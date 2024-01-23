const app = require('./app')

app.listen(app.get('port'), () => {
    console.log('server started in :',app.get('port') )
})
