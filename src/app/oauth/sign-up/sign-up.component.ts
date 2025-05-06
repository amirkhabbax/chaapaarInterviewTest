import { Component, DestroyRef, effect, inject, linkedSignal, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Form } from '../../models/Form.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GetFormService } from './get-form.service';
import { PostRequestBody } from '../../models/PostRequestBody.main';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RequiredFieldPipe } from "../../shared/pipes/required-field.pipe";

@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RequiredFieldPipe
],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  private formBuilder = inject(FormBuilder);
  private getFormService = inject(GetFormService);
  private destroyRef = inject(DestroyRef);
  signUpForm: FormGroup;

  hide = signal(true);

  form = linkedSignal<Form>(
    () =>
      this.getFormService.fetchedValues.value() ??
      new Form('', '', '', 'MAIN_FORM', 'TOOLTIP', [], [])
  );

  constructor() {
    this.signUpForm = this.formBuilder.group({
      fields: this.formBuilder.array<FormControl>([]),
    });

    effect(() => {
      this.revaluateFields(this.form());
    });
  }

  get fields(): FormArray<FormControl> {
    return this.signUpForm.get('fields') as FormArray;
  }

  passwordChanged(value:any){
    if(this.fields.controls[
      this.fields.length -1
    ].value != value){
      this.fields.controls[
        this.fields.length -1
      ].setErrors({'incorrect':true});
    }else{
      this.fields.controls[
        this.fields.length -1
      ].setErrors(null);
    }
  }

  confirmPasswordChanged(value: any){
    if(this.fields.controls[
      this.fields.length -2
    ].value != value){
      this.fields.controls[
        this.fields.length -1
      ].setErrors({'incorrect':true});
    }
  }

  revaluateFields(form: Form) {
    this.fields.clear();
    form.fields.forEach((field) => {
      this.fields.push(
        this.formBuilder.control(
          '',
          Validators.compose([
            field.required ? Validators.required : Validators.nullValidator,
            field.regex
              ? Validators.pattern(field.regex)
              : Validators.nullValidator,
            Validators.minLength(field.minLength),
            Validators.maxLength(field.maxLength),
          ])
        )
      );
    });

    if(this.fields.length){
      this.fields.controls[
        this.fields.length -2
      ].valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((formData) => {
          this.passwordChanged(formData);
        });
  
        this.fields.controls[
          this.fields.length-1
      ].valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((formData) => {
          this.confirmPasswordChanged(formData);
        });
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      let postRequestBody = new PostRequestBody(
        this.fields.value[0],
        this.fields.value[1],
        this.fields.value[2],
        this.fields.value[3],
        this.fields.value[4],
        this.fields.value[5]
      );

      this.getFormService.postData(postRequestBody).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res) => {
        if (res) {
          console.log(res);
        }
      });
    }
    else{
      //throw new Error("Form is not valid");
    }
  }
}
