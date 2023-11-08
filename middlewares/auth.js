const jwt = require('jsonwebtoken');
const Cookies = require('cookies');
const utils = require('../helper/utils');
//const users_repo = require('../model_repos/users_repo');
const logger = require('../helper/logger');
var LocalStorage = require('node-localstorage').LocalStorage,
 localStorage = new LocalStorage('./rdPackage.json');


const getAccessToken = (req, res) => {
  const auth_token = req.headers.authorization;
  const refresh_access_token = req.body.refresh_access_token;
 
  let tokens = {};

  if (auth_token) {
    tokens = { ...tokens, access_token: auth_token.split(' ')[1] };
    if (refresh_access_token) {
      tokens = { ...tokens, refresh_access_token }
    }
    
    return tokens;
  }
  
  if (req.cookies) {
    return {
      access_token: new Cookies(req, res).get('access_token'),
      refresh_access_token
    };
  }
}

const verifyJWTToken = (token, secret_key) => {
  return new Promise((res) => {
    jwt.verify(token, secret_key, async (error, payload) => {
      if (error) {
        logger.error(error);
        return res({ success: false });
      } else {
        return res({ success: true, payload })
      }
    })
  })
}

const reIssueAccessToken = async (refresh_access_token) => {
  
  try {
    
    const { success, payload } = await verifyJWTToken(refresh_access_token,
      JSON.parse(localStorage.getItem('otherKeys')).REFRESH_ACCESS_TOKEN_IDRSA);
    
    if (success && payload.user_id) {
      return {
        new_access_token: utils.getToken({ ...payload },
          JSON.parse(localStorage.getItem('otherKeys')).ACCESS_TOKEN_IDRSA, 'access_token'),
        new_refresh_access_token: utils.getToken({ ...payload },
          JSON.parse(localStorage.getItem('otherKeys')).REFRESH_ACCESS_TOKEN_IDRSA),
        user_id: payload.user_id,
        success: true
      }
    }
    
    return { success: false }
  } catch (error) {
    throw error;
  }

}

module.exports = {
  tokenValidate: async (req, res, next) => {
    const { access_token, refresh_access_token } = getAccessToken(req, res);

    if (access_token) {
      try {
        
        const { success, payload } = await verifyJWTToken(access_token,
          JSON.parse(localStorage.getItem('otherKeys')).ACCESS_TOKEN_IDRSA);
  
        if (!success) {
          if (!refresh_access_token) {
          
            return res.send({ not_verified: true, error_message: 'invalid_access_token' });
          }
          
          const { new_access_token, new_refresh_access_token, success, user_id } =
            await reIssueAccessToken(refresh_access_token);

          if (new_access_token && new_refresh_access_token && success && user_id) {
            await users_repo.update({ access_token: new_access_token }, { id: user_id });
            return res.send({
              access_token: new_access_token,
              refresh_access_token: new_refresh_access_token
            })
          }
          
          return res.send({ not_verified: true, error_message: 'new_access_token_creation_error' });
        }
        
        req.token_data = {
          ...payload
        };
         next();

      } catch (error) {
        throw error;
      }
    } else {
      return res.send({ not_verified: true, error_message: 'token_absent' });
    }
  },

//   mobileApkTokenValidate: async (req, res, next) => {
//     const { access_token, refresh_access_token } = getAccessToken(req, res);

//     if (access_token) {
//       try {
        
//         const { success, payload } = await verifyJWTToken(access_token,
//           JSON.parse(localStorage.getItem('otherKeys')).ACCESS_TOKEN_IDRSA);
  
//         if (!success) {
//           if (!refresh_access_token) {
          
//             return res.send({ not_verified: true, error_message: 'invalid_access_token' });
//           }
          
//           const { new_access_token, new_refresh_access_token, success, user_id } =
//             await reIssueAccessToken(refresh_access_token);

//           if (new_access_token && new_refresh_access_token && success && user_id) {
//             await mobile_user_repo.update({ access_token: new_access_token }, { id: user_id });   /// add the user repo for the new mobile_user_repo 
//             return res.send({
//               access_token: new_access_token,
//               refresh_access_token: new_refresh_access_token
//             })
//           }
          
//           return res.send({ not_verified: true, error_message: 'new_access_token_creation_error' });
//         }
        

//         req.token_data = {
//           ...payload
//         };
//          next();

//       } catch (error) {
//         throw error;
//       }
//     } else {
//       return res.send({ not_verified: true, error_message: 'token_absent' });
//     }
//   },


  adminTokenValidate: async (req, res, next) => {
    const { access_token } = getAccessToken(req, res);

    if (access_token) {
      try {
        
        const { success, payload } = await verifyJWTToken(access_token,
          process.env.ACCESS_TOKEN_IDRSA);

        if (!success || !payload || !payload.is_admin) {
          return res.send({
            not_verified: true,
            message: 'Session expired. Please logout and login once again or not an authorized' +
              'admin',
            is_admin: false
          });
        } else {
          req.token_data = {
            ...payload
          };
          next();
        }
        
      } catch (err) {
        throw err;
      }
    } else {
      return res.send({ not_verified: true, error_message: 'token_absent' });
    }
  }

}