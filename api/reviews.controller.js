import ReviewsDAO from '../dao/reviewsDAO.js';
export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const movieId = req.body.movie_id;
            const review = req.body.review;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date();

            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                userInfo,
                review,
                date
            );
            var { error } = reviewResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to post review." });
            } else {
                res.json({ status: "success" });
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
        }

    }
    static async apiUpdateReview(req, res, next) {
        try {
            const userId = req.body.user_id;
            const reviewId = req.body.review_id;
            const review = req.body.review;
            const date = new Date();
            const updateReview = await ReviewsDAO.updateReview(
                reviewId,
                userId,
                review,
                date

            );

            var { error } = updateReview;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to update review." });
            } else if (updateReview.modifiedCount <= 0) {
                res.json({ error: "Can't find a match review to update" });

            } else if (updateReview.modifiedCount > 1) {
                res.json({ error: "More than one match review are found" });
            } else {
                res.json({ status: "success" });
            }

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const userId = req.body.user_id;
            const reviewId = req.body.review_id;
            const review = req.body.review;
            const date = new Date();
            const deleteReview = await ReviewsDAO.deleteReview(
                reviewId,
                userId,
                review,
                date

            );

            var { error } = deleteReview;

            if (error) {
                res.status(500).json({ error: "Unable to delete review." });
            } else if (deleteReview.deletedCount <= 0) {
                res.json({ error: "Can't match review to delete" });

            } else if (deleteReview.deletedCount > 1){
                res.json({ error: "More than one match review are found." });
            }else {
                res.json({ status: "success" });
            }

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}