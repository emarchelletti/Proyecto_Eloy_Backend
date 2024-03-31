import multer from "multer";
import { __dirname } from "../utils/utils.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder;
    switch (file.fieldname) {
      case "profile":
        folder = "profiles";
        break;
      case "product":
        folder = "products";
        break;
      case "document":
        folder = "documents";
        break;
      default:
        folder = "documents";
    }
    cb(null, __dirname + "/public/" + folder);
  },
  filename: function (req, file, cb) {
    let filename;
    switch (file.fieldname) {
      case "ID":
        filename = "DNI";
        break;
      case "DOMICILIO":
        filename = "DOMICILIO";
        break;
      case "CBU":
        filename = "CBU";
        break;
      default:
        filename = file.originalname;
    }
    cb(null, filename);
  },
});

export const uploader = multer({ storage: storage });
