// import mongodb, { ObjectId } from "mongodb";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return;
        }
        try {
            reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collect('reviews');
        } catch (e) {
            console.error(`Unable to establish connection handle in reviewDA: ${e}`);

        }
    }
    static async addReviews(movieId, user, review, data) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                review: review,
                movie_id: ObjectId(movieId)
            }
            return await reviews.insertOne(reviewDoc);

        }
        catch (e) {
            console.error(`Unable to post review:${e}`)
            return { error: e };

        }

    }
    static async updateReview(reviewId, userId, review, data) {

    }
    static async deleteReview(reviewId, userId) {

    }
}