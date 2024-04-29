const path = require('path');

module.exports = {
  // 진입점 설정
  entry: './src/index.js',
  // 결과물 설정
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // CSS 파일 처리
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // 이미지 파일 처리
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            },
          },
        ],
      },
      // JS 파일 처리
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
