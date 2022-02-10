import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import DetailsPage from '../pages/DetailsPage/DetailPage';
import HomePage from '../pages/HomePage/HomePage';
import StatsPage from '../pages/StatsPage/StatsPage';

const Router = () => {
    return (
        <Routes>
            <Route path="/movie/:id" element={<DetailsPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default Router;
