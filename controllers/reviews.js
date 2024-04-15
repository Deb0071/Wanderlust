const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


module.exports.createReview=async (req, res) => {
    let reviewid = req.params.id;
    let listing = await Listing.findById(reviewid);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created");
 
    res.redirect(`/listings/${reviewid}`);
};

module.exports.destroyReview=async (req, res) => {
    let { id, reviewId } = req.params;
     await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
     await Review.findByIdAndDelete(reviewId);
     req.flash("error","Review Deleted");
     res.redirect(`/listings/${id}`);
};