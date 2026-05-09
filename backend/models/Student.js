const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    cms_id:{
        type:Number,
        unique:true
    },
    room_no:{
        type:Number,
    },
    batch:{
        type:Number,
    },
    dept:{
        type:String
    },
    course:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    father_name:{
        type:String
    },
    contact:{
        type:String
    },
    address:{
        type:String
    },
    dob:{
        type:Date
    },
    cnic:{
        type:String,
        unique:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    hostel:{
        type:Schema.Types.ObjectId,
        ref:'hostel'
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = Student = mongoose.model('student',StudentSchema);