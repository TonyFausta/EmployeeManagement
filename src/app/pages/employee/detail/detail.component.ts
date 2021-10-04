import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeData } from 'src/app/assets/data';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  id: any;
  data: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataSrv: DataService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });

    this.data = EmployeeData.find(o => o.id === this.id);
  }

  ngOnInit(): void {}

  backToList() {
    this.router.navigate(['/employee-list-page']);
  }
}
