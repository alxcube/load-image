const commonConfig = require('./babel.config.common');

module.exports = {
    presets: [
        ...commonConfig.presets,
        [
            '@babel/preset-env',
            {
                targets: {
                    ie: '9'
                },
                useBuiltIns: false,
                corejs: 3,
            },
        ],
    ],
};
