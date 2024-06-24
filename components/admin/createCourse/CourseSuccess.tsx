import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseSuccess = ({ active, setActive }: Props) => {
  const prevButton = () => {
    if(active <=0)return;
    setActive(active - 1);
  };

  const handleOptions = () => {
    setActive(0);
  };

  return (
    <div className="flex flex-col items-center justify-center  text-white ">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-6">Success!</h1>
        <p className="text-center mb-6">
          You have successfully completed the course setup. What&lsquo;s next?
        </p>
        <div className="flex items-center justify-between w-full">
          <Button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded" onClick={prevButton}>
            Prev
          </Button>
          <Button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded" onClick={handleOptions}>
            Go Back to Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseSuccess;
