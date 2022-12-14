const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const newRouter = require('./router.js');

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

MongoClient.connect('mongodb+srv://val:val2003@cluster0.yktudhj.mongodb.net/?retryWrites=true&w=majority') 
  .then((client) => {
    const db = client.db('questionnaire'); 
    const staffCollection = db.collection('questionnaire');  
    const staffRouter = newRouter(staffCollection); 
    const resCollection = db.collection("results");
    const resRouter = newRouter(resCollection);
    app.use('/api/result', resRouter);
    app.use('/api/staff', staffRouter); 
  })
  .catch(console.err);

app.listen(4000, function () {
  console.log(`Listening on this port: ${this.address().port}`);
});












// require('express-async-errors');

// const express = require('express'),
// path = require('path'),
// 	rootPath = path.normalize(__dirname + '/../'),
// 	router = express.Router(),
// 	{ QuestionnaireController, 
// 		ResultsController } = require('./controllers');

// module.exports = function(app){	

// 	router.get('/questionnaire', QuestionnaireController.index);
// 	router.get('/questionnaire/:id', QuestionnaireController.show);
 
// 	app.use('/api', router);
// };

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
// app.use(methodOverride());
// app.use(cookieParser());
// app.use(express.static(path + '/api/result'));

// require('./server/routes')(app);










// // var path = require('path'),
// // 	rootPath = path.normalize(__dirname + '/../../');
	
// // module.exports = {
// // 	development: {
// // 		rootPath: rootPath,
// // 		db: 'mongodb://localhost/mongodb-relationships',
// // 		port: process.env.PORT || 3000
// // 	},
// // 	production: {
// // 		rootPath: rootPath,
// // 		db: process.env.MONGOLAB_URI || 'you can add a mongolab uri here ($ heroku config | grep MONGOLAB_URI)',
// // 		port: process.env.PORT || 80
// // 	}
// // };