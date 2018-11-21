import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormService } from '../form/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITEMS_PER_PAGE } from '../../shared';
import { HttpResponse } from '@angular/common/http';
import { JhiAlertService, JhiParseLinks } from 'ng-jhipster';
import { FormDefinitionModel } from '../form/form.model';
import {TaskModel} from './task.model';

@Component({
  selector: 'l2l-task',
  templateUrl: './task-start.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskStartComponent implements OnInit, AfterViewInit {
  private task: TaskModel;
  private startFormDefinition: FormDefinitionModel;
  total: number;
  actions: Array<any> = [];
  runtimeBundle: string;

  constructor(private formService: FormService ,
              private alertService: JhiAlertService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.data.subscribe(data => {
      console.log(data);
      this.runtimeBundle = data['runtimeBundle'];
    });
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ task }) => {
      this.task = task.body ? task.body.entry : task;
      console.log('task resolve =>', this.task);

    });
    this.readTaskForm();
  }

  ngAfterViewInit() {

  }
  readTaskForm() {
    this.formService.readTaskForm(this.runtimeBundle , this.task.id).subscribe(
      (res: HttpResponse<FormDefinitionModel>) => {
        this.startFormDefinition = res.body;
        console.log('task form : ', this.startFormDefinition);
    });
  }
  submitStartForm() {}
}
