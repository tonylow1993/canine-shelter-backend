import asyncHandler from 'express-async-handler'
import Message from '../models/messageModel.js'

// @desc    Fetch all messsage by dog id
// @route   GET /api/messages/:dogId
// @access  Private/Admin
const getMessagesByDogId = asyncHandler(async (req, res) => {
  messages = await Dog.find({ dog: req.params.dogId })
  
  res.json({ messages })
})

// @desc    Create a messsage
// @route   POST /api/messages/:dogId
// @access  Public
const createMessage = asyncHandler(async (req, res) => {
  console.log(req)

  const message = new Message({
    dog: req.params.dogId,
    ...req.body
  })

  const createMessage = await message.save()
  res.status(201).json(createMessage)
})

export {
  getMessagesByDogId,
  createMessage,
}
