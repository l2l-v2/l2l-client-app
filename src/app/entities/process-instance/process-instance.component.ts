import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProcessInstanceService } from './process-instance.service';
import { ProcessInstance, ProcessInstanceQueryEntry } from './process-instance.model';
import { ProcessInstanceDataSource } from './process-instance.datasource';
import { ActivatedRoute, Router } from '@angular/router';
import { ITEMS_PER_PAGE } from '../../shared';
import { HttpResponse } from '@angular/common/http';
import { JhiAlertService, JhiParseLinks } from 'ng-jhipster';

@Component({
  selector: 'l2l-process-instance',
  templateUrl: './process-instance.component.html',
  styleUrls: ['./process-instance.component.scss']
})
export class ProcessInstanceComponent implements OnInit, AfterViewInit {
  private instances: ProcessInstance[];
  dataSource: ProcessInstanceDataSource;
  displayedColumns = ['id', 'applicationName', 'status', 'processDefinitionId', 'lastModified', 'actions'];
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

  constructor(private processInstanceService: ProcessInstanceService ,
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
      this.loadAll(this.runtimeBundle);
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
  private onSuccess(data, headers) {
    this.totalItems = headers.get('X-Total-Count');
    this.queryCount = this.totalItems;
    this.instances = data;
  }

  private onError(error) {
    this.alertService.error(error.error, error.message, null);
  }
  loadAll(runtimeBundle: string) {
    this.processInstanceService
      .query(runtimeBundle , {
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<ProcessInstance[]>) => this.onSuccess(res.body, res.headers),
        (res: HttpResponse<any>) => this.onError(res.body)
      );
  }

  performAction(row: ProcessInstanceQueryEntry, key: string) {
    if (key === 'suspend') {
      this.suspend(row);
    } else {
      this.activate(row);
    }
  }

  activate(row: ProcessInstanceQueryEntry): void {
    this.processInstanceService.activate(row.entry.applicationName, row.entry.id)
    .subscribe(
      (response) => {
        const mockRes = <ProcessInstanceQueryEntry>{
          entry: {
          applicationName: row.entry.applicationName,
          id: row.entry.id,
          processDefinitionId: row.entry.processDefinitionId,
          lastModified: row.entry.lastModified,
          status: 'RUNNING'
          }
        };
        this.dataSource.update(mockRes);
        console.log('POST call successful value returned in body');
    },
      (error) => {
        console.log('POST call in error', error.message);
      },
      () => {
        console.log('The POST observable is now completed.');
      });
  }

  suspend(row: ProcessInstanceQueryEntry): void {
    this.processInstanceService.suspend(row.entry.applicationName, row.entry.id)
    .subscribe(
      (response) => {
        const mockRes = <ProcessInstanceQueryEntry>{
          entry : {
          applicationName: row.entry.applicationName,
          id: row.entry.id,
          processDefinitionId: row.entry.processDefinitionId,
          lastModified: row.entry.lastModified,
          status: 'SUSPENDED'
          }
        };
        this.dataSource.update(mockRes);
        console.log('POST call successful value returned in body');
    },
      error => {
        console.log('POST call in error', error.message);
      },
      () => {
        console.log('The POST observable is now completed.');
      });
  }

  trackIdentity(index, item: ProcessInstance) {
    return item.id;
  }

  onRowClick(row: ProcessInstanceQueryEntry) {
    this.actions = [];
    if (row.entry.status === 'RUNNING') {
      this.actions.push({ key: 'suspend', icon: 'pause', label: 'Suspend' });
    } else {
      this.actions.push({ key: 'activate', icon: 'repeat', label: 'Activate' });
    }
  }

}
