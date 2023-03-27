const path = require('path');

module.exports = {
    entry: {
        database: "./public/database.js",
        firebaseinit: "./public/firebaseinit.js",
        index: "./public/index.js",
        createnewuser: "./public/createnewuser.js",
        homepageEdit: "./public/homepage-edit.js",
        forgotpassword: "./public/forgotpassword.js"
    },
    mode: "development",
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    output: {
        path:  path.join(__dirname, 'public/dist'),
        filename: "[name].bundle.js",
        clean: true,
    },

    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9050,
    },
};