const fetch = require('node-fetch')

// Sends the topology to ONOS as a network configuraion object
const deployONOSTopology = async (networkConfiguration) => {
  return fetch(process.env.ONOS_API_ENDPOINT + 'network/configuration', {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + Buffer.from(process.env.ONOS_API_USER + ':' + process.env.ONOS_API_PASSWORD).toString('base64')
    },
    body: JSON.stringify(networkConfiguration, null, '\t')
  })
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        throw new Error('Response code: ' + response.status + '\nResponse error: ' + response.statusText)
      }
    })
    .then(async () => {
      console.log('ONOS topology has been updated successfully.')
    })
    .catch((error) => {
      throw new Error(error.message)
    })
}

// Removes the ONOS network configuration (it does nothing)
const removeONOSTopology = async () => {
  return fetch(process.env.ONOS_API_ENDPOINT + 'network/configuration', {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      Authorization: 'Basic ' + Buffer.from(process.env.ONOS_API_USER + ':' + process.env.ONOS_API_PASSWORD).toString('base64')
    }
  })
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        throw new Error('Response code: ' + response.status + '\nResponse error: ' + response.statusText)
      }
    })
    .then(async () => {
      return {
        success: true
      }
    })
    .catch((error) => {
      return {
        success: false,
        message: error.message
      }
    })
}

module.exports = {
  deployONOSTopology, removeONOSTopology
}
