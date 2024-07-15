import React from 'react';

type Props = {
  rating: number;
};

const Rating = ({ rating }: Props) => {
  const totalStars = 5; // Total number of stars to display

  return (
    <div className="flex items-center">
      {Array.from({ length: totalStars }, (_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${index < rating ? 'text-yellow-500' : 'text-gray-400'} `}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927C9.218 2.593 9.576 2.5 9.923 2.5c.348 0 .706.093.876.427l1.907 3.852 4.254.618c.386.056.705.326.787.708.082.381-.056.782-.362.99l-3.077 3.002.727 4.242c.065.378-.092.76-.4.973-.306.214-.725.242-1.065.074l-3.812-2.002-3.812 2.002c-.34.169-.759.14-1.065-.074-.308-.213-.465-.595-.4-.973l.727-4.242L2.672 8.595c-.306-.208-.444-.609-.362-.99.082-.382.401-.652.787-.708l4.254-.618 1.907-3.852z" />
        </svg>
      ))}
    </div>
  );
};

export default Rating;
