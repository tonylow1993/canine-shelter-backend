# 6003CEM Web API Development CW2

This project was created based on [ProShop](https://github.com/bradtraversy/proshop_mern).

## Features

• Charity workers can register, log in, then add, remove and update details of the dogs available at their centre. Hint: consider requiring a known 'sign up code' during registration to confirm that the user is an employee.
• The public can browse, search and filter the current list of dogs to help them find a suitable pet.
• Authentication and authorisation prevent the API being used by non-registered users, except to do safe GET requests on dog listings.
• All URI endpoints, HTTP verbs, and JSON data representations handled by the API are documented using the OpenAPI Specification (OAS) standard, version ≥2.0.
• API endpoint functionality is thoroughly tested via a mock HTTP request library called by an appropriate automated testing framework.
• Code and project documentation for both the front and back end components are provided.
• A video demonstrating the core functionality of the developed API/web application is provided.
2. (Important)
• The API allows charity workers to upload photos to be associated to each listing.
• Members of the public can sign up for a user account to let them create a list of 'favourites'.
• The public can use the app to send a direct message to the charity expressing interest in any dog on the site. The charity can respond to the message through the app and can delete any message sent or received.
3. (Useful)
• When a new dog listing is made 'live' the API automatically posts a tweet to the charity's
Twitter feed, with basic details of the new item.
• Members of the public can register their account using an external authentication service. For example, their Google credentials can be used to log in via Google's OAuth2-based sign in process.
4. (Nice to have)
• Since some shelter staff are not very good at identifying dog breeds, but a dog's breed is an important property of its listing, the dog listing and editing interface offers a 'breed selection helper'. This uses the famous 'Dogs as a Service' (DaaS) API to access dog images from the Stanford University Dogs Dataset: https://dog.ceo/dog-api/.
• Any other useful features that you come up with yourself.

## Usage

### ES Modules in Node

We use ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel if you would like

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = mongodb uri
JWT_SECRET = 'abc123'
SIGN_UP_CODE = 'abc123'
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

### Seed Database

You can use the following commands to seed the database with some sample users and dogs as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@example.com (Admin)
123456

john@example.com (Customer)
123456

jane@example.com (Customer)
123456
```


## License

The MIT License

Copyright (c) 2020 Traversy Media https://traversymedia.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
