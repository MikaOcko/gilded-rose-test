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
			if (item.name != AOP.AgedBrie && item.name != AOP.BackstagePass) {
				// ---------- Code Alpha ----------
				if (item.quality > minQuality && item.name != AOP.Sulfuras) {
					this.reduceQuality(item);
				}
			} else {
				if (item.quality < maxQuality) {
					this.increaseQuality(item);

					if (item.name == AOP.BackstagePass) {
						if (item.sellIn < 11 && item.quality < maxQuality) {
							this.increaseQuality(item);
						}
						if (item.sellIn < 6 && item.quality < maxQuality) {
							this.increaseQuality(item);
						}
					}
				}
			}

			if (item.name != AOP.Sulfuras) {
				this.reduceSellIn(item);
			}
			// Si la date de péremption est dépassée
			if (item.sellIn < dateExceeded) {

				if (item.name != AOP.AgedBrie) {

					if (item.name != AOP.BackstagePass) {
						// ----------- Code Alpha ---------
						if (item.quality > minQuality && item.name != AOP.Sulfuras) {
							this.reduceQuality(item);
						}
					} else {
						item.quality = 0;
					}
				} else {
					if (item.quality < maxQuality) {
						this.increaseQuality(item);
					}
				}
			}
		}

		return this.items;
	}
}
