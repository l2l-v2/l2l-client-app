import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormService } from '../form/form.service';
import { ProcessDefinitionModel, ProcessDefinitionResponse, StartProcessPayload } from './process-definition.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ITEMS_PER_PAGE } from '../../shared';
import { HttpResponse } from '@angular/common/http';
import { JhiAlertService, JhiParseLinks } from 'ng-jhipster';
import { FormDefinitionModel } from '../form/form.model';

@Component({
  selector: 'l2l-process-definition',
  templateUrl: './process-start.component.html',
  styleUrls: ['./process-definition.component.scss']
})
export class ProcessStartComponent implements OnInit, AfterViewInit {
  private processDefinition: ProcessDefinitionModel;
  private startFormDefinition: FormDefinitionModel;
  private startForm: FormDefinitionModel;
  total: number;
  actions: Array<any> = [];
  success: any;
  routeData: any;
  links: any;
  totalItems: any;
  queryCount: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  runtimeBundle: string;

  constructor(private formService: FormService ,
              private alertService: JhiAlertService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      console.log(data);
      this.page = data['pagingParams'].page;
      this.previousPage = data['pagingParams'].page;
      this.reverse = data['pagingParams'].ascending;
      this.predicate = data['pagingParams'].predicate;
      this.runtimeBundle = data['runtimeBundle'];
    });
  }

  ngOnInit() {
    this.readStartForm();
  }

  ngAfterViewInit() {

  }
  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }
  transition() {
    this.router.navigate(['/admin/user-management'], {
      queryParams: {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.readStartForm();
  }

  readStartForm() {
    this.formService.readStartForm(this.runtimeBundle , this.processDefinition.id)
      .subscribe(
        (res: HttpResponse<FormDefinitionModel>) => {
            console.log('start form : ', res.body);
        },
        (res: HttpResponse<any>) => {

        },
        () => {
          console.log('The POST observable is now completed.');
        });
  }
  submitStartForm(){}
}
