const subscribingFunctions = [];
const store  = { lang:false };

// Don't set properties
// in store directly
// use store.setState()
store.setState = (changeObject) => {
    // Transfer changes to store object
    Object.assign(store, changeObject);
    // Notify all subscribers of changes
    for(let subscriber of subscribingFunctions){ 
        subscriber(changeObject, store);
    }
};

// A subscribing function should be ready to
// receive to arguments - the changes and the
// new state of store
store.subscribeToChanges = (func) => {
    // Add subscribing function
    subscribingFunctions.push(func);
}

store.unsubscribeToChanges = (func) => {
    // Find and remove subscribing function
    let index = subscribingFunctions.indexOf(func);
    if(index < 0){ return; }
    subscribingFunctions.splice(index, 1);
}




export default store;