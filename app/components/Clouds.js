"use client";

import React, { useEffect, useState } from "react";

const CLOUD_ASSETS = [
    "/clouds/cloud1.png",
    "/clouds/cloud2.png",
    "/clouds/cloud3.png",
    "/clouds/cloud4.png",
    "/clouds/cloud5.png",
    "/clouds/cloud6.png",
    "/clouds/cloud7.png",
];

const Clouds = () => {
    const [clouds, setClouds] = useState([]);

    useEffect(() => {
        // Generate random clouds on mount to avoid hydration mismatch
        const newClouds = Array.from({ length: 8 }).map((_, i) => ({
            id: i,
            src: CLOUD_ASSETS[Math.floor(Math.random() * CLOUD_ASSETS.length)],
            top: Math.random() * 80 + "%", // Random top position (0-80%)
            left: "0%", // Start from left edge (animation handles the rest)
            scale: 1.5 + Math.random() * 1, // Random scale (1.5 - 2.5)
            opacity: 1, // Full opacity
            duration: 200 + Math.random() * 100 + "s", // Much slower duration (200-300s)
            delay: -Math.random() * 300 + "s", // Random negative delay spanning full duration
        }));
        setClouds(newClouds);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {clouds.map((cloud) => (
                <img
                    key={cloud.id}
                    src={cloud.src}
                    alt=""
                    className="absolute animate-float"
                    style={{
                        top: cloud.top,
                        left: cloud.left,
                        transform: `scale(${cloud.scale})`,
                        opacity: cloud.opacity,
                        animationDuration: cloud.duration,
                        animationDelay: cloud.delay,
                    }}
                />
            ))}
        </div>
    );
};

export default Clouds;
