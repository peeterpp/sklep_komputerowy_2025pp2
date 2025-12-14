"use client";

import { useState } from "react";
import { transferCart } from "@/lib/actions/cart";

export default function CartTransferForm({ users, currentUserId }: { users: any[], currentUserId: string }) {

    const [fromId, setFromId] = useState("");
    const [toId, setToId] = useState(currentUserId);

    return (
        <form
            action={async (formData) => {
                await transferCart(formData.get('fromUserId') as string, formData.get('toUserId') as string);
            }}
            className="flex flex-col md:flex-row gap-4 items-end"
        >

            <div className="flex-1 w-full">
                <label className="block text-xs font-semibold text-blue-600 mb-1">Z konta (źródło):</label>
                <select
                    name="fromUserId"
                    className="w-full p-2 border rounded text-sm"
                    required
                    value={fromId}
                    onChange={(e) => setFromId(e.target.value)}
                >
                    <option value="">-- Wybierz --</option>
                    {users.map(u => (
                        <option
                            key={u.id}
                            value={u.id}

                            disabled={u.id === toId}
                            className={u.id === toId ? "text-gray-300 bg-gray-100" : ""}
                        >
                            {u.email || u.name || 'Bez nazwy'} (Produkty: {u.cart?.items.length || 0}) {u.id === currentUserId ? '(Ty)' : ''}
                        </option>
                    ))}
                </select>
            </div>


            <div className="flex-1 w-full">
                <label className="block text-xs font-semibold text-blue-600 mb-1">Na konto (cel):</label>
                <select
                    name="toUserId"
                    className="w-full p-2 border rounded text-sm"
                    required
                    value={toId}
                    onChange={(e) => setToId(e.target.value)}
                >
                    <option value="">-- Wybierz --</option>
                    {users.map(u => (
                        <option
                            key={u.id}
                            value={u.id}

                            disabled={u.id === fromId}
                            className={u.id === fromId ? "text-gray-300 bg-gray-100" : ""}
                        >
                            {u.email || u.name || 'Bez nazwy'} {u.id === currentUserId ? '(Ty)' : ''}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-bold w-full md:w-auto">
                Przenieś
            </button>
        </form>
    );
}