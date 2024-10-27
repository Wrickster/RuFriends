import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
   return (
       <div>
            <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}></nav>
               <h1 style={{ color: 'rgb(204, 0, 51)' }}>Welcome to RU Friends</h1>
               <Link
               to="/register"
                   style={{ fontFamily: 'Arial, sans-serif', color: 'red', textDecoration: 'none', margin: '0 10px' }}
               >
          
               Register Here
               </Link>
       </div>
   );
};


export default Home;
