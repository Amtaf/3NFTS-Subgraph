import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  BaycApproval,
  BaycApprovalForAll,
  BaycOwnershipTransferred,
  BaycTransfer
} from "../generated/Bayc/Bayc"

export function createBaycApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): BaycApproval {
  let baycApprovalEvent = changetype<BaycApproval>(newMockEvent())

  baycApprovalEvent.parameters = new Array()

  baycApprovalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  baycApprovalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  baycApprovalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return baycApprovalEvent
}

export function createBaycApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): BaycApprovalForAll {
  let baycApprovalForAllEvent = changetype<BaycApprovalForAll>(newMockEvent())

  baycApprovalForAllEvent.parameters = new Array()

  baycApprovalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  baycApprovalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  baycApprovalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return baycApprovalForAllEvent
}

export function createBaycOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): BaycOwnershipTransferred {
  let baycOwnershipTransferredEvent = changetype<BaycOwnershipTransferred>(
    newMockEvent()
  )

  baycOwnershipTransferredEvent.parameters = new Array()

  baycOwnershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  baycOwnershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return baycOwnershipTransferredEvent
}

export function createBaycTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): BaycTransfer {
  let baycTransferEvent = changetype<BaycTransfer>(newMockEvent())

  baycTransferEvent.parameters = new Array()

  baycTransferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  baycTransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  baycTransferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return baycTransferEvent
}
