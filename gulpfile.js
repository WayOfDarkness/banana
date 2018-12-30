var gulp = require('gulp');
// var sass = require('gulp-sass');
var minify = require('gulp-minify');
var minifyCss = require('gulp-clean-css');
var rename = require('gulp-rename');
// var concat = require('gulp-concat');
// var livereload = require('gulp-livereload');
var cssimport = require("gulp-cssimport");
var cssMin = require('gulp-css');

var themeDir = './assets/';


var options = {
    extensions: ["css"] // process only css
};

// theme
// gulp.task('cssMinfy', function(){
//   return gulp.src(themeDir + 'css/gulp.style.css')
//     .pipe(cssMin({
//         processImport: true
//       }))
//     .pipe(rename('style.min.css'))
//     .pipe(gulp.dest(themeDir + 'css/'));
// });

gulp.task("import", function() {
    gulp.src(themeDir + 'css/gulp.style.css')
        .pipe(cssimport(options))
        .pipe(cssMin())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(themeDir + 'css/'));
});

gulp.task('js', function() {
  gulp.src(themeDir + 'js/script.js')
    .pipe(minify())
    .pipe(gulp.dest(themeDir + 'js/'))
});


gulp.task('default',function() {
  gulp.start('import');
  gulp.watch(themeDir + 'css/*.css',function(evt) {
  gulp.task('import');
  });
});


// gulp.task('default', function() {
// // We use `gulp.watch` for Gulp to expect changes in the files to run again
//   gulp.watch('./css/*.css', function(evt) {
//   gulp.task('cssMinfy');
//   });
// });


// gulp.task( 'default', [ 'cssMinfy' ] )
// gulp.task('default',function() {
//   gulp.watch('public/static/scss/admin.scss',['admin']);
//   gulp.start('scss');
//   gulp.watch(themeDir + 'scss/*.scss',['scss']);
//   gulp.watch(themeDir + 'js/script.js',['js']);
// });

// gulp.task('build', ['scss']);
