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
            drop table if exists emails;

            CREATE TABLE nfts (
                nft_id SERIAL PRIMARY KEY,
                name VARCHAR,
                imageUrl VARCHAR
            );

            CREATE TABLE emails (
                email_id SERIAL PRIMARY KEY,
                email VARCHAR
            );

            INSERT INTO emails (email)
            values('kvng@gmail.com');

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
            ('SpaceBoys #1052', 'https://tinyurl.com/mr2w3tfu'),
            ('Boohooverse Collection #470' , 'https://tinyurl.com/2hyxnynk'),
            ('Surge Women Passport #2816', 'https://tinyurl.com/2p97h3f4'),
            ('Pleb Punk #862', 'https://tinyurl.com/y8fv3rys'),
            ('Goat Society #4154', 'https://tinyurl.com/npb9tn3j'),
            ('Trooper #4878', 'https://tinyurl.com/4uyh2w97'),
            ('MiniPet #21', 'https://tinyurl.com/5yn8fdhp'),
            ('Afrodroids #475', 'https://tinyurl.com/4a4p427h'),
            ('Boohooverse Collection #469', 'https://tinyurl.com/57542k6v'),
            ('Lonely Heart #1615', 'https://tinyurl.com/yecjp7nc');  
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