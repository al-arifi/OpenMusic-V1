const Hapi = require('@hapi/hapi')
require('dotenv').config()
const albums = require('./api/albums')
const AlbumsService = require('./services/postgres/AlbumsServices')
const AlbumsValidator = require('./validator/albums/index')

const init = async () =>{

    const albumService = new AlbumsService()

    const server = Hapi.server({
        host : process.env.HOST,
        port : process.env.PORT,
        routes : {
            cors : {
                origin : ['*']
            }
        }
    })

    await server.register([
        {
            plugin : albums,
            options : {
                service : albumService,
                validator : AlbumsValidator
            }
        }
    ])

    server.start()
    console.log('server berjalan di', server.info.uri)
}

init()