const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true ,ref:'User'},
  place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Place' },
  checkin: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  name: { type: String, required: true },
  phoneno: { type: String, required: true },
  price: Number,
  noofguest: Number,
});

const BookingModel = mongoose.model("Booking", bookingSchema)

module.exports = BookingModel

