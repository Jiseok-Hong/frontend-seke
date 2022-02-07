module.exports = (api) => {
    api.cache(true);
    const presets = ['react-app'];
    const plugins = [
        // 'transform-remove-console',
        [
            'module-resolver',
            {
                root: ['./src/'],
                alias: {},
            },
        ],
    ];

    return {
        presets,
        plugins,
    };
};
