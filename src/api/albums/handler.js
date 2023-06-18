const ClientError = require('../../error/ClientError')

class AlbumsHandler {
    constructor(service, validator){
        this._service = service
        this._validator = validator

        this.postAlbumHandler = this.postAlbumHandler.bind(this)
        this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this)
        this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this)
        this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this)
        this.postSongHandler = this.postSongHandler.bind(this)
        this.getSongsHandler = this.getSongsHandler.bind(this)
        this.getSongByIdHandler = this.getSongByIdHandler.bind(this)
        this.putSongByIdHandler = this.putSongByIdHandler.bind(this)
        this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this)

    }

    async postAlbumHandler(req, h){
        try {   
            this._validator.validateAlbumPayload(req.payload)
            const {name, year} = req.payload
            const albumId = await this._service.addAlbum({name,year})
            return h.response({
                status : 'success',
                message: 'Album berhasil ditambahkan',
                data : {
                    albumId
                }
            }).code(201)

        } catch (error) {
            if(error instanceof ClientError){
                return h.response({
                    status : 'fail',
                    message : error.message
                }).code(error.statusCode)
            }

            return h.response({
                status : 'error',
                message : 'Kesalahan pada Server'
            }).code(500)
        }
    }

    async getAlbumByIdHandler(req, h){
        try {
            const {id} = req.params
            const album = await this._service.getAlbumById(id)

            return h.response({
                status : 'success',
                data : {
                    album
                }
            }).code(200)
            
        } catch (error) {
            if(error instanceof ClientError){
                return h.response({
                    status : 'fail',
                    message : error.message
                }).code(error.statusCode)
            }

            return h.response({
                status : 'error',
                message : 'Kesalahan pada Server'
            }).code(500)
        }
    }

    async putAlbumByIdHandler(req, h){
        try {

            this._validator.validateAlbumPayload(req.payload)

            const {id} = req.params
            const {name, year} = req.payload
            await this._service.editAlbumById(id, {name, year})

            return h.response({
                status  : 'success',
                message : 'Album berhasil  diperbarui'
            }).code(200)

        } catch (error) {
            if(error instanceof ClientError){
                return h.response({
                    status : 'fail',
                    message : error.message
                }).code(error.statusCode)
            }

            return h.response({
                status : 'error',
                message : 'Kesalahan pada Server'
            }).code(500)
        }
    }

    async deleteAlbumByIdHandler(req, h){
        try {
            const {id} = req.params
            await this._service.deleteAlbumById(id)
            return h.response({
                status  : 'success',
                message : 'Album berhasil  dihapus'
            }).code(200)

        } catch (error) {
            if(error instanceof ClientError){
                return h.response({
                    status : 'fail',
                    message : error.message
                }).code(error.statusCode)
            }

            return h.response({
                status : 'error',
                message : 'Kesalahan pada Server'
            }).code(500)
        }
    }

    async postSongHandler(req, h){
        try {

            this._validator.validateSongPayload(req.payload)

            const {title, year, performer, genre, duration, albumId} = req.payload
            const songId = await this._service.addSong({title, year, performer, genre, duration, albumId})

            return h.response({
                status : 'success',
                message: 'Lagu berhasil ditambahkan',
                data : {
                    songId
                }
            }).code(201)
            
        } catch (error) {
            if(error instanceof ClientError){
                return h.response({
                    status : 'fail',
                    message : error.message
                }).code(error.statusCode)
            }

            return h.response({
                status : 'error',
                message : 'Kesalahan pada Server'
            }).code(500)
        }
    }

    async getSongsHandler(req, h){
        const songs = await this._service.getAllSongs(req.query)
        return h.response({
            status : 'success',
            data : {
                songs
            }
        }).code(200)
    }

    async getSongByIdHandler(req, h){
        try {
            const {id} = req.params
            const song = await this._service.getSongById(id)

            return h.response({
                status : 'success',
                data : {
                    song
                }
            })
        } catch (error) {
            if(error instanceof ClientError){
                return h.response({
                    status : 'fail',
                    message : error.message
                }).code(error.statusCode)
            }

            return h.response({
                status : 'error',
                message : 'Kesalahan pada Server'
            }).code(500)
        }
    }

    async putSongByIdHandler(req, h){
        try {

            this._validator.validateSongPayload(req.payload)
            const{id} = req.params
            await this._service.editSongById(id,req.payload)
            return h.response({
                status : 'success',
                message: 'Lagu berhasil diperbarui',
            }).code(200)

        } catch (error) {
            if(error instanceof ClientError){
                return h.response({
                    status : 'fail',
                    message : error.message
                }).code(error.statusCode)
            }

            return h.response({
                status : 'error',
                message : 'Kesalahan pada Server'
            }).code(500)
        }
    }

    async deleteSongByIdHandler(req, h){
            try {

                const {id} = req.params
                await this._service.deleteSongById(id)

                return h.response({
                    status : 'success',
                    message : 'Lagu berhasil dihapus'
                }).code(200)
                
            } catch (error) {
                if(error instanceof ClientError){
                    return h.response({
                        status : 'fail',
                        message : error.message
                    }).code(error.statusCode)
                }
    
                return h.response({
                    status : 'error',
                    message : 'Kesalahan pada Server'
                }).code(500)
            }
    }
}

module.exports = AlbumsHandler