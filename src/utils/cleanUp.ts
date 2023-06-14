import fs from "fs";

export const cleanUp = () => {
  // Delete the merkleRootData.json file and the proofs folder
  fs.existsSync("data/merkleRootData.json") &&
    fs.unlinkSync("data/merkleRootData.json");
  fs.existsSync("data/proofs/") &&
    fs.rmdirSync("data/proofs", { recursive: true });
};
