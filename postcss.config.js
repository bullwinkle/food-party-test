module.exports = {
  plugins: {
    'postcss-cssnext': {
      warnForDuplicates: false // because of cssnano
    },
    'postcss-short': {},
    // 'cssnano': {
    //   preset: 'default',
    // },
    'lost': {},
    // 'postcss-retina-bg-img': {
    //   retinaSuffix: ['@2x', '_2x']
    // }
    // 'postcss-sprites': {}
  }
};
