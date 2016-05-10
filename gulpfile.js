var gulp = require('gulp');
var typescript = require('gulp-typescript');
var less = require('gulp-less');

gulp.task('ts', function () {
	return gulp.src('src/**/*.ts')
		.pipe(typescript({
            removeComments: true,
			noImplicitAny: true,
			out: 'src/index.js'
		}))
		.pipe(gulp.dest('.'));
});

gulp.task('less', function () {
  return gulp.src('src/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('src'));
});

gulp.task('watch-less', function () {
    gulp.watch('src/**/*.less', ['less']);
});

gulp.task('watch-ts', function () {
    gulp.watch('src/**/*.ts', ['ts']);
});

gulp.task('watch', ['watch-ts', 'watch-less']);

gulp.task('default', ['ts', 'less']);