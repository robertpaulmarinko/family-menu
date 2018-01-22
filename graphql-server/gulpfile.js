const gulp = require("gulp");

const $$ = require("gulp-load-plugins")({
	lazy: true
});


gulp.task("zip", [], function () {
	//There is an issue with Windows permissions on directories not translating to Unix permissions when uploaded to AWS.
	//The nodir option works around this problem.
	//When the zip is created without nodir, error will appear that files in the /scripts or /node_modules folders can not be found.
	//https://github.com/sindresorhus/gulp-zip/issues/64
	//https://github.com/isaacs/node-glob#options
    // Note that we are NOT including the .env file.  Environment variables are set in the AWS environment
	return gulp.src(['*.js', 'package.json', 'node_modules/**', 'src/**/*.js', '!Lambda.zip', '!node_modules/aws-sdk/**'], { dot: true, base: ".", nodir: true })
		.pipe($$.zip('Lambda.zip'))
		.pipe(gulp.dest('.'));
});


// ----------------------------------------------------------
// Menu
// ----------------------------------------------------------

gulp.task("default", function () {
	console.log("User-land GULP tasks:");
	console.log("---------------------");
	console.log("");
	console.log("zip         -- Create a needed zip file");
	console.log("")
});