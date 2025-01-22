import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Docu from './components/docu';
import Signin from './components/Signin';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="/page2" element={<Docu />} />
            </Routes>
        </Router>
    );
};

export default App;
