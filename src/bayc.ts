import { Address, BigInt } from "@graphprotocol/graph-ts"

import {
 Transfer
} from "../generated/Bayc/Bayc"
import { Collectible } from "../generated/schema"

import { findAccount,getCollection,getCollectible } from "./bayc.util"


//startblock 15394684

const zeroAddress = Address.fromString("0x0000000000000000000000000000000000000000");
const minterAddress = Address.fromString("0x8ae57a027c63fca8070d1bf38622321de8004c67");


export function handleTransfer(event: Transfer): void {
  let collection = getCollection(event.address);
  let tokenReciever = findAccount(event.params.to);
  if(event.params.from == Address.fromString("0x8ae57a027c63fca8070d1bf38622321de8004c67")){
    getCollectible(collection.collectionAddress,
      collection.id,
      event.params.tokenId,
      tokenReciever.id,
      event.block.timestamp
      )
  }else{
    let collectibleId = collection.collectionAddress
      .toHexString()
      .concat("-")
      .concat(event.params.tokenId.toHexString());
    let collectible = Collectible.load(collectibleId)
    if(collectible){
      if(event.params.to == zeroAddress){
        collectible.removed = event.block.timestamp;
      }else{
        let sender = findAccount(event.params.from);
        collectible.owner = sender.id;
        collectible.modified = event.block.timestamp;
      }
      collectible.save()
    }
  }
}

