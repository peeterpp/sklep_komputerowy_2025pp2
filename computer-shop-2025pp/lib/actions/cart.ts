"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";


export async function addToCart(productId: number) {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {

        return { error: "Musisz być zalogowany" };
    }

    try {

        let cart = await prisma.cart.findUnique({
            where: { userId: userId },
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId: userId },
            });
        }


        const existingItem = await prisma.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId: productId,
                },
            },
        });

        if (existingItem) {

            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { amount: existingItem.amount + 1 },
            });
        } else {

            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId: productId,
                    amount: 1,
                },
            });
        }

        revalidatePath('/basket');
        revalidatePath('/product-list');
        return { success: true };

    } catch (error) {
        console.error("Błąd dodawania do koszyka:", error);
        return { error: "Wystąpił błąd" };
    }
}


export async function getCartWithItems(userId: string) {
    if (!userId) return null;

    try {
        const cart = await prisma.cart.findUnique({

            where: { userId: userId },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                category: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });

        return cart;
    } catch (error) {
        console.error("Błąd podczas pobierania koszyka:", error);
        return null;
    }
}


export async function getCartTotal(userId: string) {
    if (!userId) return 0;

    const cart = await getCartWithItems(userId);

    if (!cart || !cart.items) {
        return 0;
    }

    const total = cart.items.reduce((sum, item) => {
        return sum + (item.product.price * item.amount);
    }, 0);

    return total;
}

export async function getAllUsersWithCarts() {
    return await prisma.user.findMany({
        include: {
            cart: {
                include: {
                    items: true
                }
            }
        }
    });
}


export async function transferCart(fromUserId: string, toUserId: string) {
    if (!fromUserId || !toUserId || fromUserId === toUserId) {
        return { error: "Nieprawidłowe dane transferu" };
    }

    try {
        await prisma.$transaction(async (tx) => {

            const sourceCart = await tx.cart.findUnique({
                where: { userId: fromUserId },
                include: { items: true }
            });

            if (!sourceCart || sourceCart.items.length === 0) return;


            let targetCart = await tx.cart.findUnique({
                where: { userId: toUserId }
            });

            if (!targetCart) {
                targetCart = await tx.cart.create({
                    data: { userId: toUserId }
                });
            }


            for (const item of sourceCart.items) {

                const existingItem = await tx.cartItem.findUnique({
                    where: {
                        cartId_productId: {
                            cartId: targetCart.id,
                            productId: item.productId
                        }
                    }
                });

                if (existingItem) {

                    await tx.cartItem.update({
                        where: { id: existingItem.id },
                        data: { amount: existingItem.amount + item.amount }
                    });
                } else {

                    await tx.cartItem.create({
                        data: {
                            cartId: targetCart.id,
                            productId: item.productId,
                            amount: item.amount
                        }
                    });
                }
            }


            await tx.cartItem.deleteMany({
                where: { cartId: sourceCart.id }
            });
        });

        revalidatePath('/basket');
        return { success: true };
    } catch (error) {
        console.error("Błąd transferu koszyka:", error);
        return { error: "Wystąpił błąd podczas transferu" };
    }
}
export async function removeCartItem(cartItemId: number) {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return { error: "Musisz być zalogowany" };
    }

    try {

        const cartItem = await prisma.cartItem.findUnique({
            where: { id: cartItemId },
            include: { cart: true }
        });

        if (!cartItem || cartItem.cart.userId !== userId) {
            return { error: "Nie znaleziono elementu lub brak uprawnień" };
        }


        await prisma.cartItem.delete({
            where: { id: cartItemId },
        });

        revalidatePath('/basket');
        return { success: true };

    } catch (error) {
        console.error("Błąd usuwania z koszyka:", error);
        return { error: "Wystąpił błąd podczas usuwania" };
    }
}