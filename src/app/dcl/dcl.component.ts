import {
  Component,
  ViewChild,
  ComponentFactoryResolver,
  OnDestroy
} from "@angular/core";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { Subscription } from "rxjs";

@Component({
  selector: "app-dcl",
  templateUrl: "./dcl.component.html",
  styleUrls: ["./dcl.component.css"]
})
export class DclComponent implements OnDestroy {
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  private closeSub: Subscription;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  openPopup() {
    this.showErrorAlert("Test Message");
  }
  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
