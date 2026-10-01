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

					this.increaseQuality(item);

					if (
						item.name == "Backstage passes to a TAFKAL80ETC concert"
					) {
						if (item.sellIn < 11) {
							// 
							if (item.quality < maxQuality) {
								this.increaseQuality(item);
							}
						}
						if (item.sellIn < 6) {
							if (item.quality < maxQuality) {
								this.increaseQuality(item);
							}
						}
					}
				}
			}
			// Si le produit n'est pas de type "Sulfuras", reduire la date avant péremption
			if (item.name != "Sulfuras, Hand of Ragnaros") {
				this.reduceSellIn(item);
			}
			// Si la date de péremption est dépassée
			if (item.sellIn < dateExceeded) {
				if (item.name != "Aged Brie") {
					if (
						item.name != "Backstage passes to a TAFKAL80ETC concert"
					) {
						// Si qualité supérieure à qualité minimum
						if (item.quality > minQuality) {
							if (item.name != "Sulfuras, Hand of Ragnaros") {
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
						this.increaseQuality(item);
					}
				}
			}
		}

		return this.items;
	}
}
