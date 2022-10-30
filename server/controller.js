const {nft}= require("./db")

const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
            drop table if exists nfts;
            CREATE TABLE nfts (
                nft_id SERIAL PRIMARY KEY,
                name VARCHAR,
                imageUrl VARCHAR
            );
            CREATE TABLE emails (
                email_id SERIAL PRIMARY KEY,
                email VARCHAR
            );

            INSERT INTO nfts (name, imageUrl)
            values('Goat Society 9598', 'https://tinyurl.com/2p92jckj'),
            ('You 2028 By MyBFF', 'https://tinyurl.com/y6he6vmt'),
            ('Gummies Gang #5532', 'https://tinyurl.com/2pnu85cx'),
            ('CatBlox #8713','https://tinyurl.com/aaurue4d'),
            ('BFF Bracelet', 'https://tinyurl.com/c4cny4yz'),
            ('Gray Boy #2911', 'https://tinyurl.com/2we953kd'),
            ('Billionaire #2920', 'https://tinyurl.com/4fkm5h2x'),
            ('Trooper #4877', 'https://tinyurl.com/23vpnzkb'),
            ('Moon Boyz #2318', 'https://tinyurl.com/ywkfu94u'),
            ('Ameegos #839', 'https://tinyurl.com/zhhdyusb'),
            ('Crazy Camel #143', 'https://tinyurl.com/yckcxkyf'),
            ('SpaceBoys #1052', 'https://tinyurl.com/mr2w3tfu');

            INSERT INTO emails (email)
            values('kaapeko@gmail.com')
        `)
        .then(()=>{
            console.log("DB seeded")
            res.sendStatus(200)
        })
        .catch(err => console.log('error seeding DB', err))
    
    },
    submitEmail(req,res){
        const{email} = req.body
        sequelize.query(`
        INSERT INTO emails (email)
        VALUES('${email}')
        `)
        .then(()=>{
            res.sendStatus(200)
        })
        .catch(err => console.log('error sending email', err))
    },

    getAllNft (req, res) {
        sequelize.query(`
        SELECT *
        FROM nfts
        `)
        .then(dbRes =>{
        res.status(200).send(dbRes[0])
        })
        .catch(err => console.log(err))
    },

    getNftByName (req, res) {
        const {name} = req.params
        sequelize.query(`
        SELECT *
        FROM nfts
        WHERE LOWER(name) LIKE LOWER('%${name}%');
        `)
        .then(dbRes => {
            res.status(200).send(dbRes[0])
        })
        .catch(err => console.log(err))
    }
}