import express from 'express'
const router = express.Router()
import {
  getDogs,
  getDogById,
  deleteDog,
  createDog,
  updateDog,
} from '../controllers/dogController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getDogs).post(protect, admin, createDog)
router
  .route('/:id')
  .get(getDogById)
  .delete(protect, admin, deleteDog)
  .put(protect, admin, updateDog)

export default router
