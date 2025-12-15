"use client";

import { useState } from "react";
import { transferCart } from "@/lib/actions/cart";

export default function CartTransferForm({ users, currentUserId }: { users: any[], currentUserId: string }) {
    const [fromId, setFromId] = useState("");
    const [toId, setToId] = useState(currentUserId);

    return (
        <form
            action={async (formData) => {
                await transferCart(
                    formData.get("fromUserId") as string,
                    formData.get("toUserId") as string
                );
            }}
            className="flex flex-col md:flex-row gap-4 items-end bg-[#111] p-4 rounded-lg border border-[#333]"
        >
            <div className="flex-1 w-full">
                <label className="block text-xs font-semibold text-blue-400 mb-1">
                    Z konta (źródło):
                </label>
                <select
                    name="fromUserId"
                    className="w-full p-2 rounded text-sm bg-[#1a1a1a] text-gray-200 border border-[#333] focus:outline-none focus:border-blue-500"
                    required
                    value={fromId}
                    onChange={(e) => setFromId(e.target.value)}
                >
                    <option value="">-- Wybierz --</option>
                    {users.map((u) => (
                        <option
                            key={u.id}
                            value={u.id}
                            disabled={u.id === toId}
                            className={u.id === toId ? "text-gray-500 bg-[#111]" : "bg-[#1a1a1a]"}
                        >
                            {u.email || u.name || "Bez nazwy"} (Produkty: {u.cart?.items.length || 0}){" "}
                            {u.id === currentUserId ? "(Ty)" : ""}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex-1 w-full">
                <label className="block text-xs font-semibold text-blue-400 mb-1">
                    Na konto (cel):
                </label>
                <select
                    name="toUserId"
                    className="w-full p-2 rounded text-sm bg-[#1a1a1a] text-gray-200 border border-[#333] focus:outline-none focus:border-blue-500"
                    required
                    value={toId}
                    onChange={(e) => setToId(e.target.value)}
                >
                    <option value="">-- Wybierz --</option>
                    {users.map((u) => (
                        <option
                            key={u.id}
                            value={u.id}
                            disabled={u.id === fromId}
                            className={u.id === fromId ? "text-gray-500 bg-[#111]" : "bg-[#1a1a1a]"}
                        >
                            {u.email || u.name || "Bez nazwy"} {u.id === currentUserId ? "(Ty)" : ""}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                className="bg-white text-blue-600 px-4 py-2 rounded font-bold text-sm
                           hover:bg-blue-600 hover:text-white transition-colors
                           w-full md:w-auto border border-blue-600"
            >
                Przenieś
            </button>
        </form>
    );
}
