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
            reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews');
        } catch (e) {
            console.error(`Unable to establish connection handle in reviewDA: ${e}`);

        }
    }
    static async addReview(movieId, user, review, date) {
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
    static async updateReview(reviewId, userId, review, date) {
        try {
            const filter = {
                user_id: userId,
                _id: ObjectId(reviewId),

            }
            const update = {
                review: review,
                date: date
            }
            return await reviews.updateOne(filter, { $set: update })
        }
        catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e };
        }
    }

    static async deleteReview(reviewId, userId) {
        try {
            const filter = {
                user_id: userId,
                _id: new ObjectId(reviewId),
            }
            return await reviews.deleteOne(filter)
        } catch (e) {
            console.error(`Unable to delete the review: ${e}`)
            return { error: e }
        }
    }
}