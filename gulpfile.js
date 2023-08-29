"use strict"

//КОНСТАНТЫ
const { src, dest } = require('gulp');
const gulp = require('gulp');


const plumber = require('gulp-plumber'); //Обеспечивает продолжение работы Gulp при ошибке
const fileInclude = require('gulp-file-include'); //Сборка HTML файлов
const browserSync = require('browser-sync').create(); //Локальный сервер
const notify = require('gulp-notify'); // Показывает сообщения об ошибке
const replace = require('gulp-replace'); // Замена строк или их частей по шаблону
const webpHtmlNosvg = require('gulp-webp-html-nosvg'); //Вставляет в HTML код для поддержки изображений WebP
const versionNumber = require('gulp-version-number'); //Добавляет к файлам стилей и JS в HTML индекс, чтобы обойти кеширование браузера
const del = require('del'); //Удаление файлов и папок. Обязательна версия 6.0.0
const sass = require('gulp-sass')(require('sass')); //Препроцессор SCSS
const rename = require('gulp-rename') //Переименование файлов
const webpcss = require('gulp-webpcss') // Определяет поддержку браузерами формата WebP и добавляет соответствующий класс
const webpConverter = require('webp-converter') // (не подключается) Необходим для работы gulp-webpcss, требуется версия 2.2.3
const autoprefixer = require('gulp-autoprefixer') // CSS аутопрефиксер - добавление вендорных префиксов
const groupCssMediaQueries = require('gulp-group-css-media-queries') // Группировка медиазапросов в файлах CSS
const cleanCss = require('gulp-clean-css') // Сжатие (минификация) CSS файлов 
const rigger = require('gulp-rigger') // Сборка JS (и прочих) файлов в один
const uglify = require('gulp-uglify') // Минификация JS файлов
const webp = require('gulp-webp') // Конвертация картинок в формат WebP
const imagemin = require('gulp-imagemin') // Сжатие изображений (Версия строго 7.1.0)
const newer = require('gulp-newer') // Проверяет, обновился ли файл, чтобы не обновлять его каждый раз
const fs = require('fs') // Интерпретатор ноды для работы с файловой системой, установлен по умолчанию
const fonter = require('gulp-fonter') // Перобразование шрифтов из формата OTF в TTF и WOFF 
const ttf2woff2 = require('gulp-ttf2woff2') // Преобразует шрифты формата TTF в WOFF2
const svgSprite = require('gulp-svg-sprite') // Создает svg-спрайты. Обязательна версия 1.5.0
const nodePath = require('path') //Модуль установлен по умолчанию
const zipArchive = require('gulp-zip') //Архивация папок и файлов


//Пути по умолчанию
const rootFolder = nodePath.basename(nodePath.resolve()); //имя папки проекта

const srcPath = 'src'
const distPath = 'dist'
const buildPath = 'build'
const archivePath = 'pgoject-archive'

const path = {
  src: {
    html: `${srcPath}/*.html`,
    scss: `${srcPath}/assets/scss/*.scss`,
    js: `${srcPath}/assets/js/*.js`,
    images: `${srcPath}/assets/img/**/*.{jpg,jpeg,png,gif,ico,webp,webmanifest,xml,json,}`,
    svg: `${srcPath}/assets/img/**/*.{svg,}`,
    fonts: `${srcPath}/assets/fonts/`,
    files: `${srcPath}/assets/files/**/*.*`,
    svgicons: `${srcPath}/assets/svgicons/**/*.svg`,
  },
  dist: {
    html: `${distPath}/`,
    css: `${distPath}/assets/css/`,
    js: `${distPath}/assets/js/`,
    images: `${distPath}/assets/img/`,
    fonts: `${distPath}/assets/fonts/`,
    files: `${distPath}/assets/files/`,
  },
  build: {
    html: `${buildPath}/`,
    css: `${buildPath}/assets/css/`,
    mincss: `${buildPath}/assets/css-min/`,
    js: `${buildPath}/assets/js/`,
    minjs: `${buildPath}/assets/js-min/`,
    images: `${buildPath}/assets/img/`,
    fonts: `${buildPath}/assets/fonts/`,
    files: `${buildPath}/assets/files/`
  },
  watch: {
    html: `${srcPath}/**/*.html`,
    css: `${srcPath}/assets/scss/**/*.scss`,
    js: `${srcPath}/assets/js/**/*.js`,
    images: `${srcPath}/assets/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp,webmanifest,ico,xml,json}`,
    fonts: `${srcPath}/assets/fonts/**/*.{eot,woff,woff2,ttf,svg}`,
    files: `${srcPath}/assets/files/**/*.*`,
    svgicons: `${srcPath}/assets/svgicons/**/*.svg`,
  },
  cleanDist: `./${distPath}/`,
  cleanBuild: `./${buildPath}/`,
  archive: `./${archivePath}/`,
}


