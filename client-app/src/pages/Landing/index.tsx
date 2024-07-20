/**
 * Author: Keyur Pradipbhai Khant
 * Banner ID: B00935171
 */
import React from 'react';
import Front from '../../components/Landing/Front';
import StatsBar from '../../components/Landing/StatsBar';
import Testimonials from '../../components/Landing/Testimonials';
import Procedure from '../../components/Landing/Procedure';
import TopUpcomingEvents from '../../components/Landing/UpcomingEvents';

const Landing: React.FC = () => {
    return (
        <main>
            <Front />
            <StatsBar />
            <TopUpcomingEvents />
            <Procedure />
            <Testimonials />
        </main>
    );
}

export default Landing;
