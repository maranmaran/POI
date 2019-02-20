import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.scss"]
})
export class ErrorComponent {
  constructor(public snackBar: MatSnackBar) {}

  dismiss() {
    this.snackBar.dismiss();
  }
}
