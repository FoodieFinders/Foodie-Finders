import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import '../../api/methods/restaurants';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import LoadingSpinner from '../components/LoadingSpinner';
import LeaveReview from '../pages/LeaveReview';
import RestaurantPage from '../pages/RestaurantPage';
import FilterMockup from '../pages/FilterMockup';
import TopPicks from '../pages/TopPicks';
import AboutUs from '../pages/AboutUs';
import UserPage from '../pages/UserPage';
import EditUserPage from '../pages/EditUserPage';
import Home from '../pages/Home';
import AddRestaurant from '../pages/AddRestaurant';
import EditRestaurantPage from '../pages/EditRestaurantPage';
import RestaurantList from '../pages/RestaurantList';

/* eslint-disable */
/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/user" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
          <Route path="/add-restaurant" element={<ProtectedRoute><AddRestaurant /></ProtectedRoute>} />
          <Route path="/edituser/:_id" element={<ProtectedRoute><EditUserPage /></ProtectedRoute>} />
          <Route path="/editrestaurant/:_id" element={<ProtectedRoute><EditRestaurantPage /></ProtectedRoute>} />
          <Route path="/restaurants-list" element={<RestaurantList />} />
          <Route path="/restaurant-page/:_id" element={<RestaurantPage />} />
          <Route path="/leave-review/:_id" element={<ProtectedRoute><LeaveReview /></ProtectedRoute>} />
          <Route path="/filter-mockup" element={<FilterMockup />} />
          <Route path="/top-picks" element={<TopPicks />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
