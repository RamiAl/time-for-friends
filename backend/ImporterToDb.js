importJsonDataToDb()
let personData = require('./MOCK_DATAName.json')
 async function importJsonDataToDb() {
  //Person datan
  let Person = require('./Personer');
    let allPersonCount = await Person.count();
    if(allPersonCount> 0){
        Person.remove({});
        console.log('Tömer db'); 
    }
    for(let data of personData){
        let person = new Person(data);
        await person.save();
        console.log(person);
    }
    allPersonCount = await Person.count();
    process.exit();
  }