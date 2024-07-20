/**
 * Author: Keyur Pradipbhai Khant
 * Banner ID: B00935171
 */
import React from 'react';

interface StatData {
  id: number;
  value: string;
  description: string;
}

const statsData: StatData[] = [
  { id: 1, value: '300+', description: 'Events Hosted' },
  { id: 2, value: '150k', description: 'Attendees' },
  { id: 3, value: '500+', description: 'Speakers Featured' },
  { id: 4, value: '80+', description: 'Countries Reached' },
];

const StatsBar: React.FC = () => {
  return (
    <section className="stats_box py-10 grid place-items-center lg:grid-cols-4 grid-cols-2 gap-4 sm:w-9/12 w-11/12 mx-auto -mt-8 px-4">
      {statsData.map((stat) => (
        <div key={stat.id}>
          <h1 className="md:text-[40px] text-[25px] font-bold">{stat.value}</h1>
          <p>{stat.description}</p>
        </div>
      ))}
    </section>
  );
};

export default StatsBar;
