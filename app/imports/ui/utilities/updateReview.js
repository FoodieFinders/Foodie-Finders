import { Restaurants } from '../../api/restaurants/Restaurants';
import { Reviews } from '../../api/reviews/Reviews'

export const updateReview = (rating, restaurantId) => {
        const rev = Reviews.collection.find().fetch();
        console.log(rev);
        const restaurantRatings = rev.filter(review => review.restaurantId === restaurantId);
        console.log(restaurantRatings);
        const ratingArr = restaurantRatings.map(restaurant => restaurant.rating);
        const sumRatings = ratingArr.reduce((partialSum, a) => partialSum + a, rating);
        const averageRating = sumRatings / (restaurantRatings.length + 1);

        Restaurants.collection.update(
            {"_id": restaurantId},
            {$set: {"rating": averageRating}}
        );
    };


