module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  plugins: [
    'babel-plugin-transform-import-meta',
    [
      'babel-plugin-transform-require-ignore',
      {
        extensions: ['.css', '.scss', '.svg', '.png', '.jpg', '.jpeg', '.less', '.pl.js']
      }
    ]
  ]
};
