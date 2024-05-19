//Імпортуємо модулі html-webpack-plugin і path
//і визначаємо змінні для цих модулів HtmlWebpackPlugin і path відповідно.
const FileManagerPlugin = require('filemanager-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
//! Зміна для Css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//цей запис означає, що всі параметри цього файлу розміщуються в об'єкті,
//який експортується як модуль за замовченням.
module.exports = {
    //
    module:{
        rules:[
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            //!Правило для перетворення pug файлів
            {
                test: /\.pug$/,
                loader: 'pug-loader',
            },
            //Правило для файлів Sass
            {
                test: /\.(scss|css)$/,
                use: [
                    //'style-loader', 
                    MiniCssExtractPlugin.loader,
                    'css-loader', 'postcss-loader', 'sass-loader'],
            }
        ],
    },


    //Для плагіна html-webpack-plugin створюється екземляр new HtmlWebpackPlugin
    //з двома заданими властивостями:
    // template - шлях до вхідного файлу та
    // filename - ім'я вихідного файлу.
    plugins: [

        new HtmlWebpackPlugin({
            // __dirname - глобальна константа, яка вказує абсолютний шлях до каталогу файлу
            // template: path.join(__dirname, 'src', 'template.html'),
            template: path.join(__dirname, 'src', 'template.pug'),
            filename: 'index.html',
        }),
        //!Підключаємо плагін для очищення
        new FileManagerPlugin({
            events:{
                onStart:{
                    delete: ['dist'],
                },
            },
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],

    //watchFiles вказує на каталог src, за якими вестиметься спостереження і у випадку,
    //якщо в каталозі відбудуться зміни,
    //веб-сервер автоматично зробить складання проекту і перезавантажить сторінку браузера,
    //port вказує порт, на якому буде працювати веб-сервер, за замовчуванням - localhost:8080
    devServer:{
        watchFiles: path.join(__dirname, 'src'),
        port: 9000,
    }
};