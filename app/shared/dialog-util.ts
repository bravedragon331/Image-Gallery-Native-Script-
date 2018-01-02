import * as dialogsModule from "ui/dialogs";

export function alert(message: string) {
  return dialogsModule.alert({
    title: "Concerta",
    okButtonText: "OK",
    message: message
  });
}
