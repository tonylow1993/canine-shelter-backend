import mongoose from 'mongoose'

const messageSchema = mongoose.Schema(
  {
    dog: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Dog',
    },
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Message = mongoose.model('Message', messageSchema)

export default Message
