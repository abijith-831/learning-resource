"use client";
import { useEffect } from "react";

const colors = Array(20).fill("#ffffff");

const CursorTrail = () => {
  useEffect(() => {
    const coords = { x: 0, y: 0 };
    const navbar = document.querySelector('.navbar')

    
    let isOverNavbar = false;
    // Create trail circles
    window.addEventListener("mousemove", (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
      
        // Check if mouse is over the navbar
        const target = e.target;
        if (navbar && target instanceof Node && navbar.contains(target)) {
            isOverNavbar = true;
          } else {
            isOverNavbar = false;
          }
      });
    const circles: HTMLDivElement[] = [];


    for (let i = 0; i < colors.length; i++) {
      const circle = document.createElement("div");
      circle.classList.add("circle");
      circle.style.backgroundColor = colors[i];
      document.body.appendChild(circle);

      // @ts-ignore - attach custom properties for animation
      circle.x = 0;
      // @ts-ignore
      circle.y = 0;

      circles.push(circle);
    }

    window.addEventListener("mousemove", (e) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
    });

    function animateCircles() {
      let x = coords.x;
      let y = coords.y;

      circles.forEach((circle, index) => {
        circle.style.left = `${x - 12}px`;
        circle.style.top = `${y - 12}px`;
        circle.style.scale = `${(circles.length - index) / circles.length}`;

        // @ts-ignore
        circle.x = x;
        // @ts-ignore
        circle.y = y;
        const color = isOverNavbar ? "#000000" : "#ffffff";
        circle.style.backgroundColor = color;

        const nextCircle = circles[index + 1] || circles[0];
        // @ts-ignore
        x += (nextCircle.x - x) * 0.3;
        // @ts-ignore
        y += (nextCircle.y - y) * 0.3;
      });

      requestAnimationFrame(animateCircles);
    }

    animateCircles();

    // Cleanup
    return () => {
      circles.forEach((circle) => document.body.removeChild(circle));
    };
  }, []);

  return null;
};

export default CursorTrail;
