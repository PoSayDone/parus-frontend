import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create some sample categories
  const electronics = await prisma.category.create({
    data: {
      name: 'Electronics',
      handle: 'electronics',
      description: 'Electronic devices and gadgets',
    },
  });

  const clothing = await prisma.category.create({
    data: {
      name: 'Clothing',
      handle: 'clothing',
      description: 'Apparel and fashion items',
    },
  });

  // Create some sample products without variants
  const laptop = await prisma.product.create({
    data: {
      title: 'Gaming Laptop',
      handle: 'gaming-laptop',
      description: 'High-performance gaming laptop with RTX graphics',
      price: 1299.99,
      status: 'published',
      categories: {
        connect: [{ id: electronics.id }],
      },
    },
  });

  const tshirt = await prisma.product.create({
    data: {
      title: 'Cotton T-Shirt',
      handle: 'cotton-t-shirt',
      description: 'Comfortable cotton t-shirt for everyday wear',
      price: 19.99,
      status: 'published',
      categories: {
        connect: [{ id: clothing.id }],
      },
    },
  });

  // Create some sample blog posts
  const article = await prisma.blogPost.create({
    data: {
      title: 'Welcome to Our Store',
      handle: 'welcome-to-our-store',
      seoTitle: 'Welcome to Our Online Store',
      body: 'This is our first blog post welcoming customers to our new online store.',
      draft: false,
      type: 'article',
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });