import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to RuFriends</h1>
            <Link to="/register">Register Here</Link>
        </div>
    );
};

export default Home;
