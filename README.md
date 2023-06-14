# brc721-onchain-metadata

## Introduction of Two New Manifests

This repository proposes the addition of two new manifests to the BRC-721 Protocol specifications. These manifests address the current limitation of the protocol in storing on-chain metadata for BRC-721 NFTs. The proposal outlines a method for collection creators to enable users to inscribe on-chain versions of the metadata and link them to the corresponding BRC-721 NFTs.

### MetadataMerkleRootManifest

```
  protocol
    name: "BRC721"
    version: string

  type: "metadataMerkleRoot"
  contentSignature: string

  content: JSON string
    collectionInscriptionId: string
    merkleRoot: string
```

The `MetadataMerkleRootManifest` is an Ordinal inscription linked to the `CollectionManifest`. It includes a DER-encoded signature and the `collectionInscriptionId` for secure linking to the `CollectionManifest`. Additionally, it contains a Merkle root that links each ID in the specified BRC721 collection to a JSON version of the metadata. This JSON representation may differ from the metadata returned by the `metadataURL` and typically includes optimized image formats to reduce file sizes.

In the initial version, the proposal suggests using base64-encoded images integrated into the JSON. Future versions may introduce more flexible referencing of inscriptions in the JSON.

### MetadataProofManifest

```
protocol
  name: "BRC721"
  version: string

type: "metadataProof"

nftInscriptionId: string
proof: string
metaData: JSON string
```

The `MetadataProofManifest` contains the metadata and the corresponding Merkle proof. It includes the protocol details, such as the name and version, along with the `nftInscriptionId`, `proof`, and `metaData` fields.

## Proof of Concept

To see a proof of concept implementation, refer to the [src/index.ts](src/index.ts) file in this repository.

The provided implementation demonstrates generating and verifying a root and proofs for Moonbird NFT metadata using Merkle trees.

Please note that this implementation serves as an example and may require further modifications or enhancements based on specific project requirements.

After installing packages you can run the showcase with

```
npm run showcase
```
