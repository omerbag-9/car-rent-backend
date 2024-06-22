// import modules
import { MongoClient } from "mongodb";

// create connection
let url = 'mongodb+srv://omerbag:OmerMustafa&1635740@cluster0.z5gp01l.mongodb.net/'
const client = new MongoClient(url)
// check connection
 const connectDB = ()=>{
    return client.connect().then(()=>{
        console.log('db connected successfully');
    }).catch((err)=>{
        console.log('failed to connect to db');
    })
}

// create db
const db = client.db('carRental')
// export
export{
    connectDB,db
}
