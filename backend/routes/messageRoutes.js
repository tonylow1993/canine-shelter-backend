import express from 'express'
const router = express.Router()
import {
  getMessagesByDogId,
  createMessage,
  deleteMessage,
  replyMessage,
} from '../controllers/messageController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router
  .route('/:dogId')
  .get(getMessagesByDogId)
  .post(createMessage)
router
  .route('/reply/:messageId')
  .post(protect, admin, replyMessage)
router
  .route('/:messageId/:index')
  .delete(protect, admin, deleteMessage)

export default router
