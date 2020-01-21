const _ = require('lodash')
const axios = require('axios')
const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event) => {
  console.log('event', event)
  const playlist = event.pathParameters.playlist
  const currrentTimestamp = Date.now()

  const params = {
    TableName : `${process.env.SERVICE_NAME}-${process.env.STAGE}-Playlists`,
    Key: { playlist }
  }

  const data = await docClient.get(params).promise()
  let playlistData = data.Item

  // Update the list only if it is older than 15 minutes
  if (_.isEmpty(playlistData) || currrentTimestamp - playlistData.timestamp > 15 * 60000) {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlist}&key=AIzaSyBVrfMofoyGgP8KcCyHF9PSKQsayy7qNpI&maxResults=50`)
    // console.log('response from google', response)
    const items = response.data ? response.data.items : []

    playlistData = { playlist, timestamp: Date.now(), items: JSON.stringify(items)}
    // console.log('>>>> item to save is', JSON.stringify(playlistData, null, 2))
    await docClient.put({
      TableName: `${process.env.SERVICE_NAME}-${process.env.STAGE}-Playlists`,
      Item: playlistData
    }).promise()
    // console.log('>>>> found data from google', playlistData)
  } else {
    // console.log('>>>> use data in DB', playlistData)
  }

  const { items } = playlistData
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify({playlist, items: JSON.parse(items)})
  }

  return response
}
