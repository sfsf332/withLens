import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { ItemService } from 'src/item/item.service';
import { Network, Alchemy, OwnedNftsResponse } from "alchemy-sdk";
import { MetadataService } from 'src/metadata/metadata.service';
import { Metadata } from 'src/interface/metadata.interface';
const settings = {
    apiKey: "HyL-ZQJvN-EVa3sgbE3Q1MPXlvjSdfiY",
    network: Network.MATIC_MAINNET,
};
const alchemy = new Alchemy(settings);
const settingsEth = {
    apiKey: "HyL-ZQJvN-EVa3sgbE3Q1MPXlvjSdfiY",
    network: Network.ETH_MAINNET,
};
const alchemyETH = new Alchemy(settingsEth);


let n = 44
@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(private readonly ItemService: ItemService, private readonly MetadataService: MetadataService) { }

    @Cron('10 * * * * *')
    async handleCron() {
        // this.logger.debug('该方法将在10秒标记处每分钟运行一次');
        // const nftOwner = await this.ItemService.getNftUser('0xED5AF388653567Af2F388E6224dC7C4b3241C544'.toLocaleLowerCase())
        // if(n<nftOwner[0].ownerList.length){
        //     const params = {
        //         contractAddresses: ['0xdb46d1dc155634fbc732f92e853b10b288ad5a1d'.toLocaleLowerCase()],
        //     }
        //     console.log(nftOwner[0].ownerList[n])
        //     let {ownedNfts} = await alchemy.nft.getNftsForOwner(nftOwner[0].ownerList[n].toLocaleLowerCase(),params)
        //     let metaData = {
        //         name:ownedNfts[0].title,
        //         description:ownedNfts[0].description,
        //         image:ownedNfts[0].media[0].raw,
        //     }
        //     console.log(metaData)
        //     this.MetadataService.setMetadata(metaData)
        //     // let result  = await this.ItemService.setNftUser(metaData)
        //     n++
        //     return n
        // }else{
        //     return
        // }
    }

    @Interval(10000)
    async handleInterval() {
        // 获取AZUKI NFT的头像和tokenId
        // const fileterAddress = '0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b';
        // const filterName="CloneX"
        // const nftOwner = await this.ItemService.getNftUser(fileterAddress)
        // if (n < nftOwner[0].ownerList.length) {
        //     const params = {
        //         contractAddresses: ['0xdb46d1dc155634fbc732f92e853b10b288ad5a1d'.toLocaleLowerCase()],
        //     }
        //     const paramsFilter = {
        //         contractAddresses: [fileterAddress.toLocaleLowerCase()],
        //     }
        //     let { ownedNfts: lensInfo } = await alchemy.nft.getNftsForOwner(nftOwner[0].ownerList[n].toLocaleLowerCase(), params)
        //     let { ownedNfts: FilterInfo } = await alchemyETH.nft.getNftsForOwner(nftOwner[0].ownerList[n].toLocaleLowerCase(), paramsFilter)
        //     if (lensInfo.length<1) {
        //         n++
        //         return
        //     }
           
        //     let metaData = {
        //         nftName: filterName,
        //         name: lensInfo[0].title || '',
        //         tokenId: FilterInfo[0].tokenId,
        //         image: FilterInfo[0].rawMetadata?.image || FilterInfo[0].media[0].raw || '',
        //         thumbnail: FilterInfo[0].media[0]?.thumbnail || '',
        //     }
        //     this.MetadataService.setMetadata(metaData)
        //     // let result  = await this.ItemService.setNftUser(metaData)
        //     n++
        //     console.log(n)
        //     return n
        // } else {
        //     return
        // }
    }

    //   @Timeout(5000)
    //   handleTimeout() {
    //     this.logger.debug('3');
    //   }

    //   @Interval(10000)
    //   sendEmail() {
    //     this.logger.debug('3');
    //   }
}