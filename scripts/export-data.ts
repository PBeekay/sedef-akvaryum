import fs from 'fs';
import path from 'path';

// Import data from the app
import { categories } from '../src/data/products';
import { products } from '../src/data/products';

function ensureDirectoryExists(targetDir: string): void {
	if (!fs.existsSync(targetDir)) {
		fs.mkdirSync(targetDir, { recursive: true });
	}
}

function writeJsonFile(filePath: string, data: unknown): void {
	const json = JSON.stringify(data, null, 2);
	fs.writeFileSync(filePath, json, 'utf-8');
}

function writeTextFile(filePath: string, content: string): void {
	fs.writeFileSync(filePath, content, 'utf-8');
}

function formatCategoriesAsText(): string {
	const lines: string[] = [];
	lines.push('Categories');
	lines.push('==========');
	for (const c of categories) {
		lines.push(`- id: ${c.id}`);
		lines.push(`  name: ${c.name}`);
		lines.push(`  icon: ${c.icon}`);
		lines.push('');
	}
	return lines.join('\n');
}

function formatProductsAsText(): string {
	const lines: string[] = [];
	lines.push('Products');
	lines.push('========');
	for (const p of products) {
		lines.push(`- id: ${p.id}`);
		lines.push(`  name: ${p.name}`);
		lines.push(`  category: ${p.category}`);
		lines.push(`  price: ${p.price}`);
		if ((p as any).shortDescription) lines.push(`  shortDescription: ${(p as any).shortDescription}`);
		if ((p as any).description) lines.push(`  description: ${(p as any).description}`);
		if ((p as any).image) lines.push(`  image: ${(p as any).image}`);
		if ((p as any).inStock !== undefined) lines.push(`  inStock: ${(p as any).inStock}`);
		if ((p as any).featured !== undefined) lines.push(`  featured: ${(p as any).featured}`);
		if ((p as any).new !== undefined) lines.push(`  new: ${(p as any).new}`);
		if ((p as any).colors) lines.push(`  colors: ${JSON.stringify((p as any).colors)}`);
		if ((p as any).socialBehavior) lines.push(`  socialBehavior: ${(p as any).socialBehavior}`);
		if ((p as any).waterParameters) lines.push(`  waterParameters: ${JSON.stringify((p as any).waterParameters)}`);
		if ((p as any).size) lines.push(`  size: ${(p as any).size}`);
		if ((p as any).difficulty) lines.push(`  difficulty: ${(p as any).difficulty}`);
		if ((p as any).breeding) lines.push(`  breeding: ${(p as any).breeding}`);
		if ((p as any).diet) lines.push(`  diet: ${(p as any).diet}`);
		if ((p as any).lifespan) lines.push(`  lifespan: ${(p as any).lifespan}`);
		if ((p as any).tankSize) lines.push(`  tankSize: ${(p as any).tankSize}`);
		lines.push('');
	}
	return lines.join('\n');
}

function main(): void {
	const exportDir = path.resolve(__dirname, '..', 'export');
	ensureDirectoryExists(exportDir);

	const categoriesPath = path.join(exportDir, 'categories.json');
	const productsPath = path.join(exportDir, 'products.json');
	const categoriesTxtPath = path.join(exportDir, 'categories.txt');
	const productsTxtPath = path.join(exportDir, 'products.txt');

	writeJsonFile(categoriesPath, categories);
	writeJsonFile(productsPath, products);

	writeTextFile(categoriesTxtPath, formatCategoriesAsText());
	writeTextFile(productsTxtPath, formatProductsAsText());

	// eslint-disable-next-line no-console
	console.log('Export completed:');
	// eslint-disable-next-line no-console
	console.log(' -', categoriesPath);
	// eslint-disable-next-line no-console
	console.log(' -', productsPath);
	// eslint-disable-next-line no-console
	console.log(' -', categoriesTxtPath);
	// eslint-disable-next-line no-console
	console.log(' -', productsTxtPath);
}

main();


