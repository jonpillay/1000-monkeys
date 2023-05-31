const Message = require("../models/message");

const MessagesController = {
  Index: (req, res) => {
    Message.find(async (err, messages) => {
      if (err) {
        throw err;
      }
      res.status(200).json({ messages: messages});
    });
  },
};

module.exports = MessagesController;
