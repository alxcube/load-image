const commonConfig = require('./babel.config.common');

module.exports = {
    presets: [
        ...commonConfig.presets,
        [
            '@babel/preset-env',
            {
                targets: {
                    chrome: '58',
                    firefox: '60',
                    safari: '11.1',
                    edge: '16',
                },
                useBuiltIns: false
            },
        ],
    ],
};
