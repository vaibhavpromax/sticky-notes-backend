const db = require("../db/models");
const createLinkCode = require("../helpers/createLinkCode");
const redisHelper = require("../helpers/redis");
const logger = require("../utils/logger");
const { serverErrorResponse, successResponse } = require("../utils/response");

const User = db.User;
const Activity = db.Activity;
const Note = db.Note;
const makeUserAdmin = async (req, res) => {
  try {
    const { user_id } = req.params;
    const admin = await User.update(
      {
        is_admin: true,
      },
      {
        where: {
          user_id,
        },
      }
    );
    return successResponse(res, "user updated to admin", admin);
  } catch (error) {
    console.log(error);
    logger.error("error while updating user to admin");
    return serverErrorResponse(res, "error while updating user to admin");
  }
};
const viewActivity = async (req, res) => {
  try {
    const activity = await Activity.findAll({
      include: [
        {
          model: User,
        },
      ],
      sort: [["createdAt", "DESC"]],
    });
    return successResponse(res, "activity viewed", activity);
  } catch (error) {
    console.log(error);
    logger.error("error while viewing activity");
    return serverErrorResponse(res, "error while viewing activity");
  }
};
const generateInviteLink = async (req, res) => {
  try {
    const inviteCode = createLinkCode();
    const [setRefrralCode, setCodeError] = await redisHelper.setWithExpiry(
      inviteCode,
      inviteCode,
      10 * 60
    );
    if (setCodeError) {
      console.log(setCodeError);
      throw new Error("error while generating invite link code");
    }
    return successResponse(res, "invite link generated", inviteCode);
  } catch (error) {
    console.log(error);
    logger.error("error while generating invite link");
    return serverErrorResponse(res, "error while generating invite link");
  }
};

const fetchAllNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    return successResponse(res, "Notes fetched successfully", notes);
  } catch (error) {
    logger.error("Error while fetching notes");
    return serverErrorResponse(res, "error while fetching the notes");
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return successResponse(res, "Users fetched successfully", users);
  } catch (error) {
    logger.error("Error while fetching users");
    return serverErrorResponse(res, "error while fetching the users");
  }
};
const deleteAnyNote = async (req, res) => {
  try {
    const { note_id } = req.params;
    const note = await Note.destroy({
      where: {
        note_id,
      },
    });
    return successResponse(res, "Note deleted successfully");
  } catch (error) {
    logger.error("Error while deleting note");
    return serverErrorResponse(res, "error while deleting the note");
  }
};
const updateAnyNote = async (req, res) => {
  try {
    const { note_id } = req.params;
    const { title, content } = req.body;
    const note = await Note.update(
      {
        title,
        content,
      },
      {
        where: {
          note_id,
        },
      }
    );
    return successResponse(res, "Note updated successfully", note);
  } catch (error) {
    logger.error("Error while updating note");
    return serverErrorResponse(res, "error while updating the note");
  }
};

module.exports = {
  makeUserAdmin,
  viewActivity,
  generateInviteLink,
  fetchAllNotes,
  getAllUsers,
  deleteAnyNote,
  updateAnyNote,
};
