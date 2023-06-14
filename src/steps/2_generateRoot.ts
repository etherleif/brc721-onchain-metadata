import fs from "fs";
import { createTreeFromMetadata } from "../utils/createTreeFromMetadata";

export const generateRoot = () => {
  console.log("Generating root...");

  const data = JSON.parse(fs.readFileSync("data/metadata.json", "utf8"));

  // get the tree
  const merkleTreeData = createTreeFromMetadata(data);
  fs.writeFileSync(
    "data/merkleRootData.json",
    JSON.stringify(merkleTreeData.merkleRoot)
  );
};
