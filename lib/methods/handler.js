module.exports = async function (ctx) {
  try {
    const { on } = this.actions;
    const { attachments = [] } = ctx;
    const types = attachments.map(item => item.type);

    const reserved = on
      .sort((a, { type }) => type !== 'message')
      .find(({ type }) => types.indexOf(type) > -1 || type === 'message');

    if (reserved) {
      reserved.callback(ctx);
    }
  } catch (err) {
    console.error(err);
  }
};
