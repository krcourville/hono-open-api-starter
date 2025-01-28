import { prisma } from './client';

const breeds = [
  {
    id: 'clsqw0i4g0000mr08kz7g4l1h',
    name: 'Domestic Long hair',
  },
  {
    id: 'clsqw0i4g0001mr08d3h5g2j9',
    name: 'Domestic Short hair',
  },
  {
    id: 'clsqw0i4g0002mr08p9f1h4k2',
    name: 'Domestic Medium hair',
  },
  {
    id: 'clsqw0i4g0003mr08q2m5n7p4',
    name: 'Chihuahua',
  },
  {
    id: 'clsqw0i4g0004mr08r4t8v1x6',
    name: 'Doberman',
  },
  {
    id: 'clsqw0i4g0005mr08s6w9y3z8',
    name: 'German Shepherd',
  },
  {
    id: 'clsqw0i4g0006mr08t8z2b5c0',
    name: 'Golden Retriever',
  },
];

/**
 * Seed the database with initial data
 */
export async function seed() {
  for (const breed of breeds) {
    const existing = await prisma.breed.findUnique({
      where: {
        id: breed.id,
      },
    });

    if (!existing) {
      await prisma.breed.create({
        data: breed,
      });
    }
  }
}

await seed();
