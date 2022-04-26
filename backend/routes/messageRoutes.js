import express from 'express'
const router = express.Router()
import {
  getMessagesByDogId,
  createMessage,
} from '../controllers/messageController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router
  .route('/:dogId')
  .get(protect, admin, getMessagesByDogId)
  .post(createMessage)

export default router
