import { PrismaClient } from '@prisma/client';
import csv from 'csv-parser';
import { Readable } from 'stream';

const prisma = new PrismaClient();

async function fetchCSVData(url) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch CSV data: ${response.statusText}`);
	}

	const data = await response.text();
	const results = [];

	return new Promise((resolve, reject) => {
		Readable.from(Buffer.from(data))
			.pipe(csv())
			.on('data', (row) => results.push(row))
			.on('end', () => resolve(results))
			.on('error', (error) => reject(error));
	});
}

async function main() {
	console.log('Start seeding...');

	try {
		// Fetch and parse CSV data
		const tractorModels = await fetchCSVData(
			'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Asset_models_urls-cIEclqvW1dIZB8RE7FEsMp7WmwdrqQ.csv'
		);

		console.log(`Fetched ${tractorModels.length} tractor models from CSV`);

		// Create sample users
		const user1 = await prisma.user.create({
			data: {
				firstName: 'John',
				lastName: 'Doe',
				email: 'john@example.com',
				password: 'hashed_password_here',
				phone: '+1234567890',
				role: 'SELLER',
			},
		});

		const user2 = await prisma.user.create({
			data: {
				firstName: 'Jane',
				lastName: 'Smith',
				email: 'jane@example.com',
				password: 'hashed_password_here',
				phone: '+1987654321',
				role: 'BUYER',
			},
		});

		console.log('Created sample users');

		// Create sample dealers
		await prisma.dealer.createMany({
			data: [
				{
					name: 'Farm Equipment Co.',
					region: 'Midwest',
					contactInfo: 'contact@farmequipment.com',
					services: ['Sales', 'Repair', 'Maintenance'],
					rating: 4.5,
					promotions: [
						'10% off on all tractors',
						'Free maintenance for 1 year',
					],
				},
				{
					name: 'Tractor World',
					region: 'Southeast',
					contactInfo: 'info@tractorworld.com',
					services: ['Sales', 'Rental', 'Trade-in'],
					rating: 4.2,
					promotions: [
						'Trade-in your old tractor',
						'Flexible financing options',
					],
				},
			],
		});

		console.log('Created sample dealers');

		// Create sample listings using tractor models from CSV
		for (const model of tractorModels.slice(0, 5)) {
			await prisma.listing.create({
				data: {
					title: `${model.model} for Sale`,
					description: `Brand new ${model.model} tractor available for immediate purchase.`,
					category: 'TRACTOR',
					images: [model.tractor_model_logo_url],
					price: Math.floor(Math.random() * (100000 - 50000) + 50000),
					location: 'Sample Location',
					age: 0,
					hoursUsed: 0,
					seller: { connect: { id: user1.id } },
					specification: {
						create: {
							engineModel: `${model.model} Engine`,
							horsepower: Math.floor(Math.random() * (200 - 100) + 100),
							fuelType: 'Diesel',
							transmission: 'Automatic',
							gears: 6,
							weight: Math.floor(Math.random() * (10000 - 5000) + 5000),
							length: 5.5,
							width: 2.5,
							height: 3.0,
							maxSpeed: 40,
							fuelCapacity: 200,
							hydraulicSystem: 'Advanced',
							pvtTakeoff: true,
							threePtHitch: true,
						},
					},
				},
			});
		}

		console.log('Created sample listings');

		// Create sample transactions and reviews
		const listing = await prisma.listing.findFirst();
		if (listing) {
			const transaction = await prisma.transaction.create({
				data: {
					listing: { connect: { id: listing.id } },
					buyer: { connect: { id: user2.id } },
					seller: { connect: { id: user1.id } },
					price: listing.price,
					status: 'COMPLETED',
				},
			});

			await prisma.review.create({
				data: {
					rating: 5,
					comment: 'Great tractor, exactly as described!',
					transaction: { connect: { id: transaction.id } },
					reviewer: { connect: { id: user2.id } },
					listing: { connect: { id: listing.id } },
				},
			});

			console.log('Created sample transaction and review');
		}

		console.log('Seeding finished successfully.');
	} catch (error) {
		console.error('Error during seeding:', error);
	} finally {
		await prisma.$disconnect();
	}
}

// Use top-level await
await main();
