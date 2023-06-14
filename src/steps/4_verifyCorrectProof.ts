import { MerkleTree } from "merkletreejs";
import { keccak256 } from "@ethersproject/keccak256";
import fs from "fs";
import { createLeafFromMetadata } from "../utils/createLeafFromMetadata";

export const verifyProof = (index: number) => {
  console.log(`Verifying proof for index ${index}...`);

  // get the metadata for the chosen index
  const metadatas = JSON.parse(fs.readFileSync("data/metadata.json", "utf8"));
  const metadata = metadatas[index];

  // generate the leaf for the chosen index
  const leaf = createLeafFromMetadata(metadata);

  // get the proof for the chosen index
  const proof = JSON.parse(
    fs.readFileSync(`data/proofs/proof-${index}.json`, "utf8")
  ).map((p: any) => ({ ...p, data: Buffer.from(p.data, "hex") }));

  //get the merkle root
  const merkleRootData = JSON.parse(
    fs.readFileSync("data/merkleRootData.json", "utf8")
  );
  const merkleRoot = Buffer.from(merkleRootData, "hex");

  // Verify the proof and the leaf against the root
  const isValid = MerkleTree.verify(proof, leaf, merkleRoot, keccak256);

  if (isValid) {
    console.log("Correct Proof of is valid ✅");
  } else {
    console.error("Correct Proof is invalid ❌");
  }
};
