// Loading Modules.
const gulp      = require('gulp'),
    sass        = require('gulp-sass'),
    prefix      = require('gulp-autoprefixer'),
    concat      = require('gulp-concat'),
    sourcemaps  = require('gulp-sourcemaps'),
    notify      = require('gulp-notify'),
    browserSync = require('browser-sync');

// Define source and build directories.
const sourceDir = './source/',
    buildDir    = './build/';


// Handle copying html files to build directory
gulp.task('copy-html', () => {
    return gulp.src(sourceDir + 'views/**/*.html')
        .pipe(gulp.dest(buildDir))
        .pipe(notify('HTML task completed.'))
        .pipe(browserSync.reload({stream: true}))
});

// Handle compiling and minifing sass files.
gulp.task('styles', () => {
    return gulp.src(sourceDir + 'sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(prefix({browsers:['last 2 versions'], cascade: false}))
        .pipe(concat('bundle.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(buildDir + 'css'))
        .pipe(notify('SASS task completed.'))
        .pipe(browserSync.reload({stream: true}))
});

// Watch for change and server initialization
gulp.task('watch', () => {
    browserSync.init({
        server: {baseDir: buildDir}
    });

    gulp.watch(sourceDir + 'views/**/*.html', ['copy-html']);
    gulp.watch(sourceDir + 'sass/**/*.scss', ['styles']);
});

// Gulp default task.
gulp.task('default', ['copy-html', 'styles', 'watch']);
