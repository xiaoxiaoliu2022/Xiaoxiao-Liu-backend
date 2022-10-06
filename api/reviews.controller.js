import ReviewsDAO from '../dao/reviewsDAO.js';//one or two dots
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

            const reviewResponse = await ReviewsDAO.addReviews(
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

    }
    static async apiDeleteReview(req, res, next) {

    }
}