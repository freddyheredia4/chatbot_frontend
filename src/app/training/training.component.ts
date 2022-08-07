import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Intent } from './intent';
import { IntentService } from './intent.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html'
})
export class TrainingComponent implements OnInit {

  constructor(
    private intentService: IntentService,
    private activatedRoute: ActivatedRoute
  ) { }

  currentEntity: Intent = {
    id: 0,
    tag: "",
    patterns: [],
    responses: [],
    context: []
  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(
      (param:ParamMap) => {
        if (param.get("id")){
          this.findById(parseInt(param.get("id")!))
        }
      }
    )

  }

  findById(id: number):void {
    this.intentService.findById(id).subscribe(
      (response)=> this.currentEntity = response
    )
  }

  save():void {
    if (this.currentEntity.id>0){
      this.intentService.replace(this.currentEntity).subscribe(
        (response) => {
          this.currentEntity = {
            id: 0,
            tag: "",
            patterns: [],
            responses: [],
            context: []
          }
        }
      )
    }
    if (this.currentEntity.id===0){
      this.intentService.save(this.currentEntity).subscribe(
        (response) => {
          this.currentEntity = {
            id: 0,
            tag: "",
            patterns: [],
            responses: [],
            context: []
          }
        }
      )
    }

  }

  removePattern(pattern: string):void {
    this.currentEntity.patterns =
    this.currentEntity.patterns.filter((term) => !term.match(pattern))
  }

  removeReponse(response: string):void {
    this.currentEntity.responses =
    this.currentEntity.responses.filter((term) => !term.match(response))
  }

  removeContext(contex: string):void {
    this.currentEntity.context =
    this.currentEntity.context.filter((term) => !term.match(contex))
  }

  train():void {
    this.intentService.train().subscribe(
      (response) => console.log(response)
    )
  }

}
