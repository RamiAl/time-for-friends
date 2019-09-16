importJsonDataToDb()
let friendData = require('./MOCK_DATA.json')
 async function importJsonDataToDb() {
  //Friend datan
  let Friend = require('./mongoose-models/Friend');
    let allFriendCount = await Friend.count();
    if(allFriendCount> 0){
      Friend.remove({});
        console.log('Tömer db'); 
    }
    for(let data of friendData){
        let friend = new Friend(data);
        await friend.save();
        console.log(friend);
    }
    allFriendCount = await Friend.count();
    process.exit();
  }