let RegisterSchema = new Schema(
  {
      mobilenum : { type: String, required: true },
      password : { type: String, required: true },
      name : { type: String, required: true },
      email : { type: String},
      create_date :  { type: Date, default: Date.now },
      status : req.query.status,
      active : { type: String, required: true }
  }, 
  { 
    versionKey: false
  }
);


//Exports the BookSchema for use elsewhere.
module.exports = mongoose.model('register', RegisterSchema);