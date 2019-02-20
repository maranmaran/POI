import { ErrorComponent } from './../../app/handle-pages/error/error.component';
import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ErrorHelper implements OnInit {

  constructor(
    public snackbar: MatSnackBar,
  ) {}

  stopLoadingEmitter = new EventEmitter<void>();

  ngOnInit() {
    console.log('here1');
    this.stopLoadingEmitter.emit();
  }

  public handleError(err: any) {
    this.snackbar.openFromComponent(ErrorComponent);
  }
}
