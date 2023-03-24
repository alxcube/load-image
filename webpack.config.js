const path = require('path');
const webpack = require('webpack');
const packageInfo = require('./package.json');
const isModern = process.env.BROWSERSLIST_ENV === 'modern';
const isLegacy = !isModern;
const babelConfig = isModern ? require('./babel.config.modern') : require('./babel.config.legacy');
const environment = process.env.NODE_ENV;
const isProduction = environment === 'production';

const libraryName = 'loadImage';
const fileName = 'load-image';


module.exports  = env => {
    const minify    = env && env.minify;

    return {
        context: path.resolve(__dirname),
        entry: `./src/${libraryName}.ts`,
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        output: {
            library: {
                name: {
                    amd: libraryName,
                    commonjs: libraryName,
                    root: ['alxcube', libraryName]
                },
                type: 'umd',
            },
            filename: fileName + (isLegacy ? '.legacy' : '') + (minify ? '.min' : '') + '.js',
            path: path.resolve(__dirname, 'dist'),
            globalObject: 'typeof window !== "undefined" ? window : this',
            environment: {
                arrowFunction: isModern,
                const: isModern,
                destructuring: isModern,
                dynamicImport: false,
                forOf: isModern,
                module: false,
                optionalChaining: isModern,
                templateLiteral: isModern,
            },
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },
        optimization: {
            minimize: !!minify
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: babelConfig
                        }
                    ]
                }
            ]
        },
        plugins: [
            new webpack.BannerPlugin({
                banner: `${packageInfo.name} ${packageInfo.version}\n© 2023 ${packageInfo.author}\nLicense: ${packageInfo.license}`
            })
        ]
    };
};