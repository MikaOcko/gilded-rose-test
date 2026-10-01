export class Item {
	public name: string;
	public sellIn: number;
	public quality: number;

	constructor(name, sellIn, quality) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}
}

enum AOP {
	Sulfuras = "Sulfuras",
	AgedBrie = "Aged Brie",
	BackstagePass = "Backstage pass",

}

export class GildedRose {
	// Props
  	items: Array<Item>;

	// Constructor
	constructor(items = [] as Array<Item>) {
		this.items = items;
	}

	// Functions
	reduceQuality(item:Item){
	 	item.quality = item.quality - 1;
	}

	increaseQuality(item:Item){
		item.quality = item.quality + 1;
	}

	reduceSellIn(item:Item){
		item.sellIn = item.sellIn - 1;
	}

	// ----------- TO DO : refacto ----------
	updateQuality() {
		const maxQuality:number = 50;
		const minQuality:number = 0;
		const dateExceeded:number = 0;

		enum AOP {
			Sulfuras = "Sulfuras, Hand of Ragnaros",
			AgedBrie = "Aged Brie",
			BackstagePass = "Backstage passes to a TAFKAL80ETC concert",
		}

		for (const item of this.items) {

			if (
				item.name != "Aged Brie" &&
				item.name != "Backstage passes to a TAFKAL80ETC concert"
			) {
				// Si qualité inférieure à qualité maximum
				if (item.quality > minQuality) {
					if (item.name != "Sulfuras, Hand of Ragnaros") {
						this.reduceQuality(item);
					}
				}
			} else {
				// Si qualité inférieure à qualité maximum
				if (item.quality < maxQuality) {
					// Augmenter la qualité
					this.increaseQuality(item);

					// Si item = Concert pass
					if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
						// Si date de péremption < 11
						if (item.sellIn < 11) {
							// Si qualité inférieure à qualité maximum
							if (item.quality < maxQuality) {
								this.increaseQuality(item);
							}
						}
						// Si date de péremption < 6
						if (item.sellIn < 6) {
							if (item.quality < maxQuality) {
								this.increaseQuality(item);
							}
						}
					}
				}
			}
			// Si item ≠ Sulfuras, reduire la date avant péremption
			if (item.name != "Sulfuras, Hand of Ragnaros") {
				this.reduceSellIn(item);
			}
			// Si la date de péremption est dépassée
			if (item.sellIn < dateExceeded) {
				// Si item ≠ Vieux fromage
				if (item.name != "Aged Brie") {
					// Si item ≠ Concert pass
					if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
						// Si qualité supérieure à qualité minimum
						if (item.quality > minQuality) {
							// Si item ≠ Sulfuras
							if (item.name != "Sulfuras, Hand of Ragnaros") {
								// Baisse de la qualité
								this.reduceQuality(item);
							}
						}
					} else {
						item.quality =
						item.quality - item.quality;
					}
				} else {
					// Si qualité inférieur à qualité maximum
					if (item.quality < maxQuality) {
						// Augmentation de la qualité
						this.increaseQuality(item);
					}
				}
			}
		}

		return this.items;
	}
}
