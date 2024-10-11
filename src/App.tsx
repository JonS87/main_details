import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ServicesList from './components/ServicesList/ServicesList';
import ServiceDetails from './components/ServiceDetails/ServiceDetails';
import { Provider } from 'react-redux';
import store from './redux/store';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<ServicesList />} />
                    <Route path="/:id/details" element={<ServiceDetails />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
