import './MainPage.css';
import Header from './Header';
import Navigation from './Navigation';
import MainArea from './MainArea';
import Footer from './Footer';
import React from "react";

function MainPage() {
  return (
    <div className="MainPage">
      <section id="page">
        <header><Header /></header>
        <main><MainArea /></main>
        <nav><Navigation /></nav>
        <footer><Footer /></footer>
      </section>
    </div>
  );
}

export default MainPage;
