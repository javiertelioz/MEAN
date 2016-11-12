module.exports = {
	// JWT Secret
  secret: 'meanfullstackwithangular2',
  // Mongo Conection 
  database: 'mongodb://localhost:27017/test',
  // Excluding routes for Web Token
  routesWithoutToken: [
    {
     router: "/api/token",
     methods: "GET"
    },
    {
     router: "/api/authenticate",
     methods: "POST"
    },
    {
     router: "/api/alumno",
     methods: "*"
    },
    {
     router: "/api/producto",
     methods: "GET,POST,PUT,DELETE,OPTIONS"
    },
  ]
};