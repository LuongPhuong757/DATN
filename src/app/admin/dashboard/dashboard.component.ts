import {Component, OnInit} from '@angular/core';
import {ChartDataset, ChartType, ChartOptions} from 'chart.js';
import {ManageUserService} from "../manage-user/manage-user.service";
import {ManageProductService} from "../manage-product/manage-product.service";
import {ManageOrderService} from "../manage-order/manage-order.service";
import {DashboardService} from "./dashboard.service";
import {ShareDataService} from "../../share-data.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  listUser: any[] = [];
  totalUser = 0;
  totalProduct = 0;
  totalOrder = 0;
  productEntity = 0;
  listOrder: any[] = [];

  radarChartOptions: ChartOptions = {
    responsive: true,
  };
  radarChartLabels: any[] = [
    // 'Tháng 04',
    // 'Tháng 05',
    // 'Tháng 06',
    // 'Tháng 07',
    // 'Tháng 08',
    // 'Tháng 09',
  ];

  radarChartData: ChartDataset[] = [
    {data: [], label: 'Khách hàng'},
    {data: [], label: 'Đơn hàng'},
    // { data: [2, 5, 10, 8, 5, 12], label: 'Khách hàng' },
    // { data: [5, 2, 3, 4, 6, 8], label: 'Đơn hàng' },
  ];
  radarChartType: ChartType = `radar`;


  lineChartData: ChartDataset[] = [
    {data: [], label: 'Doanh thu'},
    // { data: [24000000, 36700000, 30000000, 32000000, 53000000, 60000000], label: 'Doanh thu' },
  ];

  lineChartLabels: any[] = [
    // 'Tháng 04',
    // 'Tháng 05',
    // 'Tháng 06',
    // 'Tháng 07',
    // 'Tháng 08',
    // 'Tháng 09',
  ];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: any[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';

  constructor(private apiUser: ManageUserService,
              private apiProduct: ManageProductService,
              private apiOrder: ManageOrderService,
              private apiDashboard: DashboardService,
              private shareData: ShareDataService,
  ) {
  }

  ngOnInit(): void {
    this.apiUser.getUser({}).subscribe(res => {
      this.listUser = res.body.listUser.filter((i: any) => i.roles === 'USER');
      this.totalUser = res.body.listUser.filter((i: any) => i.roles === 'USER').length;
    })
    this.apiProduct.getProduct({}).subscribe(res => {
      this.totalProduct = res.body.totalProduct;
    })
    this.apiProduct.getProduct({status: 0}).subscribe(res => {
      this.productEntity = 6;
    })
    this.apiOrder.getOrder({}).subscribe(res => {
      this.totalOrder = res.body.length || 0;
    })
    this.apiDashboard.getUserStatistical().subscribe(res => {
      this.radarChartData[0].data = res.body.map((i: any) => +i.amount)  ;
      this.radarChartLabels = res.body.map((i: any) => +i.month)  ;
    })

    this.apiDashboard.getOrderStatistical().subscribe(res => {
      this.radarChartData[1].data = res.body.map((i: any) => +i.amount)  ;
      this.radarChartLabels = res.body.map((i: any) => +i.month)  ;
    })
    this.apiDashboard.getRevenue().subscribe(res => {
      this.lineChartData[0].data = res.body.map((i: any) => +i.amount)  ;
      this.lineChartLabels = res.body.map((i: any) => +i.month)  ;
    })
    this.apiOrder.getOrder({}).subscribe((res) => {
        if (res.status === 200) {
          this.listOrder = res.body;
        }
      });
  }


}
