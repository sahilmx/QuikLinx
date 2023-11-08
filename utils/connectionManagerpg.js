// const knex = require("knex");
// //const { getNamespace } = require("cls-hooked");

// const commonDBConnection = require("./commonDBConnection");
// const asyncLocalStorage = require("../middlewares/asyncLocalStorage");

// // Model.knex(knex);

// /**
//  * Create knex instance for all the tenants defined in common database and store in a map.
//  **/

// async function connectAllDb() {
//   console.log("inside connectAllDb");
//   let tenants;
//   try {
//     tenants = await commonDBConnection.select("*").from("tenants");
//     console.log(tenants);
//   } catch (e) {
//     console.log("error", e);

//     return;
//   }

//   connectionMap = tenants
//     .map((tenant) => {
//       return {
//         [tenant.slug]: knex(createConnectionConfig(tenant)),
//       };
//     })
//     .reduce((prev, next) => {
//       return Object.assign({}, prev, next);
//     }, {});
// }

// /**
//  *  Create configuration object for the given tenant.
//  **/
// function createConnectionConfig(tenant) {
//   //console.log(" inside createConnectionConfig");
//   console.log(tenant);

//   return {
//     client: process.env.DB_CLIENT,
//     connection: {
//       host: tenant.db_host,
//       port: tenant.db_port,
//       user: tenant.db_username,
//       database: tenant.db_name,
//       password: tenant.db_password,
//     },
//     pool: {
//       min: 2,
//       max: 20,
//     },
//   };
// }

// /**
//  * Get the connection information (knex instance) for the given tenant's slug.
//  */
// function getConnectionBySlug(slug) {
//   console.log("inside getConnectionBySlug");
//   //console.log(Object.keys(connectionMap));
//   if (connectionMap) {
//     console.log(`Getting connection for ${slug}`);
//     return connectionMap[slug];
//   }
// }

// /**
//  * Get the connection information (knex instance) for current context. Here we have used a
//  * getNamespace from 'continuation-local-storage'. This will let us get / set any
//  * information and binds the information to current request context.
//  */
// function getConnection(slug) {
//   console.log("inside getConnection", slug);

//   // const nameSpace = getNamespace('unique context');

//   //console.log("nameSpace: " , nameSpace);
//   let conn;
//   try {
//    // console.log(asyncLocalStorage.getStore());
//     conn = asyncLocalStorage.getStore().get("connection");
//   //  console.log({conn});
//     if (!conn) {
//      // connectionResolver.resolve;
//      // connectAllDb();
//       console.log(getConnectionBySlug(slug));
//       return getConnectionBySlug(slug);
//       throw "Connection is not set for any tenant database.";
//     }
//     console.log("Conn is there for the db ")
  
//     return conn;
//   } catch (error) {
//     console.log(error);
//     //connectAllDb();
//     //console.log(getConnectionBySlug(slug));
//     if(slug) return getConnectionBySlug(slug);
//     else throw "Connection is not set for any tenant database.";

//   }

//   //const conn = nameSpace.get('connection');
//   //console.log("tettt",conn);
  

// }

// module.exports = { getConnection, getConnectionBySlug, connectAllDb };
