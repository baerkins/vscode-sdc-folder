import * as vscode from "vscode";

export function log(data: any) {
  const logger = vscode.window.createOutputChannel("New SDC");
  logger.appendLine(typeof data === 'string' ? data : JSON.stringify(data, null, 2));
  logger.show(true);
}