//HTML
function html() {
  return src(path.src.html, { base: srcPath })
    .pipe(plumber())
    .pipe(fileInclude())
    .pipe(replace(/@img\//g, 'assets/img/'))
    // .pipe(webpHtmlNosvg())
    // .pipe(versionNumber({
    //   'value': '%DT%',
    //   'append': {
    //     'key': '_v',
    //     'cover': 0,
    //     'to': [
    //       'css',
    //       'js',
    //     ]
    //   },
    //   'output': {
    //     'file': 'gulp/version.json'
    //   }
    // }))
    .pipe(dest(path.dist.html))
    .pipe(browserSync.reload({ stream: true }))
}
function htmlBuild() {
  return src(path.src.html, { base: srcPath })
    .pipe(plumber())
    .pipe(fileInclude())
    .pipe(replace(/@img\//g, 'assets/img/'))
    .pipe(webpHtmlNosvg())
    .pipe(versionNumber({
      'value': '%DT%',
      'append': {
        'key': '_v',
        'cover': 0,
        'to': [
          'css',
          'js',
        ]
      },
      'output': {
        'file': 'gulp/version.json'
      }
    }))
    .pipe(dest(path.build.html))
}

//CSS
function css() {
  return src(path.src.scss, {
    base: `${srcPath}/assets/scss/`,
    sourcemaps: true
  })
    .pipe(plumber(
      notify.onError({
        title: "SCSS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(replace(/@img\//g, '../img/'))
    .pipe(sass({
      outputStyle: 'expanded',
    }))
    // .pipe(groupCssMediaQueries())
    // .pipe(webpcss({
    //   webpClass: ".webp",
    //   noWebpClass: ".no-webp"
    // }))
    // .pipe(autoprefixer({
    //   grid: true,
    //   overrideBrowserslist: ["last 5 version"],
    //   cascade: true,
    // }))
    .pipe(rename({
      extname: '.css'
    }))
    .pipe(dest(path.dist.css))
    .pipe(browserSync.reload({ stream: true }))
}
function cssBuild() {
  return src(path.src.scss, {
    base: `${srcPath}/assets/scss/`,
    sourcemaps: false
  })
    .pipe(plumber(
      notify.onError({
        title: "SCSS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(replace(/@img\//g, '../img/'))
    .pipe(sass({
      outputStyle: 'expanded',
    }))
    .pipe(groupCssMediaQueries())
    .pipe(webpcss({
      webpClass: ".webp",
      noWebpClass: ".no-webp"
    }))
    .pipe(autoprefixer({
      grid: true,
      overrideBrowserslist: ["last 5 version"],
      cascade: true,
    }))
    .pipe(dest(path.build.css))
    .pipe(cleanCss())
    .pipe(rename({
      suffix: '.min',
      extname: '.css',
    }))
    .pipe(dest(path.build.mincss))
}

//JS
function js() {
  return src(path.src.js, {
    base: `${srcPath}/assets/js/`,
    sourcemaps: true,
  })
    .pipe(plumber(
      notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(rigger())
    .pipe(dest(path.dist.js))
    .pipe(browserSync.reload({ stream: true }))
}
function jsBuild() {
  return src(path.src.js, {
    base: `${srcPath}/assets/js/`,
    sourcemaps: false,
  })
    .pipe(plumber(
      notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(rigger())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min',
      extname: '.js',
    }))
    .pipe(dest(path.build.minjs))
}

//IMAGES
function images() {
  return src(path.src.images, {
    base: `${srcPath}/assets/img/`,
    sourcemaps: true,
  })
    .pipe(plumber(
      notify.onError({
        title: "IMAGES",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(newer(path.dist.images))
    // .pipe(webp())
    // .pipe(dest(path.dist.images))
    // .pipe(src(path.src.images, {
    //   base: `${srcPath}/assets/img/`,
    //   sourcemaps: true,
    // }))
    // .pipe(newer(path.dist.images))
    .pipe(dest(path.dist.images))
    .pipe(src(path.src.svg, {
      base: `${srcPath}/assets/img/`,
      sourcemaps: true,
    }))
    .pipe(dest(path.dist.images))
    .pipe(browserSync.reload({ stream: true }))
}
function imagesBuild() {
  return src(path.src.images, {
    base: `${srcPath}/assets/img/`,
    sourcemaps: false,
  })
    .pipe(plumber(
      notify.onError({
        title: "IMAGES",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(webp())
    .pipe(dest(path.build.images))
    .pipe(src(path.src.images, {
      base: `${srcPath}/assets/img/`,
      sourcemaps: true,
    }))
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 3 }), //от 0 до 7
    ]))
    .pipe(dest(path.build.images))
    .pipe(src(path.src.svg, {
      base: `${srcPath}/assets/img/`,
      sourcemaps: true,
    }))
    .pipe(dest(path.build.images))
}

//SVG SPRIVE
function svgSprive() {
  return src(path.src.svgicons, {
    base: `${srcPath}/assets/svgicons/`,
    sourcemaps: true,
  })
    .pipe(plumber(
      notify.onError({
        title: "SVG",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(svgSprite({
      shape: {
        transform: [{
          "svgo": {
            "plugins": [
              { removeAttrs: { attrs: '(fill|stroke|style)' } }
            ]
          }
        }]
      },
      mode: {
        stack: {
          sprite: '../icons/icons.svg',
          //Создавать страницу с перечнем иконок
          example: true //Включает предпросмотр спрайтов в отдельном HTML
        }
      },
    }))
    .pipe(dest(path.dist.images))
    .pipe(browserSync.reload({ stream: true }))
}
function svgSpriveBuild() {
  return src(path.src.svgicons, {
    base: `${srcPath}/assets/svgicons/`,
    sourcemaps: false,
  })
    .pipe(plumber(
      notify.onError({
        title: "SVG",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(svgSprite({
      shape: {
        transform: [{
          "svgo": {
            "plugins": [
              { removeAttrs: { attrs: '(fill|stroke|style)' } }
            ]
          }
        }]
      },
      mode: {
        stack: {
          sprite: '../icons/icons.svg',
          //Создавать страницу с перечнем иконок
          example: false //Включает предпросмотр спрайтов в отдельном HTML
        }
      },
    }))
    .pipe(dest(path.build.images))
}

//FONTS
function otfToTtf() {
  return src(`${path.src.fonts}/*.otf`, {
    base: `${srcPath}/assets/fonts/`,
    sourcemaps: true,
  })
    .pipe(plumber(plumber(
      notify.onError({
        title: "FONTS",
        message: "Error: <%= error.message %>"
      })
    )))
    .pipe(fonter({    //конвертация в ttf
      formats: ['ttf']
    }))
    .pipe(dest(`${path.src.fonts}/`))
}
function ttfToWoff() {
  return src(`${path.src.fonts}/*.ttf`, {
    base: `${srcPath}/assets/fonts/`,
    sourcemaps: true,
  })
    .pipe(plumber(plumber(
      notify.onError({
        title: "FONTS",
        message: "Error: <%= error.message %>"
      })
    )))
    .pipe(fonter({ //Конвертация в woff
      formats: ['woff']
    }))
    .pipe(dest(path.dist.fonts))
    .pipe(src(`${path.src.fonts}/*.ttf`, {}))
    .pipe(ttf2woff2()) //Конвертация в woff2
    .pipe(dest(path.dist.fonts))
}
function fontsStyle() {
  //Файл стидей подключения шрифтов
  let fontsFile = `${srcPath}/assets/scss/default/_fonts.scss`;
  //Проверяем, существуют ли файлы шрифтов
  fs.readdir(path.dist.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      //Проверяем, существует ли файл стилей для подключения шрифтов
      if (!fs.existsSync(fontsFile)) {
        //Если файла нет, создаем его
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          //Записываем подключение шрифтов в файл стилей
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;

            let fontStyle = fontFileName.toLowerCase().indexOf('italic');
            fontStyle = fontStyle === -1 ? 'normal' : 'italic';

            if (fontWeight.toLowerCase() === 'thin') {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === 'extralight') {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === 'light') {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === 'medium') {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === 'semibold') {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontWeight = 700;
            } else if (fontWeight.toLowerCase() === 'extrabold') {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === 'black') {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(fontsFile, `@font-face{\n\tfont-family: '${fontName}';\n\tfont-display: swap;\n\tsrc: local("${fontName}"), url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: ${fontStyle};\n}\r\n`, cb);
            newFileOnly = fontFileName;
          }
        }
      } else {
        //Если файл есть, выводим сообщение
        console.log("Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!");
      }
    }
  })

  return src(`${srcPath}/`);
  function cb() { }
}

function otfToTtfBuild() {
  return src(`${path.src.fonts}/*.otf`, {
    base: `${srcPath}/assets/fonts/`,
    sourcemaps: false,
  })
    .pipe(plumber(plumber(
      notify.onError({
        title: "FONTS",
        message: "Error: <%= error.message %>"
      })
    )))
    .pipe(fonter({    //конвертация в ttf
      formats: ['ttf']
    }))
    .pipe(dest(`${path.src.fonts}/`))
}
function ttfToWoffBuild() {
  return src(`${path.src.fonts}/*.ttf`, {
    base: `${srcPath}/assets/fonts/`,
    sourcemaps: false,
  })
    .pipe(plumber(plumber(
      notify.onError({
        title: "FONTS",
        message: "Error: <%= error.message %>"
      })
    )))
    .pipe(fonter({ //Конвертация в woff
      formats: ['woff']
    }))
    .pipe(dest(path.build.fonts))
    .pipe(src(`${path.src.fonts}/*.ttf`, {}))
    .pipe(ttf2woff2()) //Конвертация в woff2
    .pipe(dest(path.build.fonts))
}
function fontsStyleBuild() {
  //Файл стидей подключения шрифтов
  let fontsFile = `${srcPath}/assets/scss/default/_fonts.scss`;
  //Проверяем, существуют ли файлы шрифтов
  fs.readdir(path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      //Проверяем, существует ли файл стилей для подключения шрифтов
      if (!fs.existsSync(fontsFile)) {
        //Если файла нет, создаем его
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          //Записываем подключение шрифтов в файл стилей
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;

            let fontStyle = fontFileName.toLowerCase().indexOf('italic');
            fontStyle = fontStyle === -1 ? 'normal' : 'italic';

            if (fontWeight.toLowerCase() === 'thin') {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === 'extralight') {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === 'light') {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === 'medium') {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === 'semibold') {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontWeight = 700;
            } else if (fontWeight.toLowerCase() === 'extrabold') {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === 'black') {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(fontsFile, `@font-face{\n\tfont-family: '${fontName}';\n\tfont-display: swap;\n\tsrc: local("${fontName}"), url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: ${fontStyle};\n}\r\n`, cb);
            newFileOnly = fontFileName;
          }
        }
      } else {
        //Если файл есть, выводим сообщение
        console.log("Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!");
      }
    }
  })

  return src(`${srcPath}/`);
  function cb() { }
}

//FILES
function copyFiles() {
  return src(path.src.files)
    .pipe(dest(path.dist.files))
}
function copyFilesBuild() {
  return src(path.src.files)
    .pipe(dest(path.build.files))
}

//CLEAN
function clean() {
  return del(path.cleanDist)
}
function cleanBuild() {
  return del(path.cleanBuild)
}

//ZIP archive

function zipFolder() {
  del(`${path.archive}`);
  let time = new Date();
  time = time.toLocaleString();
  time = time.replace('.','-');
  time = time.replace('.','-');
  time = time.replace(' ','');
  time = time.replace(',','_');
  time = time.replace(':','-');
  time = time.replace(':','-');
  console.log(time);
  return src(`./${buildPath}/**/*.*`, {})
    .pipe(plumber(
      notify.onError({
        title: "ZIP",
        message: "Error: <%= error.message %>"
      })
    ))

    .pipe(zipArchive(`${rootFolder}_${time}.zip`))
    .pipe(dest(path.archive));
}

//SERVER
function server(done) {
  browserSync.init({
    server: {
      baseDir: `./${distPath}/`,
    },
    notify: false,
    port: 3000,
  })
}

//WATCHER - НАБЛЮДАТЕЛЬ
function watcher() {
  gulp.watch([path.watch.html], html)
  gulp.watch([path.watch.css], css)
  gulp.watch([path.watch.js], js)
  gulp.watch([`${srcPath}/assets/external-modules/**/*.js`], js)
  gulp.watch([`${srcPath}/assets/external-modules/**/*.css`], css)
  gulp.watch([`${srcPath}/assets/external-modules/**/*.scss`], css)
  gulp.watch([path.watch.images], images)
  gulp.watch([path.watch.files], copyFiles)
  gulp.watch([path.watch.svgicons], svgSprive)
}

//EXPORTS
exports.html = html
exports.css = css
exports.server = server
exports.copyFiles = copyFiles
exports.watcher = watcher
exports.clean = clean
exports.js = js
exports.images = images
exports.otfToTtf = otfToTtf
exports.ttfToWoff = ttfToWoff
exports.fontsStyle = fontsStyle
exports.svgSprive = svgSprive
exports.zipFolder = zipFolder
//EXPORTSforBUILD
exports.htmlBuild = htmlBuild;
exports.copyFilesBuild = copyFilesBuild;
exports.cleanBuild = cleanBuild;
exports.cssBuild = cssBuild;
exports.jsBuild = jsBuild;
exports.imagesBuild = imagesBuild;
exports.otfToTtfBuild = otfToTtfBuild;
exports.ttfToWoffBuild = ttfToWoffBuild;
exports.fontsStyleBuild = fontsStyleBuild;
exports.svgSpriveBuild = svgSpriveBuild;



//основные сценарии
const fontsScenaries = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
const mainTasks = gulp.series(fontsScenaries, gulp.parallel(copyFiles, html, css, js, images, svgSprive));

//npm run DEV
const dev = gulp.series(clean, mainTasks, gulp.parallel(watcher, server));
gulp.task('default', dev);

//npm run BUILD
const fontsScenariesBuild = gulp.series(otfToTtfBuild, ttfToWoffBuild, fontsStyleBuild);
const build = gulp.series(cleanBuild, fontsScenariesBuild, gulp.parallel(copyFilesBuild, htmlBuild, cssBuild, jsBuild, imagesBuild, svgSpriveBuild));
exports.build = build;

//npm run ZIP
const zip = gulp.series(build, zipFolder);
exports.zip = zip;
