import React from "react";

type cardsProps = {
  title: string;
  list: string[];
};

const Cards = ({ title, list }: cardsProps) => {
  return (
    <>
      <h2 className="text-lg font-bold">{title}</h2>
      <ul className="space-y-4 text-sm">
        {list.map((items) => (
          <li>{items}</li>
        ))}
      </ul>
    </>
  );
};

export default Cards;
