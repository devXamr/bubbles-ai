import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";
import { MessageType } from "./page";

export function downloadPDF(data: MessageType[]) {
  const doc = new jsPDF();

  doc.text(data.join("/n"), 10, 10);
  doc.save("messageList.pdf");
}

export async function downloadDOCX(data: MessageType[]) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: data.map(
          (eachLine) => new Paragraph({ text: eachLine.message })
        ),
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "messageList.docx");
}

// will accept messageList and download it as a .txt file.
export function downloadTXT(data: MessageType[]) {
  const blob = new Blob([data.join("/n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "messageList.txt";

  // simulating a click on the url
  a.click();

  // delete the temp url once the download process has been completed.
  URL.revokeObjectURL(url);
}
