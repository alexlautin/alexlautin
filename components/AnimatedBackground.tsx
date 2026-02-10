"use client";

import { useEffect, useState } from 'react';

export default function AnimatedBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-[40%] h-[40%] rounded-full bg-teal-400/10 blur-3xl animate-blob mix-blend-multiply filter opacity-50"></div>
            <div className="absolute top-0 right-0 w-[30%] h-[30%] rounded-full bg-violet-400/10 blur-3xl animate-blob mix-blend-multiply filter opacity-50" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-0 left-0 w-[35%] h-[35%] rounded-full bg-indigo-400/10 blur-3xl animate-blob mix-blend-multiply filter opacity-50" style={{ animationDelay: '4s' }}></div>
            <div className="absolute top-[50%] left-[50%] w-[20%] h-[20%] rounded-full bg-blue-400/10 blur-3xl animate-blob mix-blend-multiply filter opacity-30" style={{ animationDelay: '1s' }}></div>
        </div>
    );
}
