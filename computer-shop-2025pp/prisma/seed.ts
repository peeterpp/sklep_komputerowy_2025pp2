import { PrismaClient, OrderStatus } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


interface JsonProduct {
    id: number;
    code: string;
    name: string;
    type: string;
    price: number;
    amount: number;
    description: string;
    date: string;
    image: string;
    alt?: string;
}

async function main() {
    console.log('🌱 Rozpoczynam seedowanie bazy danych...');


    const productsFilePath = path.join(__dirname, '../data/products.json');

    if (!fs.existsSync(productsFilePath)) {
        console.error(`❌ Błąd: Nie znaleziono pliku danych w: ${productsFilePath}`);
        process.exit(1);
    }

    const rawData = fs.readFileSync(productsFilePath, 'utf-8');
    const productsData: JsonProduct[] = JSON.parse(rawData);

    console.log(`📦 Znaleziono ${productsData.length} produktów w pliku JSON.`);


    const uniqueCategories = [...new Set(productsData.map((p) => p.type))];

    for (const catName of uniqueCategories) {
        await prisma.category.upsert({
            where: { name: catName },
            update: {},
            create: { name: catName },
        });
    }


    const categoriesDb = await prisma.category.findMany();
    const categoryMap = new Map(categoriesDb.map((c) => [c.name, c.id]));


    for (const product of productsData) {
        const categoryId = categoryMap.get(product.type);

        if (!categoryId) continue;


        await prisma.product.upsert({
            where: { code: product.code },
            update: {
                amount: product.amount,
                price: product.price,
            },
            create: {

                id: product.id,
                code: product.code,
                name: product.name,
                price: product.price,
                amount: product.amount,
                description: product.description,
                image: product.image,
                categoryId: categoryId,

                createdAt: new Date(product.date),
            },
        });
    }
    console.log('✅ Produkty zaimportowane.');


    try {
        await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"Product"', 'id'), coalesce(max(id)+1, 1), false) FROM "Product";`);
    } catch (e) {

    }


    const userEmail = 'student@pk.edu.pl';
    const user = await prisma.user.upsert({
        where: { email: userEmail },
        update: {},
        create: {
            email: userEmail,
            name: 'Student Lab12',

            role: 'USER',
        },
    });


    const cartProduct1 = productsData.find(p => p.id === 1);
    const cartProduct2 = productsData.find(p => p.id === 7);

    if (cartProduct1 && cartProduct2) {
        const existingCart = await prisma.cart.findUnique({ where: { userId: user.id } });

        if (!existingCart) {
            await prisma.cart.create({
                data: {
                    userId: user.id,
                    items: {
                        create: [
                            { productId: cartProduct1.id, amount: 1 },
                            { productId: cartProduct2.id, amount: 2 },
                        ],
                    },
                },
            });
            console.log('🛒 Koszyk utworzony.');
        }
    }


    const ordersCount = await prisma.order.count({ where: { userId: user.id } });

    if (ordersCount < 4) {
        console.log('📜 Generowanie przykładowych zamówień...');

        const statuses = [
            OrderStatus.DELIVERED,
            OrderStatus.SHIPPED,
            OrderStatus.CANCELLED,
            OrderStatus.PROCESSING
        ];

        for (let i = 1; i <= 4; i++) {
            const prod = productsData[i + 10];
            if (!prod) continue;

            await prisma.order.create({
                data: {
                    userId: user.id,
                    orderNumber: `ORD-2025-LAB-${1000 + i}`,
                    status: statuses[i - 1],
                    total: prod.price * i,
                    createdAt: new Date(new Date().setDate(new Date().getDate() - i * 10)),
                    items: {
                        create: {
                            productId: prod.id,
                            amount: i,
                            price: prod.price,
                            productName: prod.name,
                            productCode: prod.code,
                        },
                    },
                },
            });
        }
        console.log('✅ Zamówienia dodane.');
    }

    console.log('🚀 Seeding zakończony sukcesem!');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });