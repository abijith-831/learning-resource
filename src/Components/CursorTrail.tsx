"use client";
interface TrailCircle extends HTMLDivElement {
  x: number;
  y: number;
}

import { useEffect } from "react";

const colors = Array(20).fill("#ffffff");

const CursorTrail = () => {
  useEffect(() => {
    const coords = { x: 0, y: 0 };
    const navbar = document.querySelector('.navbar');

    let isOverNavbar = false;

    const circles: TrailCircle[] = [];

    for (let i = 0; i < colors.length; i++) {
      const circle = document.createElement("div") as TrailCircle;
      circle.classList.add("circle");
      circle.style.backgroundColor = colors[i];
      document.body.appendChild(circle);

      circle.x = 0;
      circle.y = 0;

      circles.push(circle);
    }

    window.addEventListener("mousemove", (e) => {
      coords.x = e.clientX;
      coords.y = e.clientY;

      const target = e.target;
      isOverNavbar = !!(navbar && target instanceof Node && navbar.contains(target));
    });

    function animateCircles() {
      let x = coords.x;
      let y = coords.y;

      circles.forEach((circle, index) => {
        circle.style.left = `${x - 12}px`;
        circle.style.top = `${y - 12}px`;
        circle.style.scale = `${(circles.length - index) / circles.length}`;

        circle.x = x;
        circle.y = y;

        const color = isOverNavbar ? "#000000" : "#ffffff";
        circle.style.backgroundColor = color;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
      });

      requestAnimationFrame(animateCircles);
    }

    animateCircles();

    return () => {
      circles.forEach((circle) => document.body.removeChild(circle));
    };
  }, []);

  return null;
};

export default CursorTrail;
