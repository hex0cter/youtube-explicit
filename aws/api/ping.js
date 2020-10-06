exports.handler = async (event) => {
  console.log('event', event)

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    body: 'pong'
  }

  return response
}
