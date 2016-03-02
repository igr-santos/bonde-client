var context = require.context('./app/scripts/tests', true, /Test\.(js|jsx|es5.js)$/);

beforeEach(() => {
  sandbox = sinon.sandbox.create()
  requests = []
  xhr = sinon.useFakeXMLHttpRequest()
  xhr.onCreate = function (req) { requests.push(req); }
})

afterEach(() => {
  xhr.restore()
  sandbox.restore()
})

context.keys().forEach(context);
