importJsonDataToDb()
let chosenMockData = Math.random() < 0.5 ? './MOCK_DATA_A.json' : './MOCK_DATA_B.json';
let friendData = require(chosenMockData)
 async function importJsonDataToDb() {
  //Friend datan
  let Friend = require('./mongoose-models/Friend');
    let allFriendCount = await Friend.countDocuments();
    if(allFriendCount> 0){
      await Friend.remove({});
      let counter = await Friend.countDocuments();
        console.log('Tömer db', counter);
        console.log(chosenMockData)
    }
    for(let data of friendData){
        let friend = new Friend(data);
        await friend.save();
    }
    allFriendCount = await Friend.countDocuments();
    console.log('efter', allFriendCount);
  }
  