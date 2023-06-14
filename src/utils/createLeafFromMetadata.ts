export const createLeafFromMetadata = (metadata: {
  inscriptionId: any;
  metadata: any;
}) => {
  const leafContent = {
    inscriptionId: metadata.inscriptionId,
    metadata: metadata,
  };
  const leafBuffer = Buffer.from(JSON.stringify(leafContent), "utf8");
  return leafBuffer;
};
