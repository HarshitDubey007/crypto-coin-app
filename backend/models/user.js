const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    user_id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hash_password: { type: String, required: true },
    role: { type: String, default: 'user'},
    mobile_number: { type: Number, default: '' },
    parent_ref_code: { type: String}
  },
  { timestamps: true, collection: "user" }
);

userSchema.virtual('password')
  .set(function (password) {
    this.hash_password = bcrypt.hashSync(password, 10)
  })

userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};

userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  },
};

userSchema.virtual('fullName')
  .get(function () {
    return `${this.firstName} ${this.lastName}`
  })

module.exports = mongoose.model("User", userSchema);
