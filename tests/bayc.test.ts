import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { BaycApproval } from "../generated/schema"
import { BaycApproval as BaycApprovalEvent } from "../generated/Bayc/Bayc"
import { handleBaycApproval } from "../src/bayc"
import { createBaycApprovalEvent } from "./bayc-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let approved = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenId = BigInt.fromI32(234)
    let newBaycApprovalEvent = createBaycApprovalEvent(owner, approved, tokenId)
    handleBaycApproval(newBaycApprovalEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BaycApproval created and stored", () => {
    assert.entityCount("BaycApproval", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BaycApproval",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BaycApproval",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "approved",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BaycApproval",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
