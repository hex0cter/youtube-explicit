const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event) => {
  console.log('event', event)

  const body = JSON.parse(event.body)
  const user = body.user
  const playlists = body.playlists
  const item = { user, playlists }

  await docClient.put({
    TableName: `${process.env.SERVICE_NAME}-${process.env.STAGE}-Playlists`,
    Item: item
  }).promise()

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    }
  }

  return response
}
