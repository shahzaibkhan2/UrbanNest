import DataUriParser from "datauri/parser.js";
import path from "path";

const uriParser = new DataUriParser();

const getDataUri = (filePath) => {
  if (!filePath) {
    throw new Error("Sorry ! File path is required.");
  }
  const extName = path.extname(filePath?.originalname).toString();
  return uriParser.format(extName, filePath.buffer).content;
};

export default getDataUri;
