import { generateMetadata } from "./steps/1_generateMetadata";
import { generateRoot } from "./steps/2_generateRoot";
import { generateProof } from "./steps/3_generateProof";
import { verifyProof } from "./steps/4_verifyCorrectProof";
import { rejectFakeProof } from "./steps/5_rejectFakedProof";
import { cleanUp } from "./utils/cleanUp";

(async () => {
  cleanUp();

  /* 
  Step 1: Generate example metadata for 10 Moonbird NFTs and encode the image as a base64 data URI.
  */
  await generateMetadata();

  /* 
  Step 2: Generate the Merkle root.
  This task is performed by the collection owner who will submit it with the MetadataMerkleRootManifest.
  It requires a list of all metadata-JSONs for the collection, each linked to the inscription IDs of the respective InscriptionManifest.
  */
  generateRoot();

  /*
  Step 3: Generate proofs for an example token (index = 0).
  This task is performed by the NFT holder or other individuals who want to generate and submit proofs for different tokens onchain.
  The proof and the corresponding metadata will be submitted with the MetadataProofManifest.
  The proof requires the metadata to be proven, the corresponding inscription ID, and a set of all metadata used by the collection owner to generate the Merkle root.
  */
  generateProof(0);

  /* 
  Verifying/rejecting the proof for the token with index 0.
  This is the task of the indexer.
  This step requires the merkle root (submitted by the collection owner via the MetadataMerkleRootManifest) and the proof + to-be-proven metadata (submitted by the nft holder via the MetadataProofManifest)
  If this step is successful, the indexer can display an onchain version of the metadata for the corresponding token. This metadata is provenly approved by the collection owner.
  */
  verifyProof(0);
  rejectFakeProof(0);
})();
