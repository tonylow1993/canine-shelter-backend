//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

//Require the dev-dependencies
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../server.js'
import generateToken from '../utils/generateToken.js'
let should = chai.should()
let createdDogId = ''

chai.use(chaiHttp)

describe('Dog', () => {
  var authToken = 'Bearer ' + generateToken('626c126b54b57975a8b877c2') //admin user

  describe('/GET dogs', () => {
      it('it should GET all the dogs', (done) => {
        chai.request(server)
            .get('/api/dogs')
            .end((err, res) => {
              res.should.have.status(200)
              res.body.dogs.should.be.a('array')
              done()
            })
      })
  })

  describe('/GET dog by id', () => {
    it('it should GET dog by id', (done) => {
      chai.request(server)
          .get('/api/dogs/626c126b54b57975a8b877c6')
          .set('Authorization', authToken)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.name.should.to.equal('Fire')
            done()
          })
    })
  })

  describe('/POST dog', () => {
    it('it should create a dog', (done) => {
      chai.request(server)
          .post('/api/dogs')
          .set('Authorization', authToken)
          .end((err, res) => {
            res.should.have.status(201)
            res.body.should.be.a('object')
            res.body.name.should.to.equal('Sample name')
            createdDogId = res.body._id
            done()
          })
    })
  })

  describe('/PUT dog', () => {
    it('it should update a dog', (done) => {
      chai.request(server)
          .put(`/api/dogs/${createdDogId}`)
          .set('Authorization', authToken)
          .send({ name: '123', location: '123', year: '123', image: '/images/dog1.jpg', breed: '123' })
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.name.should.to.equal('123')
            createdDogId = res.body._id
            done()
          })
    })
  })

  describe('/DELETE dog', () => {
    it('it should delete a dog', (done) => {
      chai.request(server)
          .delete(`/api/dogs/${createdDogId}`)
          .set('Authorization', authToken)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.message.should.to.equal('Dog removed')
            done()
          })
    })
  })

})