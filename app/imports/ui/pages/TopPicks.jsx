import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
import '../../../client/top-picks.css'; // Ensure this path is correct for your styles

const SpotlightOfTheWeek = ({ spotlight }) => (
  <Row className="mb-4 spotlight-section">
    <Col md={4} className="mb-3">
      <Card className="spotlight-card h-100">
        <Card.Header className="spotlight-header">Spotlight of The Week</Card.Header>
        <Card.Img variant="top" src={`/images/${spotlight.imageSrc}`} alt={spotlight.name} className="img-fluid" />
      </Card>
    </Col>
    <Col md={4} className="mb-3 d-flex flex-column">
      <Card className="spotlight-description-card mb-3 flex-grow-1">
        <Card.Header className="spotlight-description-header">
          <h1>{spotlight.name}</h1>
        </Card.Header>
        <Card.Body>
          <p>{spotlight.description}</p>
        </Card.Body>
      </Card>
      <div className="mt-auto">
        <img src="/images/foodtruckmap.jpg" alt="Food Truck Location Map" className="img-fluid" />
      </div>
    </Col>
    <Col md={4} className="mb-3">
      <div className="comments-section">
        {spotlight.comments.map((comment, index) => (
          <Card key={index} className="mb-3 comment-card">
            <Card.Body>
              <div className="d-flex align-items-center">
                <Image src={`/images/${comment.avatarSrc}`} alt={`${comment.author}'s avatar`} className="comment-avatar rounded-circle mr-2" />
                <div className="flex-grow-1">
                  <strong>{comment.author}</strong>
                  <p>{comment.text}</p>
                  <div className="comment-interaction mb-2">
                    <button className="icon-button emoji" aria-label="Like">👍</button>
                    <span className="likes">{comment.likes} Likes</span>
                    <button className="icon-button emoji" aria-label="Comment">💬</button>
                    <span className="comments-count">{comment.commentsCount} Comments</span>
                  </div>
                  <Button variant="outline-secondary" className="w-100">View More Replies</Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Col>
  </Row>
);

SpotlightOfTheWeek.propTypes = {
  spotlight: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        avatarSrc: PropTypes.string,
        likes: PropTypes.number,
        commentsCount: PropTypes.number,
      }),
    ).isRequired,
  }).isRequired,
};

const MergedItemCard = ({ order, review }) => (
  <Col lg={4} className="mb-4" >
    <Card className="merged-item-card">
      <Card.Header className="text-center">Top Order This Week</Card.Header>
      <Image src={`/images/${order.imageSrc}`} alt={order.name} className="img-fluid" />
      <Card.Body>
        <Card.Title>{order.name}</Card.Title>
        {/* Display the gold stars for the order rating */}
        <div className="star-rating">{order.rating}</div>
        <Card.Text>{order.store}</Card.Text>
        <Card.Text>{order.orders}</Card.Text>
        <Card.Text>{order.hours}</Card.Text>
        <Button variant="primary" className="w-100">Order Now</Button>
        <hr className="comment-divider" />
        <div className="instagram-style-comment">
          <Image src={`/images/${review.avatarSrc}`} alt={`${review.reviewerName}'s avatar`} className="comment-avatar rounded-circle" />
          <div className="comment-details">
            <strong>{review.reviewerName}</strong>
            <div className="star-rating">{review.rating}</div>
            <span>{review.reviewText}</span>
            <div className="comment-interaction">
              <button className="icon-button emoji" aria-label="Like">👍</button>
              <span className="likes">{review.likes} Likes</span>
              <button className="icon-button emoji" aria-label="Comment">💬</button>
              <span className="comments">{review.comments} Comments</span>
            </div>
            <Button variant="outline-primary" size="sm" className="mt-2">View more Comments</Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  </Col>
);

MergedItemCard.propTypes = {
  order: PropTypes.shape({
    name: PropTypes.string.isRequired,
    store: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    rating: PropTypes.string,
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

// WhatsHot component contains the entire feature set
const WhatsHot = () => {
  const spotlightData = {
    name: 'Soul Fusion',
    imageSrc: 'Soul-fusion.jpg',
    description: 'Located near Legacy Path closest to the Dole Street crosswalk. Soul Fusion is a veteran owned and operated business ' +
      'that was started to bring together those who miss the taste of home. We offer southern rooted food with a fusion ' +
      'twist of the islands. As our motto says, “Follow your Soul, It Knows The Way.”',
    comments: [
      { author: 'Joshuah D. Jones', text: 'Absolutely the best food truck in town!', avatarSrc: 'ME.jpeg', likes: 12, comments: 3 },
      { author: 'Joshuah D. Jones', text: 'Great service and even better food!', avatarSrc: 'ME.jpeg', likes: 12, comments: 3 },
    ],
  };

  const orderReviewData = [
    {
      order: {
        name: 'Caramel Frappuccino',
        store: 'Starbucks',
        rating: '★★★★★',
        hours: "Today's hours: 10:00AM - 2:00PM",
        imageSrc: 'Starbs.jpg',
        orders: '5028 orders this week',
      },
      review: {
        reviewerName: 'Joshuah D. Jones',
        reviewText: 'Absolutely loved the Caramel Frappuccino, perfect blend of coffee and sweetness!',
        rating: '★★★★★',
        avatarSrc: 'ME.jpeg',
        likes: 192,
        comments: 72,
      },
    },

    {
      order: {
        name: 'Caramel Frappuccino',
        rating: '★★★★★',
        store: 'Starbucks',
        hours: "Today's hours: 10:00AM - 2:00PM",
        imageSrc: 'Starbs.jpg',
        orders: '5028 orders this week',
      },
      review: {
        reviewerName: 'Joshuah D. Jones',
        reviewText: 'Absolutely loved the Caramel Frappuccino, perfect blend of coffee and sweetness!',
        rating: '★★★★★',
        avatarSrc: 'ME.jpeg',
        likes: 192,
        comments: 72,
      },
    },
    {
      order: {
        name: 'Caramel Frappuccino',
        rating: '★★★★★',
        store: 'Starbucks',
        hours: "Today's hours: 10:00AM - 2:00PM",
        imageSrc: 'Starbs.jpg',
        orders: '5028 orders this week',
      },
      review: {
        reviewerName: 'Joshuah D. Jones',
        reviewText: 'Absolutely loved the Caramel Frappuccino, perfect blend of coffee and sweetness!',
        rating: '★★★★★',
        avatarSrc: 'ME.jpeg',
        likes: 192,
        comments: 72,
      },
    },

  ];

  return (
    <Container fluid className="py-3">
      <SpotlightOfTheWeek spotlight={spotlightData} />
      <Row>
        {orderReviewData.map((data, index) => (
          <MergedItemCard key={index} order={data.order} review={data.review} />
        ))}
      </Row>
    </Container>
  );
};

export default WhatsHot;
