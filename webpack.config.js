const path = require('path');

module.exports = {
    entry: {
        database: "./public/database.js",
        firebaseinit: "./public/firebaseinit.js",
        index: "./public/index.js",
        createnewuser: "./public/createnewuser.js",
        forgotpassword: "./public/forgotpassword.js",
        homepageView: "./public/homepage-view.js",
        homepageEdit: "./public/homepage-edit.js",
        accountView: "./public/account-view.js",
        eventLog: "./public/eventlog.js",
        myUtil: "./public/MyUtil.js",
        generalJournalView: "./public/generaljournal-view.js",
        generalJournalEdit: "./public/generaljournal-edit.js",
        entryApproval: "./public/entryApproval.js",
        errorLog: "./public/errorlog.js",
        financialStatements: "./public/financialstatements.js",
        trialBalance: "./public/trialbalance.js",
        editProfile: "./public/editprofile.js",
        landingPage: "./public/landingPage.js",     
        dashboard: "./public/dashboard.js"
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