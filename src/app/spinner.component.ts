import { Component } from '@angular/core';
import { SpinnerService } from './services/spinner.service';

@Component({
    selector: 'spinner-component',
    templateUrl: 'app/partials/spinner/spinner.html',
    styleUrls: ['app/partials/spinner/spinner.css']
})
export class SpinnerComponent {
    public active: boolean;

    public constructor(spinner: SpinnerService) {
        spinner.status.subscribe((status: boolean) => {
            this.active = status;
        });
    }
}