import React from "react";

const NewsInsight = ({ title, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="block mt-3 text-yellow-300 text-sm underline"
  >
    📰 {title}
  </a>
);

export default NewsInsight;