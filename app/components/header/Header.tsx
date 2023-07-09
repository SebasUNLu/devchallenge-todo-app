import React from "react";

const Header = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="font-bold text-4xl leading-10">ToDo App</h1>
      <h3 className="font-medium text-lg leading-10 text-[#A9A9A9]">
        Created by{" "}
        <a
          href="https://www.linkedin.com/in/sebasti%C3%A1n-pedro-marchetti/"
          target="_blank"
          className="underline"
        >
          Sebastián Marchetti
        </a>{" "}
        - devChallenges.io
      </h3>
    </div>
  );
};

export default Header;
