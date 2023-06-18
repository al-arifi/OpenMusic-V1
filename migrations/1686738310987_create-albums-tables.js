/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('songs', {
        id : {
            type : 'VARCHAR(50)',
            primaryKey : true,
        },
        title : {
            type : 'TEXT',
            notNull : true
        },
        year : {
            type : 'integer',
            notNull : true
        },
        performer : {
            type : 'TEXT',
            notNull: true
        },
        genre : {
            type : 'TEXT',
            notNull: true
        },
        duration : {
            type : 'integer',
            notNull : false,
        },
        albumid : {
            type : 'TEXT',
            notNull : false,
        }
    })

    pgm.createTable('albums',{
        id : {
            type  : 'VARCHAR(50)',
            primaryKey : true
        },
        name : {
            type : 'TEXT',
            notNull : true
        },
        year : {
            type : 'integer',
            notNull : true
        }

    })
};

exports.down = pgm => {
    pgm.dropTable('songs')
    pgm.dropTable('albums')
};
