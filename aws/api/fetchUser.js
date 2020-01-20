const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event) => {
  console.log('event', event)
  const user = event.pathParameters.user

  const params = {
    TableName : `${process.env.SERVICE_NAME}-${process.env.STAGE}-Users`,
    Key: { user }
  }

  const data = await docClient.get(params).promise()

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify(data.Item)
  }

  return response
}
