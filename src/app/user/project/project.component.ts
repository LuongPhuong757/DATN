import {Component, OnInit} from '@angular/core';
import {ApiProcessService} from "../api-process/api-process.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  listProduct = [];

  constructor(private api: ApiProcessService) {
  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct(): void {
    this.api.getProduct({page: 1, limit: 20,}).subscribe((res) => {
      if (res.status === 200) {
        this.listProduct = res.body;
      }
    });

  }
}
