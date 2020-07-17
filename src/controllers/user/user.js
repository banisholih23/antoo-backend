const getUserData = require("../../models/user/getUserData");
const getUserDataById = require("../../models/user/getUserDataById");
const deleteUser = require("../../models/auth/deleteUser");
const response = require("../../utils/response")

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const getUser = await getUserData();
      res.status(200).send(response(true, "List of All User", getUser))
    }
    catch (e) {
      res.status(500).send(response(false, e.message))
    }
  },
  getUserById: async (req, res) => {
    try {
      const { id } = req.params
      const getUser = await getUserDataById({ id: parseInt(id) });
      res.status(200).send(response(true, "User Id : " + id, getUser))
    } catch (e) {
      res.status(500).send(response(false, e.message))
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.params
    const userExist = await getUserDataById({ id: parseInt(id) })
    if (userExist) {
      try {
        const deleteUser = await deleteUser({ id: parseInt(id) })
        res.status(201).send(response(true, deleteUser));
      } catch (e) {
        res.status(500).send(response(false, e.message));
      }
    } else { res.status(404).send(response(false, userExist)) }
  }
}
