const mongoose = require('mongoose');
const Review = require('./review.js');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        url: { type: String, default: "https://64.media.tumblr.com/444700b861e55177e41610ef0e828686/93cbb78b40c405c9-5d/s500x750/d5d11b24a2cb7d8564cf2351355dfd8174d873ba.jpg" },
        filename: { type: String, default: "listingimage" }
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

listingSchema.post('findOneAndDelete', async (listing) => {
    if (listing?.reviews.length) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;