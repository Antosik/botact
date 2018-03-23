module.exports = {
  api: require('../api'),
  use: require('./use'),
  on: require('./on'),
  event: require('./event'),
  reply: require('./reply'),
  handler: require('./handler'),
  uploadDocument: require('./upload/document'),
  uploadPhoto: require('./upload/photo'),
  uploadCover: require('./upload/cover'),
  listen: require('./listen'),
  execute: require('./execute'),
  executeHandler: require('../utils/executeHandler'),
  getLastMessage: require('../utils/getLastMessage')
};
