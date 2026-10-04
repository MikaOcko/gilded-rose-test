export class Item {
	public name: string;
	public sellIn: number;
	public quality: number;

	constructor(name:string, sellIn:number, quality:number) {
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
	private reduceQuality(item:Item):void{
		if(item.quality > 0){
			item.quality -= 1;
		}
	}

	private increaseQuality(item:Item):void{
		if (item.quality < 50){
			item.quality += 1;
		}
	}

	// check si la date de péremption est passée
	private isExpired(item:Item):boolean{
		return item.sellIn < 0;
	}

	private reduceSellIn(item:Item):void{
		item.sellIn -= 1;
	}

	// ----------- TO DO : refacto ----------
	private updateItem(item:Item):void {
		const sulfuras = "Sulfuras, Hand of Ragnaros";
		const agedBrie = "Aged Brie";
		const backstagePass = "Backstage passes to a TAFKAL80ETC concert";

	
		switch(item.name){
			case sulfuras :
				// pas d'expiration
				//aucune perte de qualité
				break;
			case agedBrie :
				//augmentation de la qualité +1
				this.increaseQuality(item);
				// baisse du sellIn -1
				this.reduceSellIn(item);
				// si expiration : augmenation de la qualité +1
				if(this.isExpired(item)){
					this.increaseQuality(item);
				}
				break;
			case backstagePass :
				// augmentation de la qualité + 1
				this.increaseQuality(item);
				// baisse du sellIn -1
				this.reduceSellIn(item);
				// si sellIn < 11 : augmentation de la qualité +1
				if (item.sellIn < 11) {
					this.increaseQuality(item);
				}
				// si sellIn < 6 : augmentation de la qualité +1
				if (item.sellIn < 6) {
					this.increaseQuality(item);
				}
				// après expirations : quality =0
				if(this.isExpired(item)){
					item.quality = 0;
				}

				break;
			default :
				// baisse de la qualité -1
				this.reduceQuality(item);
				// baisse du sellIn -1
				this.reduceSellIn(item);
				// après expiration, baisse de la qualité -2
				if(this.isExpired(item)){
					this.reduceQuality(item);
				}
				break;
		}

		// if (item.name !== agedBrie && item.name !== backstagePass) {
		// 	// ---------- Code Alpha ----------
		// 	if (item.name !== sulfuras) {
		// 		this.reduceQuality(item);
		// 	}
		// } else {
		// 	this.increaseQuality(item);

		// 	if (item.name === backstagePass) {
		// 		if (item.sellIn < 11) {
		// 			this.increaseQuality(item);
		// 		}
		// 		if (item.sellIn < 6) {
		// 			this.increaseQuality(item);
		// 		}
		// 	}
		// }

		// if (item.name !== sulfuras) {
		// 	this.reduceSellIn(item);
		// }
		
		// if (this.isExpired(item)) {
		// 	if (item.name !== agedBrie) {
		// 		if (item.name !== backstagePass) {
		// 			// ----------- Code Alpha ---------
		// 			if (item.name !== sulfuras) {
		// 				this.reduceQuality(item);
		// 			}
		// 		} else {
		// 			item.quality = 0;
		// 		}
		// 	} else {
		// 		this.increaseQuality(item);
		// 	}
		// }
	}
	
	
	public updateQuality():Item[] {
		for (const item of this.items) {
			this.updateItem(item);
		}

		return this.items;
	}
}
