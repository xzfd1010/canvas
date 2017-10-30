/**
 * Created by nick on 2017/3/16.
 */
var gulp = require('gulp');

//添加文件版本，根据文件内容计算哈希码，作用：破除用户浏览器的本地缓存
//传统方法的缺点：手动维护／不同文件的版本比较混乱
//此方法的优点：使用哈希码，如果文件未被修改，文件名就不会变；
var rev = require('gulp-rev');

//文件名修改了，但index里面的引用还是原来的，这个插件是用来更新引用的
var revReplace = require('gulp-rev-replace');

//允许在html中通过注释的方法写一些设置，来合并文件，配置如下
//<!--build:css css/combined.css-->
//<!--endbuild-->
var useref = require('gulp-useref');

//过滤器，filter可以筛选文件，对文件进行处理，筛选-->restore（恢复）
var filter = require('gulp-filter');

//压缩js代码的文件
var uglify = require('gulp-uglify');
//压缩css代码的文件
//压缩时，*!的注释不会消失
//老的版本文件不会删除，因为发布的时候用户可能正在访问网页，没有更新
//less
var less = require("gulp-less");
gulp.task("less", function () {
    gulp.src("API/less/**/*.less")
        .pipe(less())
        .pipe(gulp.dest("API/css"))
        .pipe(reload({stream: true}));
});

// browserSync实时刷新
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
gulp.task('serve', function () {
    browserSync.init({
        server: "./API/"
    });
    gulp.watch("**/less/**/*.less", ['less']);
    gulp.watch("**/*.html").on('change', reload);
    gulp.watch('**/js/**/*.js', browserSync.reload);
})

var del = require('del');

gulp.task('del', function () {
    del.sync('dist/**');
});

gulp.task('copyImg', function () {
    gulp.src('./img/**')
        .pipe(gulp.dest('dist/img'));
})

gulp.task('build_dist', ['del', 'copyImg'], function () {
    //声明filter
    var jsFilter = filter('**/*.js', {restore: true});
    var cssFilter = filter('**/*.css', {restore: true});

    //所有文件，排除首页，因为首页最好不要加版本号，否则可能打不开
    var indexHtmlFilter = filter(['**/*', '!**/index-main.html'], {restore: true});

    //pipe处理，管道对文件流进行处理，src方法指定需要处理的文件
    return gulp.src('*.html')
    //分析带有useref注释的地方，找到那些需要合并的文件，自动放入流中，处理后包含index文件+css文件+js文件
        .pipe(useref())
        //进行filter处理，筛选js文件
        .pipe(jsFilter)
        //进行js压缩
        .pipe(uglify())
        //通过restore将文件扔回流里
        .pipe(jsFilter.restore)
        //找到css文件
        .pipe(cssFilter)
        //压缩
        .pipe(csso())
        //保存
        .pipe(cssFilter.restore)
        //找到除index.html之外的所有文件
        .pipe(indexHtmlFilter)
        //对所有文件生成哈希版本号
        .pipe(rev())
        //恢复
        .pipe(indexHtmlFilter.restore)
        //更新引用
        .pipe(revReplace())
        //文件流结束了，把文件流扔到dist文件夹下
        .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
    return gulp.src('css/*.css')
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});

gulp.task('scripts', function () {
    return gulp.src('js/*.js')
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});


var revCollector = require('gulp-rev-collector');

gulp.task('rev', function () {
    return gulp.src(['rev/**/*.json', 'index.html'])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                'css': '/dist/css',
                'js': '/dist/js/',
                'cdn/': function (manifest_value) {
                    return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                }
            }
        }))
        .pipe(gulp.dest('dist'));
});




