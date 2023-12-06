const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/models");
const {
  serverErrorResponse,
  successResponse,
  badRequestResponse,
  notFoundResponse,
  unauthorizedResponse,
} = require("../utils/response");
const redisHelper = require("../helpers/redis");
const logger = require("../utils/logger");

//models
const User = db.User;
const Activity = db.Activity;
const register = async (req, res) => {
  const { username, password, inviteCode } = req.body;
  //check if invite code is valid or not
  if (inviteCode) {
    const [inviteCodeValue, inviteCodeError] = await redisHelper.getValue(
      inviteCode
    );
    if (!inviteCodeValue) {
      return badRequestResponse(res, "invalid invite code");
    }
    if (inviteCodeError) {
      return serverErrorResponse(res, "error while checking invite code");
    }
  }
  // check if user already exists
  User.findOne({
    where: {
      username: username,
    },
  })
    .then((dbUser) => {
      if (dbUser) {
        return serverErrorResponse(res, "Username already exists");
      } else if (username && password) {
        // password hash
        bcrypt.hash(password, 12, (err, passwordHash) => {
          if (err) {
            return serverErrorResponse(res, "error while hashing the password");
          } else if (passwordHash) {
            return User.create({
              username: username,
              password: passwordHash,
            })
              .then(async (us) => {
                const parsedUser = JSON.parse(JSON.stringify(us));
                const tokenPayload = {
                  username: parsedUser.username,
                  user_id: parsedUser.user_id,
                  is_admin: parsedUser.is_admin,
                };
                if (inviteCode) {
                  //invite code is valid
                  await redisHelper.removeValue(inviteCode);
                  await Activity.create({
                    activity_type: "joined_using_invite",
                    user_id: parsedUser.user_id,
                    invite_code: inviteCode,
                  });
                } else {
                  await Activity.create({
                    activity_type: "joined",
                    user_id: parsedUser.user_id,
                  });
                }

                logger.info("user created successfully");
                const token = jwt.sign(tokenPayload, "secret");
                return successResponse(res, "User created successfully", {
                  token: token,
                  user: tokenPayload,
                });
              })
              .catch((err) => {
                console.log(err);
                return serverErrorResponse(
                  res,
                  "error while creating the user"
                );
              });
          }
        });
      } else if (!password) {
        return badRequestResponse(res, "password not provided");
      } else if (!email) {
        return badRequestResponse(res, "email not provided");
      }
    })
    .catch((err) => {
      logger.error(err);
      return serverErrorResponse(res, "error while creating the user");
    });
};

const login = (req, res) => {
  const { username, password } = req.body;
  // checks if email exists
  User.findOne({
    where: {
      username: username,
    },
  })
    .then(async (dbUser) => {
      if (!dbUser) {
        return notFoundResponse(res, "user not found");
      } else {
        // password hash
        bcrypt.compare(password, dbUser.password, (err, compareRes) => {
          if (err) {
            // error while comparing
            return serverErrorResponse(
              res,
              "error while comparing the password"
            );
          } else if (compareRes) {
            const tokenPayload = {
              username: dbUser.username,
              is_admin: dbUser.is_admin,
              user_id: dbUser.user_id,
            };
            // password match
            const token = jwt.sign(tokenPayload, "secret");
            return successResponse(res, "User logged in successfully", {
              token: token,
              user: tokenPayload,
            });
          } else {
            // password doesnt match
            return unauthorizedResponse(res, "password doesnt match");
          }
        });
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};

module.exports = {
  register,
  login,
};
