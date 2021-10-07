import { Position, Toaster, Intent } from "@blueprintjs/core";

export class FlashHandler {
  toaster = Toaster;

  success(message = "") {
    const toast = this.toaster.create({
      className: "flash-success-message",
      position: Position.TOP
    });
    toast.show({ message, intent: Intent.SUCCESS, icon: "tick-circle" });
  }

  error(message = "") {
    const toast = this.toaster.create({
      className: "flash-error-message",
      position: Position.TOP
    });
    toast.show({ message, intent: Intent.DANGER, icon: "warning-sign" });
  }

  info(message = "") {
    const toast = this.toaster.create({
      className: "flash-info-message",
      position: Position.TOP
    });
    toast.show({ message, icon: "info-sign" });
  }
}
