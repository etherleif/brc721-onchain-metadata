import { keccak256 } from "@ethersproject/keccak256";
import fs from "fs";
import { createTreeFromMetadata } from "../utils/createTreeFromMetadata";
import { createLeafFromMetadata } from "../utils/createLeafFromMetadata";

export const generateProof = (index: any) => {
  console.log(`Generating proof for index ${index}...`);

  const metadata = JSON.parse(fs.readFileSync("data/metadata.json", "utf8"));

  // get the tree
  const { tree } = createTreeFromMetadata(metadata);

  // get the leaf
  const leaf = createLeafFromMetadata(metadata[index]);

  // Generate the proof for the selected metadata item
  const proof = tree.getProof(leaf);

  if (proof.length === 0) {
    throw new Error("Proof not found");
  }

  // Save the proof to a file
  if (!fs.existsSync("data/proofs/")) {
    fs.mkdirSync("data/proofs/");
  }
  fs.writeFileSync(
    `data/proofs/proof-${index}.json`,
    JSON.stringify(
      proof.map((p) => ({
        ...p,
        data: p.data.toString("hex"),
      }))
    )
  );
};
