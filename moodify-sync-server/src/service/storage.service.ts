import ImageKit from "@imagekit/nodejs";

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

export const uploadFile = async ({
  buffer,
  filename,
  folder = "",
}: {
  buffer: Buffer;
  filename: string;
  folder?: string;
}) => {
  const file = await client.files.upload({
    file: buffer.toString("base64"),
    fileName: filename,
  });

  return file;
};
