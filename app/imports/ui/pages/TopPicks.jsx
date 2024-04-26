import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
import { ChatRightText, HandThumbsUp } from 'react-bootstrap-icons';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Restaurants } from '../../api/restaurants/Restaurants';
import '../../../client/top-picks.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const SpotlightOfTheWeek = ({ spotlight }) => {
  const navigate = useNavigate();
  const goToRestaurantList = () => {
    navigate('/restaurants-list');
  };

  return (
    <Row className="mb-4 spotlight-section">
      <Col md={4} className="mb-4 d-flex flex-column">
        <Card className="spotlight-card flex-grow-1">
          <Card.Header className="spotlight-header">Spotlight of The Week</Card.Header>
          <Card.Img variant="top" src={`/images/${spotlight.imageSrc}`} alt={spotlight.name} className="img-fluid spotlight-card-image" />
        </Card>
      </Col>
      <Col md={4} className="mb-4 d-flex flex-column">
        <Card className="spotlight-description-card flex-grow-1">
          <Card.Header className="spotlight-description-header">
            <h1>{spotlight.name}</h1>
          </Card.Header>
          <Card.Body>
            <p>{spotlight.description}</p>
          </Card.Body>
        </Card>
        <Image src="/images/foodtruckmap.jpg" alt="Food Truck Location Map" className="img-fluid mt-auto description-map-image" />
      </Col>
      <Col md={4} className="mb-4 d-flex flex-column">
        <div className="comments-section flex-grow-1">
          {spotlight.comments.map((comment, index) => (
            <Card key={index} className="comment-card mb-3 flex-grow-1">
              <Card.Body>
                <div className="instagram-style-comment">
                  <Image src={`/images/${comment.avatarSrc}`} alt={`${comment.reviewerName}'s avatar`} className="comment-avatar rounded-circle" />
                  <div className="comment-details">
                    <strong>{comment.reviewerName}</strong>
                    <div className="star-rating">{comment.rating}</div>
                    <span>{comment.reviewText}</span>
                    <div className="comment-interaction">
                      <Button variant="link" className="icon-button" style={{ color: 'var(--dark-green)' }} aria-label="Like">
                        <HandThumbsUp />
                      </Button>
                      <Button variant="link" className="icon-button" style={{ color: 'var(--dark-green)' }} aria-label="Comment">
                        <ChatRightText />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
          <Button variant="outline-primary" size="sm" className="mt-auto w-100">View more Comments</Button>
        </div>
        <Button variant="outline-secondary" size="sm" className="mt-auto w-100" onClick={goToRestaurantList}>
          View All of Our Vendors!
        </Button>
        <Image src="/images/soul.jpeg" alt="Food Truck Location Map" className="img-fluid mt-auto description-map-image" />
      </Col>
    </Row>
  );
};

SpotlightOfTheWeek.propTypes = {
  spotlight: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        reviewerName: PropTypes.string.isRequired,
        reviewText: PropTypes.string.isRequired,
        avatarSrc: PropTypes.string,
        rating: PropTypes.string,
        likes: PropTypes.number,
        comments: PropTypes.number,
      }),
    ).isRequired,
  }).isRequired,
};

const MergedItemCard = ({ order, review }) => {
  const navigate = useNavigate();

  // Updated the navigation path to match the App.jsx route configuration
  const viewStore = () => {
    navigate(`/restaurant-page/${order._id}`);  // Updated to use the correct route
  };

  return (
    <Col lg={4} className="mb-4">
      <Button variant="outline-tirtiary" size="sm" className="mt-auto w-100"> Todays Top Pick! </Button>
      <Card className="merged-item-card">
        <Card.Header className="text-center">{order.name}</Card.Header>
        <Image 
          src={`/images/${order.imageSrc}`} 
          alt={order.name} 
          className="img-fluid merge-card-img-top"
        />
        <Card.Body>
          <Card.Title>{order.name}</Card.Title>
          <div className="star-rating">{order.rating}</div>
          <Card.Text>{order.store}</Card.Text>
          <Card.Text>{order.orders}</Card.Text>
          <Card.Text>{order.hours}</Card.Text>
          <Button variant="primary" className="w-100" onClick={viewStore}>View Store</Button>
          <hr className="comment-divider" />
          <div className="instagram-style-comment">
            <Image 
              src={`/images/${review.avatarSrc}`} 
              alt={`${review.reviewerName}'s avatar`} 
              className="comment-avatar rounded-circle" 
            />
            <div className="comment-details">
              <strong>{review.reviewerName}</strong>
              <div className="star-rating">{review.rating}</div>
              <span>{review.reviewText}</span>
            </div>
          </div>
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
  review: PropTypes.shape({
    reviewerName: PropTypes.string.isRequired,
    avatarSrc: PropTypes.string.isRequired,
    reviewText: PropTypes.string.isRequired,
    rating: PropTypes.string,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
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
        comments: [
          { reviewerName: 'Joshuah D. Jones', reviewText: 'Best food truck in town!', rating: '★★★★★', avatarSrc: 'ME.jpeg', likes: 192, comments: 72 },
          { reviewerName: 'Joshuah D. Jones', reviewText: 'Best food truck in town!', rating: '★★★★★', avatarSrc: 'ME.jpeg', likes: 192, comments: 72 },
          { reviewerName: 'Joshuah D. Jones', reviewText: 'Best food truck in town!', rating: '★★★★★', avatarSrc: 'ME.jpeg', likes: 192, comments: 72 },
          { reviewerName: 'Joshuah D. Jones', reviewText: 'Best food truck in town!', rating: '★★★★★', avatarSrc: 'ME.jpeg', likes: 192, comments: 72 },
          { reviewerName: 'Joshuah D. Jones', reviewText: 'Best food truck in town!', rating: '★★★★★', avatarSrc: 'ME.jpeg', likes: 192, comments: 72 },
          // Additional comments
        ],
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
