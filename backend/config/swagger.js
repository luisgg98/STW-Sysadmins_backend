var swaggerJSDoc = require('swagger-jsdoc');
var swaggerport = (process.env.PORT || '3000');
var nodeSwagger = `localhost:${swaggerport}`;

var swaggerDefinition = {
    info:{
        title:' Zitations web application API',
        version:'1.0.0',
        description:'API for the web application Zitations'
    },
    host:nodeSwagger,
    basePath:'/api/', //where the services are
    schemes:['http','https'] //working on http, in heroku we have to add https
};
var options = {
    swaggerDefinition:swaggerDefinition,
    // path to the API docs
    apis:['../routes/*']

};

// initialize swagger jsdoc
var swaggerSpec = swaggerJSDoc(options);


module.exports= swaggerSpec;

