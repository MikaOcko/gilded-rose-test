import { Item, GildedRose } from '@/gilded-rose';
import { it, describe } from 'vitest';

describe('Gilded Rose', () => {
	it('should foo', () => {
		const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
		const items = gildedRose.updateQuality();
		expect(items[0].name).toBe('fixme');
	});

	it("Un produit perd en qualité à la fin de chaque jour", () => {

		const gildedRose = new GildedRose([new Item('Love potion', 5, 5)]);
		const items = gildedRose.updateQuality();

		expect(items[0].name).toContain("Love potion");
		expect(items[0].sellIn).toBeLessThan(5);
		expect(items[0].quality).toBeLessThan(5);
	});

	it("Un produit normal perd en 1pt de qualité après une journée", () => {
		const gildedRose = new GildedRose([new Item('Love potion', 1, 5)]);
		const items = gildedRose.updateQuality();

		expect(items[0].sellIn).toEqual(0);
		expect(items[0].quality).toBeLessThan(5);
		expect(items[0].quality).toEqual(4);
	});

	it("Un produit légendaire ne perd pas en qualité après une journée", () => {
		const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 1, 50)]);
		const items = gildedRose.updateQuality();

		expect(items[0].quality).toEqual(50);
	});

	it("Un produit légendaire n'a pas de date de péremption", () => {
		const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 1, 50)]);
		const items = gildedRose.updateQuality();

		expect(items[0].sellIn).toEqual(1);
	});

	it("Un produit périmé perd plus vite en qualité", () => {
		const gildedRose = new GildedRose([new Item('Love potion', -2, 50)]);
		const items = gildedRose.updateQuality();

		expect(items[0].sellIn).toBeLessThan(-2);
		expect(items[0].quality).toBeLessThan(50);
	});

	it("la qualité d'un produit normal ne peut pas être négative", () => {
		const gildedRose = new GildedRose([new Item('Love potion', 0, 0)]);
		const items = gildedRose.updateQuality();

		expect(items[0].quality).toEqual(0);
	});

	it("la qualité d'un produit périmé ne peut pas être négative", () => {
		const gildedRose = new GildedRose([new Item('Love potion', -2 , 5)]);
		const items = gildedRose.updateQuality();

		expect(items[0].quality).toBeGreaterThanOrEqual(0);
	});

	it("la qualité d'un produit ne peut être supérieure à 50", () => {
		const gildedRose = new GildedRose([new Item('Aged Brie', 1 , 50)]);
		const items = gildedRose.updateQuality();

		expect(items[0].quality).toBe(50);
	});

	it("la qualité d'un produit Aged Brie augmente avec le temps", () => {
		const gildedRose = new GildedRose([new Item('Aged Brie', 100 , 1)]);
		const items = gildedRose.updateQuality();

		expect(items[0].quality).toBeGreaterThan(1);
	});

	it("la qualité d'un produit Backstage augmente de 3pts si la date de péremption est dans moins de 5 jours", () =>{
		const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 1 , 1)]);
		const items = gildedRose.updateQuality();
		
		expect(items[0].quality).toBeGreaterThan(1);
		expect(items[0].quality).toEqual(4);
	});

	it("la qualité d'un produit Backstage est à zéro après le concert", () =>{
		const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
		const items = gildedRose.updateQuality();
		
		expect(items[0].quality).toEqual(0);
	});

	// it("", () =>{});
});
