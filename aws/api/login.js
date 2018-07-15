const AWS = require('aws-sdk')
const uuidv1 = require('uuid/v1')
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

  let responseStatusCode
  let responseBody
  if (data.Count === 0) {
    console.error('Cannot find user for email', email)
    responseStatusCode = 404
    responseBody = {uuid: null, reason: 'User doesnt exist'}
  } else {
    const item = data.Items[0]
    if (password !== item.password) {
      console.error('Incorrect password for email', email)
      responseStatusCode = 403
      responseBody = {uuid: null, reason: 'Incorrect password'}
    } else {
      responseStatusCode = 200
      if (!!item.uuid) {
        responseBody = {uuid: item.uuid}
      } else {
        const uuid = uuidv1()
        const writeParams = {
          TableName: `${process.env.SERVICE_NAME}-${process.env.STAGE}-Users`,
          Item: {
            ...item,
            uuid
          }
        }
        responseBody = { uuid }
        const data = await docClient.put(writeParams).promise()
        console.log('write data response', data)
      }
    }
  }

  const response = {
    statusCode: responseStatusCode,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify(responseBody)
  }

  return response
}
