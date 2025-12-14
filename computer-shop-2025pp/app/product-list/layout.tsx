import React from 'react';

export default function ProductListLayout({
    children,
    modal,
    discounts,
}: {
    children: React.ReactNode;
    modal: React.ReactNode;
    discounts: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto">
            {modal}

            <section className="w-full">
                {discounts}
            </section>

            <section className="w-full">
                {children}
            </section>
        </div>
    );
}