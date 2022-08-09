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

//addresszero minter/burner
const zeroAddress = Address.fromString("0x0000000000000000000000000000000000000000");


export function handleTransfer(event: Transfer): void {
  let collection = getCollection(event.address);
  let tokenReciever = findAccount(event.params.to);
  if(event.params.from == zeroAddress){
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
