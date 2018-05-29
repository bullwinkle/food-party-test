module.exports = {
  plugins: {
    'postcss-cssnext': {
      warnForDuplicates: false // because of cssnano
    },
    'postcss-short': {},
    'cssnano': {
      preset: 'default',
    },
  }
};
