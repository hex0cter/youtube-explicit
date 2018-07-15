const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event) => {
  console.log('event', event)

  const body = JSON.parse(event.body)
  const email = body.email
  const password = body.password

  const readParams = {
    TableName: `${process.env.SERVICE_NAME}-${process.env.STAGE}-Users`,
    KeyConditions: {
      email: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [email]
      }
    }
  }
  const data = await docClient.query(readParams).promise()


  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify({})
  }

  return response
}
