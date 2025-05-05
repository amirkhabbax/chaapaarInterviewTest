import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable} from '@angular/core';
import { environment } from '../../../environments/default.environment';
import { map, Observable } from 'rxjs';
import { ParentEntity } from '../../models/ParentEntity.model';
import { Form } from '../../models/Form.model';
import { Field } from '../../models/Field.model';
import { LanguageHandlerService } from '../../shared/services/language-handler.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PostRequestBody } from '../../models/PostRequestBody.main';

@Injectable({
  providedIn: 'root',
})
export class GetFormService {
  private _httpClient = inject(HttpClient);
  private _languageHandlerService = inject(LanguageHandlerService);
  private apiLangauge = computed(() => {
    return this._languageHandlerService.langauge();
  });

  constructor() {}

  fetchedValues = rxResource({
    request: () => ({
      lang: this.apiLangauge(),
    }),
    loader: ({ request }) => this.fetchData(request),
  });

  fetchData(request: any): Observable<Form> {
    return this._httpClient
      .get(environment.default_gateway, {
        headers: new HttpHeaders({ 'accept-language': request.lang }),
      })
      .pipe(
        map((data: any) => {
          return this.mapData(data).form;
        })
      );
  }

  postData(request: PostRequestBody) {
    return this._httpClient.post(environment.default_gateway, request, {
      headers: new HttpHeaders({ 'accept-language': this.apiLangauge() }),
    });
  }

  private mapData(data: any) {
    return new ParentEntity(
      data.id,
      this.mapForm(data.form),
      data.steps,
      data.current,
      data.fieldErrors,
      data.errors
    );
  }

  private mapForm(form: any) {
    return new Form(
      form.name,
      form.title,
      form.submitLabel,
      form.nestedFormShowType,
      form.fieldDescriptionShowType,
      this.mapField(form.fields),
      form.forms
    );
  }

  private mapField(fields: any[]) {
    let result: Field[] = [];
    fields.forEach((field) => {
      result.push(
        new Field(
          field['@type'],
          field.name,
          field.title,
          field.errorMessage,
          field.required,
          field.minLength,
          field.maxLength,
          field.type,
          field.description ?? null,
          field.info ?? null,
          field.regex ?? null,
          field.descriptionShowType ?? null,
          field.showConfirmPassword ?? false
        )
      );
      if(field.showConfirmPassword)
      {
        result.push(
          new Field(
            field['@type'],
            this.apiLangauge()==='fa'?'تکرار '+field.name : 'Confirm ' + field.name,
            this.apiLangauge()==='fa'?'تکرار '+field.title: 'Confirm ' + field.title,
            field.errorMessage,
            field.required,
            field.minLength,
            field.maxLength,
            'CONFIRM_PASSWORD',
            field.description ?? null,
            field.info ?? null,
            field.regex ?? null,
            field.descriptionShowType ?? null,
            false
          )
        );
      }
    });

    return result;
  }
}
