import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  
  ContractTransfer as ContractTransferEvent
} from "../generated/Bayc/Bayc"
import {
 
  Collectible
} from "../generated/schema"


import { findAccount,getCollection,getCollectible } from "./bayc.util"


//addresszero
const zeroAddress = Address.fromString("0x0000000000000000000000000000000000000000");


export function handleContractTransfer(event: ContractTransferEvent): void {
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
