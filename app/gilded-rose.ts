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
	reduceQuality(i:number){
		this.items[i].quality = this.items[i].quality - 1;
	}

	increaseQuality(i:number){
		this.items[i].quality = this.items[i].quality + 1;
	}

	reduceSellIn(i:number){
		this.items[i].sellIn = this.items[i].sellIn - 1;
	}
	updateQuality() {
		for (let i = 0; i < this.items.length; i++) {
			if (
				this.items[i].name != "Aged Brie" &&
				this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
			) {
				if (this.items[i].quality > 0) {
					if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
						this.reduceQuality(i);
					}
				}
			} else {
				if (this.items[i].quality < 50) {
					this.increaseQuality(i);

					if (
						this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
					) {
						if (this.items[i].sellIn < 11) {
							if (this.items[i].quality < 50) {
								this.increaseQuality(i);
							}
						}
						if (this.items[i].sellIn < 6) {
							if (this.items[i].quality < 50) {
								this.increaseQuality(i);
							}
						}
					}
				}
			}
			if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
				this.reduceSellIn(i);
			}
			if (this.items[i].sellIn < 0) {
				if (this.items[i].name != "Aged Brie") {
					if (
						this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
					) {
						if (this.items[i].quality > 0) {
							if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
								this.reduceQuality(i);
							}
						}
					} else {
						this.items[i].quality =
						this.items[i].quality - this.items[i].quality;
					}
				} else {
					if (this.items[i].quality < 50) {
						this.increaseQuality(i);
					}
				}
			}
		}

		return this.items;
	}
}
