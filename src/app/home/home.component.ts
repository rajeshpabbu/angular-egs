import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  loop = {
    a: 1,
    b: 2,
    c: 3,
    r: 4,
    d: 5,
    e: 6,
    f: 7
  };
  constructor() {}

  ngOnInit() {}
  code = `   //type script code
  var c = 123;
  var r = 2;
  function();
  `;
}
