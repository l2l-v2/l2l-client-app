import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormService } from '../form/form.service';
import { ProcessDefinitionModel, StartProcessPayload } from './process-definition.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ITEMS_PER_PAGE } from '../../shared';
import { HttpResponse } from '@angular/common/http';
import { JhiAlertService, JhiParseLinks } from 'ng-jhipster';
import { FormDefinitionModel } from '../form/form.model';
import {ProcessStartService} from './process-start.service';
import {ProcessInstance} from '../process-instance/process-instance.model';
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'l2l-process-definition',
  templateUrl: './process-start.component.html',
  styleUrls: ['./process-definition.component.scss']
})
export class ProcessStartComponent implements OnInit, AfterViewInit {
  private processDefinition: ProcessDefinitionModel;
  private startFormDefinition: FormDefinitionModel;
  private startProcessPayload: StartProcessPayload;
  total: number;
  actions: Array<any> = [];
  runtimeBundle: string;

  constructor(private formService: FormService ,
              private alertService: JhiAlertService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private processStartService: ProcessStartService ) {
    this.activatedRoute.data.subscribe(data => {
      console.log(data);
      this.runtimeBundle = data['runtimeBundle'];
      this.startProcessPayload = new StartProcessPayload();
    });
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ processDefinition }) => {
      this.processDefinition = processDefinition.body ? processDefinition.body.entry : processDefinition;
      console.log('processDefinition resolve =>', this.processDefinition);

    });
    this.readStartForm();
  }
  previousState() {
    this.router.navigate(['/process-definitions']);
  }
  ngAfterViewInit() {

  }
  readStartForm() {
    this.formService.readStartForm(this.runtimeBundle , this.processDefinition.id).subscribe(
      (res: HttpResponse<FormDefinitionModel>) => {
        this.startFormDefinition = res.body;
        console.log('start form : ', this.startFormDefinition);
    });
  }
  submitStartForm() {
    this.startProcessPayload.id = UUID.UUID().toString();
    console.log('process definition id : ' , this.processDefinition.id , this.startProcessPayload.id);
    this.startProcessPayload.processDefinitionId = this.processDefinition.id;
    this.startProcessPayload.processInstanceName = this.processDefinition.serviceName;
    this.processStartService.start(this.runtimeBundle, this.startProcessPayload)
      .subscribe(
        (res: HttpResponse<ProcessInstance>) => {
           console.log('start process : ' , res.body);
        }
      );
  }
}
