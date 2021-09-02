const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('ERROR: Please provide the password to your MongoDB user as an argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://mongouser:${password}@cluster0.hjzra.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person
    .find({})
    .then(result => {
      /* result.forEach(person => {
        console.log(person)
      }) */
      console.log(result)
      mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
  const personData = {
    name: process.argv[3],
    number: process.argv[4]
  }

  const person = new Person(personData)
  person
    .save()
    .then(result => {
      console.log(`added ${personData.name} number ${personData.number} to phonebook`)
      mongoose.connection.close()
    })
} else {
  console.log(`Error: please provide the correct number of command line arguments: node mongo.js <password>
                or
                node mongo.js <password> <new name> <new number>`)
}
