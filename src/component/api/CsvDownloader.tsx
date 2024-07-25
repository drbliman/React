import { saveAs } from "file-saver";
import store from "../store/store";
import Papa from "papaparse";

const CsvDownloader = () => {
  const data = store.getState().elements;

  const allKeys = Array.from(
    new Set(
      data.flatMap((obj) => 
        Object.keys(obj).filter((key) => !Array.isArray(obj[key]))
      )
    )
  );

  const normalizedData = data.map((obj) =>
    allKeys.reduce((acc, key) => {
      acc[key] = obj[key] !== undefined ? obj[key] : "-";
      return acc;
    }, {} as { [key: string]: string | number | undefined | Array<string> })
  );

  const csv = Papa.unparse(normalizedData, {
    header: true,
    quotes: true,
  });
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "data.csv");
};

export default CsvDownloader;