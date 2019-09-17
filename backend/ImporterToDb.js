importJsonDataToDb()
let chosenMockData = Math.random() < 0.5 ? './MOCK_DATA_A.json' : './MOCK_DATA_B.json';
let friendData = require(chosenMockData)
 async function importJsonDataToDb() {
  //Friend datan
  let Friend = require('./mongoose-models/Friend');
    let allFriendCount = await Friend.count();
    if(allFriendCount> 0){
      Friend.remove({});
        console.log('Tömer db');
        console.log(chosenMockData)
    }
    for(let data of friendData){
        let friend = new Friend(data);
        await friend.save();
    }
    allFriendCount = await Friend.count();
    process.exit();
  }