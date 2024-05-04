import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
import { ChatRightText, HandThumbsUp } from 'react-bootstrap-icons';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Restaurants } from '../../api/restaurants/Restaurants';
import { Reviews } from '../../api/reviews/Reviews';
import '../../../client/top-picks.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Rating from '../components/Rating.jsx';

const SpotlightOfTheWeek = () => {
  const navigate = useNavigate();

  const goToRestaurantList = () => {
    navigate('/restaurants-list');
  };

  const { restaurant, isRestaurantReady } = useTracker(() => {
    const handler = Meteor.subscribe(Restaurants.userPublicationName);
    const restaurant = Restaurants.collection.findOne({ name: 'Soul Fusion' });
    return {
      restaurant,
      isRestaurantReady: handler.ready(),
    };
  }, []);

  const { reviews, isReviewsReady } = useTracker(() => {
    if (restaurant) {
      const reviewSub = Meteor.subscribe(Reviews.userPublicationName, { restaurantId: restaurant._id });
      const reviews = Reviews.collection.find(
        { restaurantId: restaurant._id },
        { sort: { createdAt: -1 }, limit: 5 },
      ).fetch();
      return {
        reviews,
        isReviewsReady: reviewSub.ready(),
      };
    }
    return { reviews: [], isReviewsReady: false };
  }, [restaurant]);

  const goToRestaurantPage = () => {
    if (restaurant) {
      navigate(`/restaurant-page/${restaurant._id}`);
    }
  };

  if (!isRestaurantReady) {
    return <div>Loading restaurant data...</div>;
  }

  return (
    <Row className="mb-4 spotlight-section">
      <Col md={4} className="mb-4 d-flex flex-column">
        <Card className="spotlight-card flex-grow-1">
          <Card.Header className="spotlight-header">Spotlight of The Week</Card.Header>
          <Card.Img variant="top" src="/images/Soul-fusion.jpg" alt="Soul Fusion" className="img-fluid spotlight-card-image" />
        </Card>
      </Col>
      <Col md={4} className="mb-4 d-flex flex-column">
        <Card className="spotlight-description-card flex-grow-1">
          <Card.Header className="spotlight-description-header">
            <h1>{restaurant.name}</h1>
          </Card.Header>
          <Card.Body>
            <p>{restaurant.description}</p>
          </Card.Body>
        </Card>
        <Image src="/images/foodtruckmap.jpg" alt="Food Truck Location Map" className="img-fluid mt-auto description-map-image" />
      </Col>
      <Col md={4} className="mb-4 d-flex flex-column">
        <div className="comments-section flex-grow-1">
          {isReviewsReady ? reviews.map((review, index) => (
            <Card key={index} className="comment-card mb-3 flex-grow-1">
              <Card.Body>
                <div className="instagram-style-comment">
                  <Image src={review.image || '/images/avatar.jpeg'} alt={`${review.firstName}'s avatar`} className="comment-avatar rounded-circle" />
                  <div className="comment-details">
                    <strong>{review.firstName}</strong>
                    <div className="star-rating">
                      <Rating value={parseFloat(review.rating)} max={5} />
                    </div>
                    <span>{review.comment}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )) : <p>Loading comments...</p>}
          <Button variant="outline-primary" size="sm" className="mt-auto w-100" onClick={goToRestaurantPage}>Leave a Comment!</Button>
        </div>
        <Image src="/images/soul.jpeg" alt="Food Truck Location Map" className="img-fluid mt-auto description-map-image" />
        <Button variant="outline-secondary" size="sm" className="mt-auto w-100" onClick={goToRestaurantList}>
          View All of Our Vendors!
        </Button>
      </Col>
    </Row>
  );
};

SpotlightOfTheWeek.propTypes = {
  spotlight: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

const MergedItemCard = ({ order }) => {
  const navigate = useNavigate();

  const viewStore = () => {
    navigate(`/restaurant-page/${order._id}`);
  };

  const { latestReview, ready } = useTracker(() => {
    const handler = Meteor.subscribe(Reviews.userPublicationName);
    const latestReview = Reviews.collection.findOne(
      { restaurantId: order._id },
      { sort: { createdAt: -1 } },
    );
    return {
      latestReview,
      ready: handler.ready(),
    };
  }, [order._id]);

  return (
    <Col lg={4} className="mb-4">
      <Card className="merged-item-card">
        <Card.Header className="text-center">{order.name}</Card.Header>
        <Image
          src={`/images/${order.imageSrc}`}
          alt={order.name}
          className="img-fluid merge-card-img-top"
        />
        <Card.Body>
          <Card.Title>{order.name}</Card.Title>
          <div className="star-rating">
            <Rating value={parseFloat(order.rating)} max={5} />
          </div>
          <Card.Text>{order.store}</Card.Text>
          <Card.Text>{order.address}</Card.Text>
          <Card.Text>{order.hours}</Card.Text>
          <Button variant="primary" className="w-100" onClick={viewStore}>
            View Store
          </Button>
          <hr className="comment-divider" />
          {ready && latestReview ? (
            <div className="instagram-style-comment">
              <Image
                src={`${latestReview.image}`}
                alt={`${latestReview.firstName}'s avatar`}
                className="comment-avatar rounded-circle"
              />
              <div className="comment-details">
                <strong>{latestReview.firstName}</strong>
                <div className="star-rating">
                  <Rating value={parseFloat(latestReview.rating)} max={5} />
                </div>
                <span>{latestReview.comment}</span>
              </div>
            </div>
          ) : (
            <p>No reviews yet.</p>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

MergedItemCard.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    store: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    orders: PropTypes.string.isRequired,
    hours: PropTypes.string.isRequired,
  }).isRequired,
};

const WhatsHot = () => {
  const { ready, restaurants } = useTracker(() => {
    const subscription = Meteor.subscribe(Restaurants.userPublicationName);
    let fetchedRestaurants = Restaurants.collection.find({}).fetch();
    for (let i = fetchedRestaurants.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = fetchedRestaurants[i];
      fetchedRestaurants[i] = fetchedRestaurants[j];
      fetchedRestaurants[j] = temp;
    }
    fetchedRestaurants = fetchedRestaurants.slice(0, 3);
    return {
      ready: subscription.ready(),
      restaurants: fetchedRestaurants,
    };
  }, []);

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <Container id="top-picks-page" fluid className="py-3">
      <SpotlightOfTheWeek spotlight={{
        name: 'Soul Fusion',
        imageSrc: 'Soul-fusion.jpg',
        description: 'Located near Legacy Path closest to the Dole Street crosswalk. Soul Fusion is a veteran owned and operated business that was ' +
          'started to bring together those who miss the taste of home. We offer southern rooted food with a fusion twist of the islands. As our motto ' +
          'says, “Follow your Soul, It Knows The Way.”',
      }}
      />
      <Row className="equal-height-cards">
        {restaurants.map((restaurant, index) => (
          <MergedItemCard key={index} order={restaurant} review={restaurant.latestReview || {}} />
        ))}
      </Row>
    </Container>
  );
};

export default WhatsHot;
