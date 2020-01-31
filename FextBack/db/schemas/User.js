const {Schema} = require('mongoose');

const UserSchema = new Schema({
    fbId: {
        type: Schema.Types.String
    }
});

module.exports = UserSchema;