module.exports = {
	// JWT Secret
  secret: 'meanfullstackwithangular2',
  // Mongo Conection 
  database: 'mongodb://localhost:27017/test',
  // Excluding routes for Web Token
  routesWithoutToken: [
  	'/api/token',
  	'/api/authenticate',
  	'/api/alumno',
  	'/api/alumnos'
  ]
};