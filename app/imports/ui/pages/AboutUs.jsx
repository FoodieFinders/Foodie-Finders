import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import '../../../client/style.css'; // Import your custom stylesheet here

const AboutUs = () => {
  const navigate = useNavigate();

  // Function to navigate to the vendor dashboard
  const goToVendorDashboard = () => navigate('/vendor-dashboard');

  // Function to navigate to the leave review page
  const goToLeaveReview = () => navigate('/leave-review');

  const goToTopPicks = () => navigate('top-picks');

  return (
    <Container id="landing-page" fluid className="py-3">
      <Row className="justify-content-center">
        <div className="about-text">
          <h2>Discover Your Campus Cuisine with Foodie Finders!</h2>
          <p>Welcome to Foodie Finders, your ultimate culinary compass for navigating campus eats!</p>

          <h3>The Problem:</h3>
          <p>Caught in the labyrinth of campus dining options? From the bustling food trucks to the hidden gems like Manoa Gardens and Paradise Palms, the choices can be dizzying. Imagine this: you're craving some savory Chinese fare for lunch, but you're left wondering which spots on campus are dishing out your favorite menu items. Or maybe you're a devoted fan of the Campus Center's legendary fresh salmon fillet, only to discover it's a rare find on the menu. Talk about a dining dilemma!</p>

          <h3>The Solution:</h3>
          <p>Enter Foodie Finders – your culinary sidekick! With just a tap on your phone, you can conquer the campus dining scene with confidence. Say goodbye to food-related woes and hello to culinary convenience!</p>

          <h3>How It Works:</h3>
          <p>Foodie Finders simplifies your dining experience by providing real-time information on:</p>
          <ol>
            <li><strong>Specific Menu Items:</strong> Curious about today's culinary lineup at campus hotspots? We've got the scoop. Foodie Finders gives you the inside track on the mouthwatering dishes being served at campus center locations, food trucks, and more, all in one handy app.</li>
            <li><strong>Instant Availability:</strong> Craving a quick bite? With Foodie Finders, you can easily discover what's available to devour right now. No more wandering aimlessly – just pull up the app and let your cravings lead the way.</li>
            <li><strong>Your Favorite Finds:</strong> Love a particular style of cuisine? Never miss out on your favorite dishes again. Foodie Finders keeps you in the loop, notifying you exactly when your preferred food fares are on the menu.</li>
          </ol>

          <h3>Our Approach:</h3>
          <p>At Foodie Finders, we're passionate about enhancing your dining experience – one bite at a time. Our app is tailored to the discerning palate of the college foodie, offering a seamless way to explore, indulge, and relish the diverse culinary offerings of campus life.</p>
          <p>So whether you're on a quest for a delicious meal or hunting down that elusive campus delicacy, let Foodie Finders be your guide. Your taste buds will thank you!</p>
          <p>Join the Foodie Finders movement today and simplify your campus dining adventures. Let's embark on a culinary journey together!</p>
        </div>
      </Row>
    </Container>
  );
};

export default AboutUs;
