import React from 'react';

export default function SectionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="animate-in fade-in duration-500">
            {children}
        </section>
    );
}