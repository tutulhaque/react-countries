"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full text-center py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white mt-8">
      <p className="text-sm">
        © {new Date().getFullYear()} All rights reserved. Built with ❤️ by Saif.
      </p>
    </footer>
  );
};

export default Footer;
