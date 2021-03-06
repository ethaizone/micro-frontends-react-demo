module.exports = {
  'presets': [
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'usage',
        'corejs': 3,
        'forceAllTransforms': true,
      }
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
 'plugins': [
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    // ['react-refresh/babel'],
  ],
}
