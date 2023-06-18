const {Pool} = require('pg')
const {nanoid} = require('nanoid')
const InvariantError = require('../../error/InvariantError')
const NotFoundError = require('../../error/NotFoundError')

class AlbumsService {
    constructor(){
        this._pool = new Pool
    }

    async addSong({title, year, performer, genre, duration, albumId}){
        const id = nanoid(16)

        const result = await this._pool.query({
            text : 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            values : [id, title, year, performer, genre, duration, albumId]
        })

        if(!result.rows[0].id) throw new InvariantError('Lagu gagal ditambahkan')

        return result.rows[0].id
    }

    async getAllSongs(query){
        const key = Object.keys(query)

        let result = (await this._pool.query('SELECT id,title,performer FROM songs')).rows

        if(key.length === 1){
            if(key[0] === 'title'){
                const resultTitle = result.filter((song) => song.title.toLowerCase().includes(query.title))
                result = resultTitle
            }else if(key[0] === 'performer'){
                const resultPerformer = result.filter((song) => song.performer.toLowerCase().includes(query.performer))
                result = resultPerformer
            }
        }else if(key.length === 2){
            const resultDouble = result.filter((song) => song.title.toLowerCase().includes(query.title) && song.performer.toLowerCase().includes(query.performer))
            result = resultDouble
        }
        
        return result
    }

    async getSongById(id){
        const result = await this._pool.query({
            text : 'SELECT * FROM songs WHERE id = $1',
            values : [id]
        })

        if(!result.rows.length) throw new NotFoundError('Lagu tidak ditemukan')

        return result.rows[0]
    }

    async editSongById(id, {title, year, performer, genre, duration, albumId}){

        const result = await this._pool.query({
            text: 'UPDATE songs SET title=$2, year=$3,performer=$4, genre=$5, duration=$6, albumid=$7 WHERE id=$1 RETURNING id',
            values: [id,title,year,performer,genre,duration,albumId]
        })

        if(!result.rows.length) throw new NotFoundError('Gagal memperbarui Lagu. Lagu tidak ditemukan')
    }

    async deleteSongById(id){
        const result = await this._pool.query({
            text : 'DELETE FROM songs WHERE id=$1 RETURNING id',
            values  : [id]
        })

        if(!result.rows.length) throw new NotFoundError('Gagal menghapus lagu. lagu tidak ditemukan')

    }

    async addAlbum({name, year}){
        const id = nanoid(16)

        const result = await this._pool.query({
            text : 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
            values : [id, name, year]
        })

        if(!result.rows[0].id) throw new InvariantError('Album gagal ditambahkan')

        return result.rows[0].id
    }

    async getAlbumById(id){

        const getSong = await this._pool.query({
            text : 'SELECT id,title,performer FROM songs WHERE albumid=$1',
            values : [id]
        })


        const result = await this._pool.query({
            text : 'SELECT * FROM albums WHERE id = $1',
            values : [id]
        })  

        if(!result.rows.length) throw new NotFoundError('Album tidak ditemukan')

        return {...result.rows[0], "songs" : getSong.rows}
    }

    async editAlbumById(id, {name, year}){
        const result = await this._pool.query({
            text : 'UPDATE albums SET name=$1, year=$2 WHERE id=$3 RETURNING id',
            values : [name, year, id]
        })
        if(!result.rows.length) throw new NotFoundError('Gagal memperbarui album. album tidak ditemukan')
    }

    async deleteAlbumById(id){
        const result = await this._pool.query({
            text : 'DELETE FROM albums WHERE id=$1 RETURNING id',
            values  : [id]
        })

        if(!result.rows.length) throw new NotFoundError('Gagal menghapus album. album tidak ditemukan')

    }
}

module.exports = AlbumsService