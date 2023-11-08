// // const { createNamespace } = require("continuation-local-storage");

// const { getConnectionBySlug } = require("../utils/connectionManager");
// const asyncLocalStorage = require("./asyncLocalStorage");

// // Create a namespace for the application.
// //let nameSpace = createNamespace("unique context");


// /**
//  * Get the connection instance for the given tenant's slug and set it to the current context.
//  */
// function resolve(req, res, next) {

//   console.log("inside cr resolve");
//   const slug = req.headers.slug;
//   //console.log("thisisslug",slug);

//   if (!slug) {
//     res.json({ message: `Please provide tenant's slug to connect.` });
//     return;
//   }

//   // Run the application in the defined namespace. It will contextualize every underlying function calls.
//   asyncLocalStorage.run(new Map(), () => {
//     if (getConnectionBySlug(slug) != null) {
//       console.log("Connection is there for "+slug)
//     //  nameSpace.set("connection", getConnectionBySlug(slug));
//       asyncLocalStorage.getStore().set("connection", getConnectionBySlug(slug));
//       next();
//     } else {
//       console.log("Connection is not there for "+slug)
//       res.json({ body: "User Not found Please Contact Admnin" });
//     }
//     //console.log(asyncLocalStorage.getStore().get("connection"));

//   });

//   // nameSpace.run(() => {
//   //   if (getConnectionBySlug(slug) != null) {
//   //     console.log("Connection is there for "+slug)
//   //     nameSpace.set("connection", getConnectionBySlug(slug));
    
//   //     next();
//   //   } else {
//   //     console.log("Connection is not there for "+slug)
//   //     res.json({ body: "User Not found Please Contact Admnin" });
//   //   }
//   // });
// }
// module.exports = { resolve };
