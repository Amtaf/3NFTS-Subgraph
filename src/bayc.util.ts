import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Bayc
} from "../generated/Bayc/Bayc"
import { Account, Collection, Collectible } from "../generated/schema";


//function to load/create account address if inexistent
export function findAccount(address: Address): Account {
  let account = Account.load(address.toHexString());
  if(!account){
    account = new Account(address.toHexString());
    account.address = address;
    account.save() 
  }
  return account as Account
}

export function getCollection(address: Address): Collection{
  let collectionId = address.toHexString();
  let collection = Collection.load(collectionId);
  if(!collection){
    collection = new Collection(collectionId);
    collection.collectionAddress = address;

    let BaycContract = Bayc.bind(address);
    let name = BaycContract.try_name()
      if(!name.reverted){
        collection.collectionName = name.value;

      }
    let symbol = BaycContract.try_symbol();  
      if(!symbol.reverted){
        collection.collectionSymbol = symbol.value;

      }
  collection.save()  

  }

  return collection;
}


export function getCollectible(collectionAddress: Bytes, 
  collectionId: string, 
  tokenId: BigInt, 
  creatorId: string,
  timeCreated: BigInt
  ): Collectible{
  let collectibleId = collectionAddress.toHexString()
  .concat("-")
  .concat(tokenId.toHexString());
  let collectible = Collectible.load(collectibleId);
  if(!collectible){
    collectible = new Collectible(collectibleId);
    collectible.tokenId = tokenId;
    collectible.collection = collectionId
    collectible.creator = creatorId;
    collectible.owner = creatorId;
    collectible.created = timeCreated;

    let BaycContract = Bayc.bind(Address.fromBytes(collectionAddress));
    let callResult = BaycContract.try_tokenURI(tokenId);
    if(!callResult.reverted){
        collectible.descriptorURI = callResult.value;
    }
    collectible.save()

  }


  return collectible;
}