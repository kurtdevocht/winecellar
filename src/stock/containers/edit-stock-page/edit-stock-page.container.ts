import {Component, OnDestroy} from "@angular/core";
import {Main} from "../../../common/components/main/main.component";
import {DefaultPage} from "../../../common/components/default-page/default-page.component";
import {ROUTER_DIRECTIVES, RouteParams, Router} from "@angular/router-deprecated";
import {DetailWineForm} from "../../components/detail-wine-form/detail-wine-form.component";
import {Wine} from "../../entities/Wine";
import {EditStockPageSandbox} from "../../sandboxes/edit-stock-page.sandbox";
import {WineService} from "../../services/wine.service";
@Component({
    selector: "add-stock-page",
    providers: [WineService, EditStockPageSandbox],
    directives: [ROUTER_DIRECTIVES, DetailWineForm, DefaultPage, Main],
    template: `
    <default-page>
        <main>
            <div class="row">
                <div class="col-sm-12">
                    <h1><i class="fa fa-pencil"></i>&nbsp;Edit wine</h1>
                </div>
             </div>
             <div class="row">
                <detail-wine-form [wine]="editWine$|async" *ngIf="editWine$|async" (onSave)="onSave($event)"></detail-wine-form>
            </div>
        </main>
    </default-page>
     `
})
export class EditStockPage implements OnDestroy {
    public editWine$ = this.sandbox.editWine$;

    constructor(public sandbox: EditStockPageSandbox,
                private routeParams: RouteParams,
                private router: Router) {
        this.sandbox.fetchWine(this.routeParams.get("id"));
    }

    public onSave(wine: Wine): void {
        this.sandbox.updateWine(this.routeParams.get("id"), wine);
        this.router.navigateByUrl("/stock");
    }

    public ngOnDestroy(): void {
        this.sandbox.clearWine();
    }
}