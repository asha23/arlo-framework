// ===========================================================================================================
// Gulp config file for Seed Wordpress Base theme
// Author: Ash Whiting
// Version: 0.4.6
// ===========================================================================================================

// ===========================================================================================================
// VARIABLES
// ===========================================================================================================

// ===========================================================================================================
// Global File paths
// ===========================================================================================================

var config = {
	uploadPath:					'../../uploads',
	bowerPath:      			'bower/',
	bowerPathAll:  				'bower/**/*',
	jsPath:         			'library/js/',
	jsPathAll:     				'library/js/*.js',
	jsPathVendor:   			'library/js/vendor-libs/',
	temp:           			'library/temp',
	scssPath:       			'library/scss',
	scssPathAll:    			'library/scss/**/*.scss',
	imgPath:        			'build/images',
	destImg:        			'build/images/**/*.{gif,png,jpg,jpeg,svg}',
	dest:           			'build',
	destCss:        			'build/css',
	destJs:         			'build/js',
	modernizr:                  'library/js/modernizr',
};

// ===========================================================================================================
// Add the JS files here (these are compiled out from the bower directory and placed in the vendor_libs folder)
// Alternatively, just refer to the bower folders directly if you like
// Uncomment the ones we have already added if you need to use them
// ===========================================================================================================

var jsFileList = [
	config.jsPathVendor  	+ 'respond/respond.js',
    config.jsPathVendor 	+ 'bootstrap-js/bootstrap.js',
	config.jsPath 			+ '/scripts.js'
];

// Styles paths

var scssFilePaths = [
    config.bowerPath 		+ 'components-font-awesome/scss/',
];

var bootstrapPath = [
	config.bowerPath 		+ 'bootstrap-sass/assets/stylesheets/'
]

// ===========================================================================================================
// Load some Gulp plugins
// ===========================================================================================================

var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var gulp = require('gulp'); // Load the Gulp core
var runSequence = require('run-sequence'); // Load as this isn't gulp based
var buster = require('gulp-asset-hash'); // Load as this didn't work :P
var cssSelectorLimit = require('gulp-css-selector-limit');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var postcss = require('gulp-postcss');
var flexibility = require('postcss-flexibility');

// Load all the other plugins by referring to package.json

// ===========================================================================================================
// TASKS
//
// Sequencing became necessary because we only want to lint scripts.js (not every script!)
//
// If there is a better solution then fill your boots
// ===========================================================================================================

gulp.task('default', function() {
	runSequence('bower', 'bower-files', 'modernizr', 'lint', 'scripts', 'styles');
});

// ===========================================================================================================
// Bower tasks
//
// This gets all the Bower stuff in the correct place. Takes a little bit of jiggery pokery to sort out, but it's worth it as you will always
// be up to date with the script repos by running bower update
//
// Be sure to check your paths and dependencies here
// ===========================================================================================================

gulp.task('bower', function() {
    return plugins.bower()
        .pipe(gulp.dest(config.bowerPath))
});

// ===========================================================================================================
// Copy asset files from bower components in the /library folder
// ===========================================================================================================

gulp.task('bower-files', [
	'bootstrap-scss',
	'bootstrap-scripts',
	'fontawesome',
	'fontawesome-stylesheet'
]);

// ===========================================================================================================
// Move all the bits and bobs from the bower folder into the project
// You don't have to do this, and can refer directly to the bower folder if you want to
// ===========================================================================================================

// Copy bootstrap

gulp.task('bootstrap-scss', function () {
    return gulp.src(config.bowerPath + 'bootstrap-sass/assets/fonts/**/**.*')
        .pipe(gulp.dest(config.dest + '/fonts'))
});

gulp.task('bootstrap-scripts', function () {
    return gulp.src(config.bowerPath + 'bootstrap-sass/assets/javascripts/bootstrap.js')
        .pipe(gulp.dest(config.jsPathVendor + '/bootstrap-js'))
});

// Copy fontawesome fonts into the destination dir

gulp.task('fontawesome', function () {
    return gulp.src(config.bowerPath + 'components-font-awesome/fonts/**/**.*')
        .pipe(gulp.dest(config.dest + '/fonts'))
});

gulp.task('fontawesome-stylesheet', function () {
    return gulp.src(config.bowerPath + 'components-font-awesome/css/font-awesome.css')
        .pipe(gulp.dest(config.scssPath + '/fontawesome'))
});


// Errors

var onError = function (err) {
	console.log(err.toString());
	this.emit('end');
};

