const { getNamespace } = require("continuation-local-storage");

// const { BASE_DB_URI, ADMIN_DB_NAME } = require("../config/env.json");

const BASE_DB_URI= "mongodb://localhost:27017";
const ADMIN_DB_NAME= "mt_admin";

const  initAdminDbConnection  = require("../DB/admin").initAdminDbConnection;

const  initTenantDbConnection  = require("../DB/tenant").initTenantDbConnection;

const tenantService = require("../service/tenant");
const adminService = require("../service/admin")

let connectionMap;
let adminDbConnection;

/**
 * Create knex instance for all the tenants defined in common database and store in a map.
 **/
const connectAllDb = async () => {
  let tenants,admins;
  const ADMIN_DB_URI = `${BASE_DB_URI}/${ADMIN_DB_NAME}`;
 
  try {
    adminDbConnection = initAdminDbConnection(ADMIN_DB_URI);
    tenants = await tenantService.getAllTenants(adminDbConnection);
    admins = await adminService.getAlladmins(adminDbConnection); 
    // console.log("connectAllDb tenants", tenants);
  } catch (e) {
    console.log("connectAllDb error", e);
    return;
  }

  connectionMap = tenants
    .map(tenant => {
      return {
        [tenant.name]: initTenantDbConnection(tenant.dbURI)
      };
    })
    .reduce((prev, next) => {
      return Object.assign({}, prev, next);
    }, {});

  console.log("connectAllDb connectionMap", "connectionMap");
};

/**
 * Get the connection information (knex instance) for the given tenant's slug.
 */
const getConnectionByTenant = tenantName => {
  console.log(`Getting connection for ${tenantName}`);
  if (connectionMap) {
    return connectionMap[tenantName];
  }
};

/**
 * Get the admin db connection.
 */
const getAdminConnection = () => {
  if (adminDbConnection) {
    console.log("Getting adminDbConnection");
    return adminDbConnection;
  }
};

/**
 * Get the connection information (knex instance) for current context. Here we have used a
 * getNamespace from 'continuation-local-storage'. This will let us get / set any
 * information and binds the information to current request context.
 */
const getConnection = () => {
  const nameSpace = getNamespace("unique context");
  const conn = nameSpace.get("connection");

  if (!conn) {
    throw new Error("Connection is not set for any tenant database");
  }

  return conn;
};

module.exports = {
  connectAllDb,
  getAdminConnection,
  getConnection,
  getConnectionByTenant
};
