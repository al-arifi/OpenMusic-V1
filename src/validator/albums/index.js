const {albumPayloadSchema, songPayloadSchema} = require('./schema')
const InvariantError = require('../../error/InvariantError')

const AlbumsValidator = {
    validateAlbumPayload : (payload) => {
        const validationResult = albumPayloadSchema.validate(payload)
        if(validationResult.error) throw new InvariantError(validationResult.error.message)
    },

    validateSongPayload : (payload) => {
        const validationResult = songPayloadSchema.validate(payload)
        if(validationResult.error) throw new InvariantError(validationResult.error.message)
    }
}

module.exports = AlbumsValidator
