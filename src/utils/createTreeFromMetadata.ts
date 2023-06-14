import { keccak256 } from "@ethersproject/keccak256";
import MerkleTree from "merkletreejs";
import { createLeafFromMetadata } from "./createLeafFromMetadata";

export const createTreeFromMetadata = (metadata: any) => {
  const leaves = metadata.map(createLeafFromMetadata);

  const merkleTree = new MerkleTree(leaves, keccak256);

  return {
    merkleRoot: merkleTree.getRoot().toString("hex"),
    tree: merkleTree,
  };
};
