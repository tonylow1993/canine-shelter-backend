import asyncHandler from 'express-async-handler'
import Dog from '../models/dogModel.js'

// @desc    Fetch all dogs
// @route   GET /api/dogs
// @access  Public
const getDogs = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Dog.countDocuments({ ...keyword })
  const dogs = await Dog.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ dogs, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single dog
// @route   GET /api/dogs/:id
// @access  Public
const getDogById = asyncHandler(async (req, res) => {
  const dog = await Dog.findById(req.params.id)

  if (dog) {
    res.json(dog)
  } else {
    res.status(404)
    throw new Error('Dog not found')
  }
})

// @desc    Delete a dog
// @route   DELETE /api/dogs/:id
// @access  Private/Admin
const deleteDog = asyncHandler(async (req, res) => {
  const dog = await Dog.findById(req.params.id)

  if (dog) {
    await dog.remove()
    res.json({ message: 'Dog removed' })
  } else {
    res.status(404)
    throw new Error('Dog not found')
  }
})

// @desc    Create a dog
// @route   POST /api/dogs
// @access  Private/Admin
const createDog = asyncHandler(async (req, res) => {
  const dog = new Dog({
    name: 'Sample name',
    user: req.user._id,
    image: '/images/sample.jpg',
    breed: 'Sample breed',
    year: 0,
    location: 'Sample location',
  })

  const createdDog = await dog.save()
  res.status(201).json(createdDog)
})

// @desc    Update a dog
// @route   PUT /api/dogs/:id
// @access  Private/Admin
const updateDog = asyncHandler(async (req, res) => {
  const {
    name,
    location,
    image,
    breed,
    year,
  } = req.body

  const dog = await Dog.findById(req.params.id)

  if (dog) {
    dog.name = name
    dog.location = location
    dog.image = image
    dog.breed = breed
    dog.year = year

    const updatedDog = await dog.save()
    res.json(updatedDog)
  } else {
    res.status(404)
    throw new Error('Dog not found')
  }
})

export {
  getDogs,
  getDogById,
  deleteDog,
  createDog,
  updateDog,
}
