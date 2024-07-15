import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import placeHolderImg from "@/assets/placeholder.svg"

type Props = {
  courseImage: string;
  courseTitle: string;
  courseDescription: string;
  courseId: string;
};

const CourseCard = ({
  courseImage,
  courseTitle,
  courseDescription,
  courseId,
}: Props) => {
  return (
    <Card className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
      <Link
        href={`/course/${courseId}`}
        className="absolute inset-0 z-10"
        prefetch={false}
      >
        <span className="sr-only">View course</span>
      </Link>
      <Image
        src={courseImage || placeHolderImg||""}
        alt="Course Image"
        width={300}
        height={200}
        className="object-cover w-full h-48"
      />
      <CardContent className="p-4 bg-background">
        <CardTitle className="text-xl font-bold truncate">{courseTitle || ""}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground truncate">
          {courseDescription || ""}
        </CardDescription>
        <Button size="sm" className="mt-4">
          <Link href={`/course/${courseId}`}>Enroll Now</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
