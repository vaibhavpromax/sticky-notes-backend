const db = require("../db/models");
const { serverErrorResponse, successResponse } = require("../utils/response");
const logger = require("../utils/logger");
const Note = db.Note;
const Activity = db.Activity;

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { user_id } = req.user;

    const newNote = await Note.create({
      title,
      content,
      user_id,
    });
    const parsedNote = JSON.parse(JSON.stringify(newNote));
    const newActivity = await Activity.create({
      user_id,
      note_id: parsedNote.note_id,
      activity: "create",
    });
    return successResponse(res, "Note created successfully", newNote);
  } catch (error) {
    logger.error("Error while creating note for user");
    return serverErrorResponse(res, "error while creating the note");
  }
};

const deleteNote = async (req, res) => {
  try {
    const { note_id } = req.params;
    const { user_id } = req.user;
    const deleteNote = await Note.destroy({
      where: {
        note_id,
      },
    });
    const addActivity = await Activity.create({
      user_id,
      note_id,
      activity: "delete",
    });
    return successResponse(res, "Note deleted successfully");
  } catch (error) {
    console.log(error);
    logger.error("Error while deleting note for user");
    return serverErrorResponse(res, "error while deleting the note");
  }
};
const updateNote = async (req, res) => {
  try {
    const { note_id } = req.params;
    const { user_id } = req.user;
    const { title, content, is_public } = req.body;
    const updateNote = await Note.update(
      {
        title,
        content,
        is_public,
      },
      {
        where: {
          note_id,
        },
      }
    );
    let activity = "update";
    if (is_public) {
      activity = "made_public";
    } else if (!is_public) {
      activity = "made_private";
    }

    const addActivity = await Activity.create({
      user_id,
      note_id,
      activity,
    });

    return successResponse(res, "Note updated successfully");
  } catch (error) {
    console.log(error);
    logger.error("Error while updating note for user");
    return serverErrorResponse(res, "error while updating the note");
  }
};

const fetchNotesOfUser = async (req, res) => {
  try {
    const { user_id } = req.user;
    //get the notes of the user and only 10 notes that have is_public as true
    const notes = await Note.findAll({
      where: {
        user_id,
      },
      include: [
        {
          model: db.User,
        },
      ],
    });

    return successResponse(res, "Notes fetched successfully", notes);
  } catch (error) {
    logger.error("Error while fetching notes of a user");
    return serverErrorResponse(res, "error while fetching the notes of a user");
  }
};

const fetchPublicNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: {
        is_public: true,
      },
      limit: 10,
      include: [
        {
          model: db.User,
        },
      ],
    });
    return successResponse(res, "Public Notes fetched successfully", notes);
  } catch (error) {
    logger.error("Error while fetching public notes");
    return serverErrorResponse(res, "error while fetching the public notes");
  }
};

module.exports = {
  createNote,
  deleteNote,
  updateNote,
  fetchNotesOfUser,
  fetchPublicNotes,
};
