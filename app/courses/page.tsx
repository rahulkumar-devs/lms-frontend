import Header from "@/components/Header";
import Courses from "@/components/course/Courses";
import Heading from "@/utils/Heading";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading title="E Learning" description="" keywords="" />
      <Header />
      <Courses />
    </div>
  );
};

export default page;
