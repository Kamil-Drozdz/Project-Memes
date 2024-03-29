export default {
  setupFiles: ['dotenv/config'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/mocks/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  transformIgnorePatterns: ['/node_modules/(?!moment.+\\.js$).+\\.js$']
};
