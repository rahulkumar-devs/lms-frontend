"use client"

import React, { FC } from "react";

type ForgotPasswordProps = {
  switchComponent: (currentComponent: string) => void;
};

const ForgotPassword: FC<ForgotPasswordProps> = ({ switchComponent }) => {
  return <div>ForgotPassword</div>;
};

export default ForgotPassword;
