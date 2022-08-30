const { defineConfig } = require('cypress')
const { cypressBrowserPermissionsPlugin } = require('cypress-browser-permissions')

const mongo = require('cypress-mongodb')


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      mongo.configurePlugin(on)
      config = cypressBrowserPermissionsPlugin(on, config)
      return config
    },
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1920,
    viewportHeight: 1080,
    failOnStatusCode: false,
    env: {
      browserPermissions: {
        notifications: 'allow',
        geolocation: 'allow',
        camera: 'block',
        microphone: 'block',
        images: 'allow',
        javascript: 'allow',
        popups: 'ask',
        plugins: 'ask',
        cookies: 'allow'
      },
      mongodb: {
        'uri': 'mongodb+srv://qtruck:qtruck@cluster0.lzeomqh.mongodb.net/QtruckDB?retryWrites=true&w=majority',
        'database': 'QtruckDB'
      }
    }
  },
})
