import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Transfer
} from "../generated/Coven/Coven"
import { Collectible } from "../generated/schema"

import { findAccount,getCollection,getCollectible } from "./coven.util"

  // - contract.owner(...)
  // - contract.ownerOf(...)
  // - contract.royaltyInfo(...)
  // - contract.supportsInterface(...)
  // - contract.symbol(...)
  // - contract.tokenURI(...)
  // - contract.verificationHash(...)

//addresszero
const zeroAddress = Address.fromString("0x0000000000000000000000000000000000000000");
const minterAddress = Address.fromString("0x5f309c1116ce21dbefbcc36ff2a9c8751f15ac7e");


export function handleTransfer(event: Transfer): void {
  let collection = getCollection(event.address);
  let tokenReciever = findAccount(event.params.to);
  if(event.params.from == Address.fromString("0x5f309c1116ce21dbefbcc36ff2a9c8751f15ac7e")){
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
