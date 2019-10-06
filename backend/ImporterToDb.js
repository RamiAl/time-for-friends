importJsonDataToDb()
let mockData = './MOCK_DATA.json';
let friendData = require(mockData);
moreEmailAddressesPerPerson();
morePhoneNumbersPerPerson();
async function importJsonDataToDb() {
//Friend datan
let Friend = require('./mongoose-models/Friend');
  let allFriendCount = await Friend.countDocuments();
  if(allFriendCount> 0){
    await Friend.remove({});
    let counter = await Friend.countDocuments();
      console.log('Tömer db', counter);
      console.log(mockData)
  }
  for(let data of friendData){
      let friend = new Friend(data);
      await friend.save();
  }
  allFriendCount = await Friend.countDocuments();
  console.log('efter', allFriendCount);
}

function morePhoneNumbersPerPerson(){
  let domains = friendData.map(x => x.phoneNumber.split()[0]);
  for(let friend of friendData){
    friend.phoneNumbers = [friend.phoneNumber];
    delete friend.phoneNumber;
    let randomExtra = Math.floor(Math.random()*4);
    for(let i = 0; i < randomExtra; i++){
      let randomDomain = domains[Math.floor(domains.length * Math.random())];
      friend.phoneNumbers.push(randomDomain);
    }
  }
}


function moreEmailAddressesPerPerson(){
  let domains = friendData.map(x => x.emailAddress.split('@')[1]);
  for(let friend of friendData){
    friend.emailAddresses = [friend.emailAddress];
    let firstPart = friend.emailAddress.split('@')[0];
    delete friend.emailAddress;
    let randomExtra = Math.floor(Math.random()*4);
    for(let i = 0; i < randomExtra; i++){
      let randomDomain = domains[Math.floor(domains.length * Math.random())];
      friend.emailAddresses.push(firstPart + '@' + randomDomain);
    }

  }
}