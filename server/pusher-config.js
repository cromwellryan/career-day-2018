const config = require('config');

module.exports = {
  appId: process.env.PUSHER_APPID || config.pusher.appId,
  key: process.env.PUSHER_KEY || config.pusher.key,
  secret: process.env.PUSHER_SECRET || config.pusher.secret,
  cluster: process.env.PUSHER_CLUSTER || config.pusher.cluster,
  encrypted: true
}
