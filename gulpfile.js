const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require('gulp-autoprefixer'); // version 8.0.0
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin"); // version 7.1.0
const htmlmin = require("gulp-htmlmin");

gulp.task("server", function () {
  browserSync({
    server: {
      baseDir: "dist",
    },
  });

  gulp.watch("src/*.html").on("change", browserSync.reload);
});

// таск для стилей
gulp.task("styles", function () {
  return (
    gulp
      .src("src/sass/**/*.+(scss|sass)")
      .pipe(sass({ style: "compressed" }).on("error", sass.logError))
      .pipe(rename({ suffix: ".min", prefix: "" }))
      .pipe(cleanCSS({ compatibility: "ie8" }))
      .pipe(autoprefixer())
      .pipe(gulp.dest("dist/css")) // продолжить отсюда
      .pipe(browserSync.stream())
  );
});

gulp.task("watch", function () {
  gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
  gulp.watch("src/*.html").on("change", gulp.parallel("html"));
  gulp.watch("src/js/**/*.js").on("change", gulp.parallel("scripts"));
  gulp.watch("src/fonts/**/*").on("all", gulp.parallel("fonts"));
  gulp.watch("src/icons/**/*").on("all", gulp.parallel("icons"));
  gulp.watch("src/img/**/*").on("all", gulp.parallel("images"));
});

// таск для html-файла
gulp.task("html", function () {
  return gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"));
});

gulp.task("scripts", function () {
  return gulp
    .src("src/js/**/*.js")
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

// таск для шрифтов
gulp.task("fonts", function () {
  return gulp
    .src("src/fonts/**/*", { encoding: false })
    .pipe(gulp.dest("dist/fonts"))
    .pipe(browserSync.stream());
});

// таск для иконок
gulp.task("icons", function () {
  return gulp
    .src("src/icons/**/*", { encoding: false })
    .pipe(gulp.dest("dist/icons"))
    .pipe(browserSync.stream());
});

//Таск для изображений
gulp.task("images", function () {
  return gulp
    .src("./src/img/**/*", { encoding: false })
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest("./dist/img/"))
    .pipe(browserSync.stream());
});
gulp.task(
  "default",
  gulp.parallel(
    "watch",
    "server",
    "styles",
    "scripts",
    "fonts",
    "icons",
    "html",
    "images"
  )
);
