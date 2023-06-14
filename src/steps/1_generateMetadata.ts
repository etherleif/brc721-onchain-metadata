import axios from "axios";
import fs from "fs";
import { encode } from "base64-arraybuffer";
import sharp from "sharp";

export const generateMetadata = async () => {
  if (fs.existsSync("data/metadata.json")) {
    console.log("Metadata already exists, skipping this step");
    return;
  }

  console.log("Generating metadata...");

  const datas = [];
  for (let i = 0; i < 10; i++) {
    const response = await axios.get(
      `https://live---metadata-5covpqijaa-uc.a.run.app/metadata/${i}`
    );
    const data = await response.data;

    // Fetch the image data and encode it to Base64
    const imageResponse = await axios.get(
      `https://github.com/proofxyz/moonbirds-assets/blob/main/collection/png/${i}.png?raw=true`,
      { responseType: "arraybuffer" }
    );
    const imageBuffer = imageResponse.data;

    // Convert the image to WebP format
    const webpBuffer = await sharp(imageBuffer).toFormat("webp").toBuffer();
    const imageDataUri = `data:image/webp;base64,${encode(webpBuffer)}`;

    // Replace the image URL with the Base64-encoded data URI
    data.image = imageDataUri;
    data.inscriptionId = `i${i}`; // fake inscriptionId

    datas.push(data);
  }
  fs.writeFileSync("data/metadata.json", JSON.stringify(datas));
};