function reportError (error) {
    notify().write({
        title: 'Gulp: CSS',
        message: 'Error'
    });

    console.log(error.toString());
}

// Styles task
// ===========================================================================================================

gulp.task('styles', function () {
	return gulp
		.src([config.scssPath + '/styles.scss']) // Base scss include
		.pipe(sourcemaps.init())

		.pipe(plugins.sass({
			includePaths: scssFilePaths,
			includePaths: bootstrapPath
		}))

		.pipe(postcss([flexibility]))
		.pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(plugins.rename('styles.min.css'))
		.pipe(plugins.cleanCss({compatibility: 'ie8'}))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(config.destCss))
		.pipe(plumber({
			errorHandler: reportError
		}))
		.on('error',console.log.bind(console))
		.pipe(buster.hash({
			manifest: './build/manifest.json',
			template: '<%= name %>.<%= ext %>'
		}))
});


// Scripts task
// ===========================================================================================================

gulp.task('scripts', function () {
	return gulp
		.src(jsFileList)
		.pipe(sourcemaps.init())
		.pipe(plumber({
			errorHandler: reportError
		}))
		
		.pipe(plugins.concat({
			path: config.destJs + '/scripts.js',
			cwd: ''
		}))
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(plugins.rename('scripts.min.js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(config.destJs))
		.pipe(buster.hash({
			manifest: './build/manifest.json',
			template: '<%= name %>.<%= ext %>'
		}))
		.on('error',console.log.bind(console))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(config.destJs))
});

// Linting task
// ===========================================================================================================

gulp.task('lint', function(){
	return gulp.src(config.jsPath + 'js/scripts.js')
		.pipe(plumber({
			errorHandler: reportError
		}))
		.pipe(plugins.jshint())
		.pipe(plugins.plumber(function(error) {
			errorHandler:reportError
		}))
		.pipe(plugins.jshint.reporter('default'))
});

// Modernizr task
// ===========================================================================================================

gulp.task('modernizr', function() {
	return gulp.src(config.modernizr + "/modernizr.js")
		.pipe(plugins.modernizr({
			options: [
				'setClasses',
				'addTest',
				'html5printshiv',
				'testPropsAll',
				'fnBind',
				'domPrefixes'
			]
		}))
		.pipe(plugins.uglify())
		.pipe(plugins.rename('modernizr.min.js'))
		.pipe(gulp.dest(config.destJs))
});

// Images task
// ===========================================================================================================

gulp.task('images', function () {
	return gulp.src('build/images/**/*.{gif,png,jpg,jpeg,svg}')
		.pipe(plugins.cache(plugins.imagemin({
			optimizationLevel: 3,
			progressive: false,
			interlaced: false
		})))
		.pipe(gulp.dest(config.imgPath))
});

gulp.task('images-uploads', function () {
	return gulp.src('../../uploads/**/*.{gif,png,jpg,jpeg,svg}')
		.pipe(plugins.cache(plugins.imagemin({
			optimizationLevel: 3,
			progressive: false,
			interlaced: false
		})))
		.pipe(gulp.dest(config.uploadPath))
});

// Watch task
// ===========================================================================================================

gulp.task('watch', function () {
	gulp.watch(config.scssPathAll,function(){
		runSequence('styles')
	});
	gulp.watch(config.destImg, ['images']);
	gulp.watch(config.uploadPath, ['images-uploads']);

	// Run the scripts task in the correct sequence

	gulp.watch(config.jsPathAll, function() {
		runSequence('lint','scripts');
	});

});

// Selector limit check
// ===========================================================================================================

gulp.task('selector', function(){
    return gulp.src('build/css/splitCSS/*.css')
        .pipe(cssSelectorLimit())
        .pipe(cssSelectorLimit.reporter('default'))
        .pipe(cssSelectorLimit.reporter('fail'));
});

gulp.task('bless', function() {
    gulp.src('build/css/styles.min.css')
        .pipe(plugins.bless({
			imports:false,
			cacheBuster:false
		}))
        .pipe(gulp.dest('build/css'));
});

gulp.task('minify-bless', function(){
	gulp.src('build/css/*.css')
		.pipe(cleanCSS({debug: true}, function(details) {
			console.log(details.name + ': ' + details.stats.originalSize);
			console.log(details.name + ': ' + details.stats.minifiedSize);
		}))

		.pipe(buster.hash({
			manifest: './build/manifest.json',
			template: '<%= name %>.<%= ext %>'
		}))
		.pipe(gulp.dest('build/css/'));
});