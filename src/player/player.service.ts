import { Inject, Injectable } from '@nestjs/common';
import { Metadata } from 'src/interface/metadata.interface';
import { Token } from 'src/interface/token.interface';
import { ItemService } from 'src/item/item.service';
import { MetadataService } from 'src/metadata/metadata.service';

@Injectable()
export class PlayerService {
    @Inject(ItemService)
    private readonly itemService: ItemService;
    @Inject(MetadataService)
    private readonly metadataService: MetadataService;
    public findPlayerById(id: string): any {
        const items = this.itemService.getItems();

        return items
    }
    
    public findlens(): any {
        const items = this.itemService.getItems();

        return items
    }
    public findAll(): any {
        const items: any = this.itemService.findAll();

        return items;
    }
    public set(nftAddress: string): any {
        const item = this.itemService.set(nftAddress);
        
        // return await createdUser.save();
        return item;
    }
    public setLensUser():any{
        const userLength = this.itemService.setLensUsers()
        return userLength
    }
    public getNftUser(nftAddress: string):any{
        const userLength = this.itemService.getNftUser(nftAddress)
        return userLength
    }
    public getNftBothUser(name: string,page:number,limit:number):any{
        const userLength = this.metadataService.getNftBothUser(name,page,limit)
        return userLength
    }
}