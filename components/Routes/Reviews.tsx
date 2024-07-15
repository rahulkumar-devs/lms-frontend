"use client";
import { useGetAllProtectedCoursesQuery } from "@/redux/course/courseApi";
import reviewImage from "@/assets/check_mark_with_review_stars-removebg-preview.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";

type Props = {};

const Reviews = (props: Props) => {
  const [reviewData, setReviewData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10; // Number of items per page

  const { data: fetchData, isLoading } = useGetAllProtectedCoursesQuery({
    page: currentPage,
    limit: limit,
  });

  useEffect(() => {
    if (fetchData?.data?.courseData) {
      const gatherData = fetchData.data.courseData.flatMap((item: any) => 
        item.reviews.map((rv: any) => ({
          comment: rv?.comment || "",
          rating: rv?.rating || 0,
          username: rv?.user?.name || "",
          userImage: rv?.user?.avatar || "",
        }))
      );
      setReviewData(gatherData);
    }
  }, [fetchData]);

  const totalPages = fetchData?.data?.totalPages || 1;

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="w-[90%] lg:w-[85%] mx-auto py-10">
      <div className="w-full lg:flex items-center">
        <div className="lg:w-[50%] w-full p-4">
          <Image src={reviewImage} alt="Reviews" width={750} height={750} />
        </div>
        <div className="lg:w-[50%] w-full p-4">
          <h3 className="text-2xl font-semibold mb-4">
            We are the
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Families
            </span>
            of E-learning
          </h3>
          <h4 className="text-xl font-medium mb-4">
            See What They Say About Us
          </h4>
          <p className="text-lg leading-relaxed text-gray-700">
            Our commitment to excellence has made us a favorite among learners.
            Here’s what our community has to say about their experiences:
          </p>
        </div>
      </div>
      <br />
      <br />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviewData &&
          reviewData.length > 0 &&
          reviewData.map((item: any, index: any) => {
            return (
              <ReviewCard
                key={index}
                imageUrl={item.userImage}
                name={item.username}
                description={item.comment}
                rating={item.rating}
              />
            );
          })}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Reviews;
