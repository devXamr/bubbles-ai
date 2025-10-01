export function downloadPDF() {}

export function downloadDOCX() {}

// will accept messageList and download it as a .txt file.
export function downloadTXT(data: string[]) {
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
