//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

//Require the dev-dependencies
import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../server.js'
import generateToken from '../utils/generateToken.js'
let should = chai.should()
let createdUserId = ''

chai.use(chaiHttp)

describe('User', () => {
  var authToken = 'Bearer ' + generateToken('626c126b54b57975a8b877c2') //admin user
  
  describe('/GET users', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/users')
            .set('Authorization', authToken)
            .end((err, res) => {
              res.should.have.status(200)
              res.body.should.be.a('array')
              done()
            })
      })
  })

  describe('/GET user profile', () => {
    it('it should GET user profile', (done) => {
      chai.request(server)
          .get('/api/users/profile')
          .set('Authorization', authToken)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.name.should.to.equal('Admin User')
            done()
          })
    })
  })

  describe('/GET user by id', () => {
    it('it should GET user by id', (done) => {
      chai.request(server)
          .get('/api/users/626c126b54b57975a8b877c2')
          .set('Authorization', authToken)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.name.should.to.equal('Admin User')
            done()
          })
    })
  })

  describe('/POST user', () => {
    it('it should create a user', (done) => {
      chai.request(server)
          .post('/api/users')
          .set('Authorization', authToken)
          .send({ name: '123', email: '123', password: '123'})
          .end((err, res) => {
            res.should.have.status(201)
            res.body.should.be.a('object')
            res.body.name.should.to.equal('123')
            createdUserId = res.body._id
            done()
          })
    })

    it('it should add user favourite', (done) => {
      chai.request(server)
          .post('/api/users/626c126b54b57975a8b877c2/favourite/626c126b54b57975a8b877c6')
          .set('Authorization', authToken)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.favourites.should.to.include('626c126b54b57975a8b877c6')
            done()
          })
    })
  })

  describe('/PUT user', () => {
    it('it should update a user', (done) => {
      chai.request(server)
          .put(`/api/users/${createdUserId}`)
          .set('Authorization', authToken)
          .send({ name: '234', email: '234', password: '234', isAdmin: false})
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.name.should.to.equal('234')
            createdUserId = res.body._id
            done()
          })
    })
  })

  describe('/DELETE user', () => {
    it('it should delete a user', (done) => {
      chai.request(server)
          .delete(`/api/users/${createdUserId}`)
          .set('Authorization', authToken)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.message.should.to.equal('User removed')
            done()
          })
    })

    it('it should delete user favourite', (done) => {
      chai.request(server)
          .delete('/api/users/626c126b54b57975a8b877c2/favourite/626c126b54b57975a8b877c6')
          .set('Authorization', authToken)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.favourites.should.to.not.include('626c126b54b57975a8b877c6')
            done()
          })
    })
  })

})