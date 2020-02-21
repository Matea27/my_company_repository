# Angularjs

AngularJS is a structural framework for dynamic web apps and our client-side web application. It lets us use HTML as our template language and lets us extend HTML's syntax to express application's components clearly and succinctly. AngularJS's data binding and dependency injection eliminate much of the code you would otherwise have to write.

## Used resources
In order to deploy the AngularJS application, we will use Grunt. Grunt is a command line Javascript task runner utilizing Node.js platform. It runs custom defined repetitious tasks and manages process automation.

## Getting started
We create a folder AngularJS_Client on our computer where are all client source code will be placed.
```bash
mkdir AngularJS_Client
```
## Setting up the environment
Grunt and Grunt plugins are installed and managed via npm, the Node.js package manager. Therefore, first you need to install [Node.js](https://nodejs.org/en/download/) on your computer. After successfull installation, you have to set up your package.json in the root of your project direcotry  by running ```npm init  ``` in the command promt.
In package.json we list all dependencies required for our project (Grunt and plugins).

```bash
{
  "name": "angularjs_client",
  "version": "1.0.0",
  "devDependencies": {
    "grunt": "~1.0.4", //Core Grunt modele
    "grunt-contrib-connect": "~2.1.0", //Start a connect web server
    "connect-modrewrite": "~0.10.2", //adds modrewrite functionality to connect/express server.
    "grunt-contrib-jshint": "~2.1.0", //Validate files with JSHint
    "grunt-contrib-watch": "~1.1.0", //Run predefined tasks whenever watched file patterns are added, changed or deleted
    "file-system": "~2.2.2",
    "grunt-connect-route": "~0.3.4", //This plugin provides RewriteRules middleware for the Grunt Connect
    "angular-route": "~1.7.9", //for distribution on npm
    "angular-ui-router": "~1.0.25", // client-side Single Page Application routing framework for AngularJS
    "angular": "~1.7.9" //for distribution on npm and bower
  },

```

Now we have to run local installation of packages by running ``` npm install  ``` which should put node_modules directory in the project folder along with the listed modules.

## Grunt configuration

Now we have to setup our Gruntfile.js file. There we create configurations, define how the command grunt will behave and load Grunt plugins.

A Gruntfile is comprised of the following parts:
- The "wrapper" function
- Project and task configuration
- Loading Grunt plugins and tasks
- Custom tasks

#### Gruntfile.js
```bash
module.exports = function(grunt) {
var rewrite = require('connect-modrewrite');
var rewriteRulesSnippet = require('grunt-connect-route/lib/utils').rewriteRequest;

  grunt.initConfig({
    connect: {
          jshint: {
            files: ['Gruntfile.js', 'js/app.js', 'test/**/*.js'],
            options: {
              globals: {
                jQuery: true
              }
            }
          },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },
    server: {
      options: {
        port: 8000,
        hostname: 'localhost',
        keepalive: true,
    }
  }
}
})
  grunt.loadNpmTasks('grunt-connect-route');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('server', function (target) {
    grunt.task.run([
       'connect:server',
   ]);
 });
};

```
### Run the Grunt
After we have created Gruntfile.js, we are ready to run our build process by following command:

```bash
grunt server
```

This will done all tasks of listed grunt file Gruntfile.js, like  starting a static web server at http://localhost:8000/, where you will be able to automatically access AngularJS application.

## License
[MIT](https://choosealicense.com/licenses/mit/)
