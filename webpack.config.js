const path = require('path');

module.exports = {
    entry: "./public/index.js",
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
        path:  path.join(__dirname, 'public'),
        filename: "bundle.js",
    },

    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9050,
    },
};