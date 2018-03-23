const { Botact } = require('../');

const bot = new Botact({
  confirmation: process.env.CONFIRMATION,
  group_id: process.env.GROUP_ID,
  token: process.env.TOKEN
});

const callApi = (body) => bot.listen({ body }, {
  end() {
  }
});

exports.bot = bot;
exports.callApi = callApi;
