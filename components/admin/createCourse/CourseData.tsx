import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { IPrerequisites,IBenefit } from "./courseTypes";

type Props = {
  benefits: IBenefit[];
  setBenefits: (benefits: IBenefit[]) => void;
  prerequisites: IPrerequisites[];
  setPrerequisites: (prerequisites: IPrerequisites[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}: Props) => {
  const handleBenefitsChange = (index: number, value: string) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handleRemoveBenefit = (index: number) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(updatedBenefits);
  };

  const handlePrerequisitesChange = (index: number, value: string) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const handleRemovePrerequisite = (index: number) => {
    const updatedPrerequisites = prerequisites.filter((_, i) => i !== index);
    setPrerequisites(updatedPrerequisites);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" ||
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the field before going to next step");
    }
  };

  return (
    <div className="w-4/5 m-auto mt-24">
      <div className="mb-8">
        <Label htmlFor="benefits" className="block text-lg font-medium mb-2">
          What are the benefits for students in this course?
        </Label>
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center mb-2">
            <Input
              type="text"
              name="benefits"
              placeholder="e.g., You will be able to build a full stack LMS platform"
              value={benefit.title}
              onChange={(e) => handleBenefitsChange(index, e.target.value)}
              className="flex-grow"
              required
            />
            <IoIosRemoveCircle
              className="ml-2 text-red-500 cursor-pointer w-6 h-6"
              onClick={() => handleRemoveBenefit(index)}
            />
          </div>
        ))}
        <button
          onClick={handleAddBenefit}
          className="flex items-center text-blue-500 hover:text-blue-700 mt-2"
        >
          <IoIosAddCircle className="w-6 h-6 mr-1" />
          Add Benefit
        </button>
      </div>

      <div>
        <Label
          htmlFor="prerequisites"
          className="block text-lg font-medium mb-2"
        >
          What are the prerequisites for students in this course?
        </Label>
        {prerequisites.map((prerequisite, index) => (
          <div key={index} className="flex items-center mb-2">
            <Input
              type="text"
              name="prerequisites"
              placeholder="e.g., Basic knowledge of HTML and CSS"
              value={prerequisite.title}
              onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
              className="flex-grow"
              required

            />
            <IoIosRemoveCircle
              className="ml-2 text-red-500 cursor-pointer w-6 h-6"
              onClick={() => handleRemovePrerequisite(index)}
            />
          </div>
        ))}
        <button
          onClick={handleAddPrerequisite}
          className="flex items-center text-blue-500 hover:text-blue-700 mt-2"
        >
          <IoIosAddCircle className="w-6 h-6 mr-1" />
          Add Prerequisite
        </button>
      </div>
      <div className=" flex items-center justify-between w-full mt-5">
        <Button onClick={prevButton}>Prev</Button>
        <Button onClick={handleOptions}>Next</Button>
      </div>
    </div>
  );
};

export default CourseData;
