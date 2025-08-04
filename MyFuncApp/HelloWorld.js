const { app } = require('@azure/functions');

const handler = async (request, context) => {
  const name = request.query.name || request.body || "world";
  context.res = {
    status: 200,
    body: `Hello, ${name}!`
  };
};

app.http('HelloWorld', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler
});

module.exports = handler; // <- Export handler for tests
