import { NgModule } from "@angular/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material";
import { MatFormFieldModule } from "@angular/material/form-field";

const modules = [
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule
];
@NgModule({
    declarations: [],
    imports: [...modules],
    exports:[...modules]
})
export class MaterialModule {}
