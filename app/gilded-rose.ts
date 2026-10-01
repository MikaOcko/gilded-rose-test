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
	reduceQuality(i:number){
		this.items[i].quality = this.items[i].quality - 1;
	}

	increaseQuality(i:number){
		this.items[i].quality = this.items[i].quality + 1;
	}

	reduceSellIn(i:number){
		this.items[i].sellIn = this.items[i].sellIn - 1;
	}

	// ----------- TO DO : refacto ----------
	updateQuality() {
		const maxQuality:number = 50;
		const minQuality:number = 0;
		const dateExceeded:number = 0;

		for (let i = 0; i < this.items.length; i++) {

			if (
				this.items[i].name != "Aged Brie" &&
				this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
			) {
				// Si qualité inférieure à qualité maximum
				if (this.items[i].quality > minQuality) {
					if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
						this.reduceQuality(i);
					}
				}
			} else {
				// Si qualité inférieure à qualité maximum
				if (this.items[i].quality < maxQuality) {

					this.increaseQuality(i);

					if (
						this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
					) {
						if (this.items[i].sellIn < 11) {
							// 
							if (this.items[i].quality < maxQuality) {
								this.increaseQuality(i);
							}
						}
						if (this.items[i].sellIn < 6) {
							if (this.items[i].quality < maxQuality) {
								this.increaseQuality(i);
							}
						}
					}
				}
			}
			// Si le produit n'est pas de type "Sulfuras", reduire la date avant péremption
			if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
				this.reduceSellIn(i);
			}
			// Si la date de péremption est dépassée
			if (this.items[i].sellIn < dateExceeded) {
				if (this.items[i].name != "Aged Brie") {
					if (
						this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
					) {
						// Si qualité supérieure à qualité minimum
						if (this.items[i].quality > minQuality) {
							if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
								this.reduceQuality(i);
							}
						}
					} else {
						this.items[i].quality =
						this.items[i].quality - this.items[i].quality;
					}
				} else {
					// Si qualité inférieur à qualité maximum
					if (this.items[i].quality < maxQuality) {
						this.increaseQuality(i);
					}
				}
			}
		}

		return this.items;
	}
}
