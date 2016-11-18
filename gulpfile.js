var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync');
var pug          = require('pug');
var gulpPug      = require('gulp-pug');
var sass         = require('gulp-sass');
var babel        = require('gulp-babel');
var print        = require('gulp-print');
var cache        = require('gulp-cached');


gulp.task('sass', function () {
    return gulp.src('assets/css/main.scss')
        .pipe(cache('sassing'))
        .pipe(print())
        .pipe(sass({
            includePaths: ['css']
        }))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 9'], { cascade: true }))
        .pipe(gulp.dest('build'));
        // .pipe(gulp.dest('sass'));
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'build'
        }
    });
});

gulp.task('pug', function(){
  return gulp.src('views/*.pug')
    .pipe(cache('puging'))
    .pipe(print())
    .pipe(gulpPug({
      pug: pug,
      pretty: true
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('js', function(){
  return gulp.src('assets/es6/*.js')
        .pipe(cache('jsing'))
        .pipe(print())
        .pipe(babel({presets:['es2015']}))
        .pipe(gulp.dest('build/js'));
});

gulp.task('watch', ['browserSync'], function(){
  // gulp.watch('assets/css/*.scss', ['saas']);
  gulp.watch('views/*.pug', ['pug']);
  gulp.watch('assets/es6/*.js', ['js']);
  gulp.watch('assets/css/**', ['sass']);
  gulp.watch('build/**', browserSync.reload);
});

gulp.task('default', ['watch']);
