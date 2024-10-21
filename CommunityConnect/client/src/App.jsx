import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import ApplicationViews from "./ApplicationViews";
import Authorize from './components/Authorize';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTop from './scroll/ScrollToTop';
import EventList from './components/Event/EventList';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userProfile = localStorage.getItem("userProfile");
        setIsLoggedIn(!!userProfile); // Set to true if userProfile exists
    }, []);

    return (
        <Router>
            <ScrollToTop />
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            {isLoggedIn ? <ApplicationViews isLoggedIn={isLoggedIn}/> : <Authorize setIsLoggedIn={setIsLoggedIn} />}
        </Router>
    );
}
// add isLoggedIn={isLoggedIn} in <ApplicationViews isLoggedIn={isLoggedIn}/> to only allow non logged in userto see events and event details
export default App;
