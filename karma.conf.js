// Karma configuration
module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
        frameworks: ['jasmine', 'webpack'],


        // list of files / patterns to load in the browser
        files: [
            'spec/**/*.spec.ts'
        ],


        // list of files / patterns to exclude
        exclude: [
            'spec/**/*.spec.d.ts'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
        preprocessors: {
            'spec/**/*.spec.ts': ['webpack', 'sourcemap'],
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
        reporters: ['kjhtml'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
        browsers: ['Opera'],

        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser instances should be started simultaneously
        concurrency: Infinity,

        webpack: {
            resolve: {
                extensions: [".ts", ".tsx", ".js"]
            },
            module: {
                rules: [
                    {
                        test: /\.(js)|(ts)$/,
                        exclude: /(node_modules|bower_components)/,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    "presets": [
                                        "@babel/preset-typescript",
                                        [
                                            '@babel/env',
                                            {
                                                debug: true,
                                                useBuiltIns: false,
                                                targets: {
                                                    ie: 8
                                                }
                                            }
                                        ]
                                    ],
                                    "plugins": [
                                        [
                                            "@babel/plugin-transform-typescript",
                                            {
                                                parserOpts: {
                                                    declaration: false
                                                }
                                            }
                                        ]
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            devtool: 'inline-source-map'
        }
    });
};
