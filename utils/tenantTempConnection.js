const knex = require('knex');


const getTempConnection =(tenantid)=>{
    
    const knexConfig = {
        client: process.env.DB_CLIENT,
        connection: {
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          database: `tenant${tenantid}_db`,
          password: 'Sahil@1211'
        },
        pool: {
          min: 2,
          max: 6,
          propagateCreateError: false 
        },
      };

    return knex(knexConfig);
};



module.exports = getTempConnection;
