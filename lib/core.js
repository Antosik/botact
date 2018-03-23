const methods = require('./methods');

module.exports = class Botact {
  constructor(settings) {
    const { confirmation, token } = settings;

    if (!confirmation) {
      throw new Error('confirmation is required');
    } else if (!token) {
      throw new Error('token is required');
    }

    this.actions = { events: [], on: [], middlewares: [] };
    this.methods = [];
    this.settings = settings;

    Object.assign(
      this,
      Object.entries(methods)
        .map(([key, value]) => ({ [key]: value.bind(this) }))
        .reduce((a, b) => ({ ...a, ...b }), {})
    );

    setInterval(() => {
      this.executeHandler(this.methods);
      this.methods = [];
    }, (1000 / 20));
  }

  use(callback) {
    return this.use(callback);
  }

  on(callback) {
    return this.on(callback);
  }

  event(event, callback) {
    return this.event(event, callback);
  }

  reply(user_id, message, attachment) {
    return this.reply(user_id, message, attachment);
  }

  handler(ctx) {
    return this.handler(ctx);
  }

  uploadDocument(file, peer_id, type) {
    return this.uploadDocument(file, peer_id, type);
  }

  uploadPhoto(file, peer_id) {
    return this.uploadPhoto(file, peer_id);
  }

  uploadCover(file, settings) {
    return this.uploadCover(file, settings);
  }

  listen(req, res) {
    return this.listen(req, res);
  }
}
