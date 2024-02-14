import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

interface ValidatingFormGroup {
    email: FormControl<string | null>;
    required: FormControl<string | null>;
}

@Component({
    selector: 'app-form3',
    templateUrl: './form3.component.html',
    styleUrls: ['./form3.component.scss']
})
export class Form3Component {
    validatingForm = new FormGroup<ValidatingFormGroup>({
        email: new FormControl(null, [Validators.required, Validators.email]),
        required: new FormControl(null, Validators.required)
    });

    get input() {
        return this.validatingForm.get('email');
    }

    get input2() {
        return this.validatingForm.get('required');
    }

}
