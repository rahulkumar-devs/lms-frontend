"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import phone from "@/assets/phone-mockup.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { useGetHomeLayoutQuery } from "@/redux/layout/layoutApi";

const HeroSection = () => {
  // import banner Image

  const {
    data: fetchData,
    isLoading,
    isSuccess,
  } = useGetHomeLayoutQuery("Banner");

  console.log(fetchData?.data?.banner)



  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            {
            fetchData?.data?.banner.title

            }
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          {
            fetchData?.data?.banner.subtitle
          }
          </p>
          <Link href="#" passHref>
            <span className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
              Get started
              <AiOutlineArrowRight className="w-5 h-5 ml-2 -mr-1" />
            </span>
          </Link>
          <Link href="#" passHref>
            <span className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Speak to Advisor
            </span>
          </Link>

          <div className="flex items-center gap-1.5 py-5">
            <Input type="email" placeholder="Search Courses..." />
            <Button>
              <FaSearch />
            </Button>
          </div>

          <div className=" flex items-center gap-2.5">
            <div className="flex -space-x-4">
              <Image
                src={phone}
                alt="Profile Picture 1"
                objectFit="cover"
                className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              />
              <Image
                src={phone}
                alt="Profile Picture 1"
                objectFit="cover"
                className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              />
              <Image
                src={phone}
                alt="Profile Picture 1"
                objectFit="cover"
                className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
              />

              <Link href="#" passHref>
                <span className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800">
                  +99
                </span>
              </Link>
            </div>
            <p>
              <small>
                100K+ Poples already truested us
                <Link
                  href="/course"
                  className=" text-green-500 px-2.5 font-bold"
                >
                  View Courses
                </Link>
              </small>
            </p>
          </div>
        </div>
        {/* right */}
        <div className=" lg:mt-0 lg:col-span-5 lg:flex">
          <Image src={fetchData?.data?.banner.image||""} alt="mockup" width={600} height={400} className=" rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
