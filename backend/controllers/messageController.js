import asyncHandler from 'express-async-handler'
import Message from '../models/messageModel.js'

// @desc    Fetch all messsage by dog id
// @route   GET /api/messages/:dogId
// @access  Private/Admin
const getMessagesByDogId = asyncHandler(async (req, res) => {
  const messages = await Message.find({ dog: req.params.dogId })
  
  res.json({ messages })
})

// @desc    Create a messsage
// @route   POST /api/messages/:dogId
// @access  Public
const createMessage = asyncHandler(async (req, res) => {
  const message = new Message({
    dog: req.params.dogId,
    ...req.body
  })

  const createMessage = await message.save()
  res.status(201).json({ message: createMessage })
})

// @desc    Delete a messsage
// @route   DELETE /api/messages/:messageId/:index
// @access  Public
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.messageId)

  if (req.params.index && req.params.index >= 0) {
    message.replies.splice(req.params.index, 1)
    const updatedMessage = await message.save()

    res.json({ message: updatedMessage })
  } else {
    if (message) {
      await message.remove()
      res.json({ messageId: req.params.messageId })
    } else {
      res.status(404)
      throw new Error('Message not found')
    }
  }
  
})

// @desc    Reply to a messsage
// @route   POST /api/messages/reply/:messageId
// @access  Public
const replyMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.messageId)

  if (message && req.body.reply) {
    message.replies.push(req.body.reply)
    const updatedMessage = await message.save()

    res.json({ message: updatedMessage })
  } else {
    res.status(404)
    throw new Error('Message not found')
  }
})

export {
  getMessagesByDogId,
  createMessage,
  deleteMessage,
  replyMessage,
}
