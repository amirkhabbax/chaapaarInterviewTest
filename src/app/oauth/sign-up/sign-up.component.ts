import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Field } from '../../models/Field.model';
import { Form } from '../../models/Form.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatIconModule , MatButtonModule, MatTooltipModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit{
  private formBuilder = inject(FormBuilder);
  signUpForm: FormGroup;

  hide = signal(true);
  form = signal<Form>({
    name: 'signup',
    title: 'Create Account',
    submitLabel: 'Register',
    nestedFormShowType: 'MAIN_FORM',
    fieldDescriptionShowType: 'TOOLTIP',
    fields: [      {
      _type: ".input.TextField",
      name: "identifier",
      title: "Mobile number or email",
      description: "Enter your mobile number or email",
      errorMessage: "The entered identifier is not valid",
      required: true,
      minLength: 3,
      maxLength: 40,
      type: "TEXT"
    },
    {
      _type: ".input.TextField",
      name: "username",
      title: "Username",
      description: "The entry argument must have English Lowercase Letters and minimum 5 characters and maximum 15 haracters.",
      descriptionShowType: "TOOLTIP",
      errorMessage: "username must have Lowercase and minimum 5characters and maximum 15 characters",
      required: true,
      regex: "^[a-z][a-z0-9]{4,}$",
      minLength: 5,
      maxLength: 15,
      type: "TEXT"
    },
    {
      _type: ".input.TextField",
      name: "first_name",
      title: "Name",
      description: "Enter name",
      errorMessage: "First name must be english with at least two characters and maximum 30 characters.",
      required: true,
      regex: "^[a-zA-Z]+$",
      minLength: 2,
      maxLength: 30,
      type: "TEXT"
    },
    {
      _type: ".input.TextField",
      name: "last_name",
      title: "Last name",
      description: "Enter last name",
      errorMessage: "Last name must be english with at least two characters.",
      required: true,
      regex: "^[a-zA-Z]+$",
      minLength: 2,
      maxLength: 30,
      type: "TEXT"
    },
    {
      _type: ".input.TextField",
      name: "display_name",
      title: "Display Name",
      errorMessage: "Display Name must be minimum 2 characters and maximum 50 characters",
      required: true,
      minLength: 2,
      maxLength: 50,
      type: "TEXT"
    },
    {
      _type: ".input.NewPasswordField",
      name: "newPassword",
      title: "Password",
      info: "The password must be a combination of lowercase letters, uppercase letters and English numbers and pecial characters such as (&, $, #, @, ^, % and...) and at least 8 and at most 20 characters.",
      errorMessage: "The entered password is not acceptable.",
      required: true,
      regex: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^!&-_+=()])(?=\\S+$).{8,20}$",
      minLength: 8,
      maxLength: 20,
      showConfirmPassword: true,
      type: "NEW_PASSWORD"
    }],
    forms: [],
  }); //TODO turn it to resource

  constructor() {
    this.signUpForm = this.formBuilder.group({
      fields: this.formBuilder.array<FormControl>([]),
    });
  }

  ngOnInit(): void {
    this.addFields();
  }

  get fields(): FormArray<FormControl> {
    return this.signUpForm.get('fields') as FormArray;
  }


  addFields() {

    this.form().fields.forEach(field => {
      this.fields.push(
        this.formBuilder.control(
          '',
          Validators.compose([
            field.required?Validators.required: Validators.nullValidator,
            field.regex?Validators.pattern(field.regex): Validators.nullValidator,
            Validators.minLength(field.minLength),
            Validators.maxLength(field.maxLength),
          ])
        )
      );
    });

  }


  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
