import { useState } from "react";
import Logo from "./Logo";
import Search from "./Search";
import NumResults from "./NumResults";

export default function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
