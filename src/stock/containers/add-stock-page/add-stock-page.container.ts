import {Component} from "@angular/core";
import {Main} from "../../../common/components/main/main.component";
import {DefaultPage} from "../../../common/components/default-page/default-page.component";
import {DetailWineForm} from "../../components/detail-wine-form/detail-wine-form.component";
import {Router} from "@angular/router-deprecated";
import {Wine} from "../../entities/Wine";
import {AddStockPageSandbox} from "../../sandboxes/add-stock-page.sandbox";
import {WineService} from "../../services/wine.service";
@Component({
    selector: "add-stock-page",
    directives: [DetailWineForm, DefaultPage, Main],
    providers: [WineService, AddStockPageSandbox],
    template: `
        <default-page>
            <main>
                <div class="row">
                    <div class="col-sm-12">
                        <h1><i class="fa fa-plus-circle"></i>&nbsp;Add wine</h1>
                    </div>
                </div>
                <div class="row">
                    <detail-wine-form (onSave)="onSave($event)"></detail-wine-form>
                </div>
            </main>
        </default-page>
  `
})
export class AddStockPage {
    constructor(private sandbox:AddStockPageSandbox, private router:Router) {
    }

    public onSave(wine:Wine):void {
        this.sandbox.addWine(wine);
        this.router.navigateByUrl("/stock");
    }
}