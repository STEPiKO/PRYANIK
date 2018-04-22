"use strict";

/* пути к исходным файлам (src), к готовым файлам (build), а также к тем, за изменениями которых нужно наблюдать (watch) */
var path = {
    build: {
        css:   'dist'
    },
    src: {
        style: 'bootstrap.css'
    },
    watch: {
        css:   'bootstrap.css'
    },
    clean:     'dist'
};

var gulp = require('gulp'),
    uncss = require('gulp-uncss'),
    autoprefixer = require('gulp-autoprefixer'),
    cache = require('gulp-cache'),
    del = require('del'),
    cleanCSS = require('gulp-clean-css');

// запуск задач при изменении файлов
gulp.task('watch', function() {
    gulp.watch(path.watch.css, ['css:build']);
});

// удаление каталога build
gulp.task('clean:build', function () {
    del.sync(path.clean);
});

// очистка кэша
gulp.task('cache:clear', function () {
    cache.clearAll();
});

// сбор стилей
gulp.task('css:build', function () {
    gulp.src(path.src.style) // получим bootstrap.css
        // .pipe(uncss({
        //     html: ['http://english-bp.ru', 'http://english-bp.ru/blog/', 'http://english-bp.ru/blog/s-chego-nachat-uchit-anglijskij']
        // }))
        .pipe(autoprefixer({ // добавим префиксы
            browsers: ['last 45 versions']
        }))
        .pipe(cleanCSS()) // минимизируем CSS
        .pipe(gulp.dest(path.build.css)) // выгружаем в builds
});

// сборка
gulp.task('build', [
    'clean:build',
    'cache:clear',
    'css:build'
]);
gulp.task('default', [
    'clean:build',
    'build',
    'watch'
]);