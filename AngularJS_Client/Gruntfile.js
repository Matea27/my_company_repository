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
      //  base: 'client.html',
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
