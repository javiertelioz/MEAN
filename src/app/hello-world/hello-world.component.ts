import { Component, OnInit } from '@angular/core';

import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import {Observable} from 'rxjs/Rx';

import { AlumnoService } from './services/alumno.services';

import { Alumno } from './alumno';
import { ALUMNOS } from './mocks';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css'],
  providers: [AlumnoService, FormBuilder]
})
export class HelloWorldComponent implements OnInit {

  private alumnos: Alumno[];
  private isLoading = true;
  private model = new Alumno();

  private editing = false;
  private infoMsg = { body: "", type: "info"};

  constructor(private http: Http,
              private alumnoService: AlumnoService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getAlumnos();
    //this.alumnos = ALUMNOS;
  }

  getAlumnos() {
    this.alumnoService.getAlumnos()
      .subscribe(
        data => this.alumnos = data,
        error => console.log(error),
        () => this.isLoading = false
      );
  }

  deleteAlumno(alumno) {
    if(window.confirm("Are you sure you want to permanently delete this Alumno?")) {
      this.alumnoService.removeAlumno(alumno._id).subscribe(
        res => {
          var pos = this.alumnos.map(cat => { return alumno._id }).indexOf(alumno._id);
          this.alumnos.splice(pos, 1);
          this.sendInfoMsg("Alumno deleted successfully.", "success");
          this.getAlumnos();
        },
        error => console.log(error)
      );
    }
  }

  newAlumno(){
    let commentOperation:Observable<Alumno[]>;
    if(!this.editing){
      // Create a Alumno
      commentOperation = this.alumnoService.addAlumno(this.model)
    } else {
      // Update an existing Alumno
      commentOperation = this.alumnoService.updateAlumno(this.model)
    }

    commentOperation.subscribe(
      data => {
        //console.log(data)
        this.editing = false;
        this.model = new Alumno();
        this.sendInfoMsg("Alumno added successfully.", "success");        
        this.getAlumnos();
      },
      error => {
        console.log(error)
      },
      () => this.isLoading = false);    
  }

  enableEditing(alumno) {
    this.editing = true;
    this.model = alumno;
  }

  cancelEditing() {
    this.editing = false;
    this.model = new Alumno();
    this.sendInfoMsg("item editing cancelled.", "warning");
    // reload the cats to reset the editing
    this.getAlumnos();
  }

  /*getCats() {
    this.dataService.getCats().subscribe(
      data => this.cats = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addCat() {
    this.dataService.addCat(this.addCatForm.value).subscribe(
      res => {
        var newCat = res.json();
        this.cats.push(newCat);
        this.addCatForm.reset();
        this.sendInfoMsg("item added successfully.", "success");
      },
      error => console.log(error)
    );
  }

  cancelEditing() {
    this.isEditing = false;
    this.cat = {};
    this.sendInfoMsg("item editing cancelled.", "warning");
    // reload the cats to reset the editing
    this.getCats();
  }

  editCat(cat) {
    this.dataService.editCat(cat).subscribe(
      res => {
        this.isEditing = false;
        this.cat = cat;
        this.sendInfoMsg("item edited successfully.", "success");
      },
      error => console.log(error)
    );
  }

  deleteAlumno(cat) {
    if(window.confirm("Are you sure you want to permanently delete this item?")) {
      this.dataService.deleteCat(cat).subscribe(
        res => {
          var pos = this.cats.map(cat => { return cat._id }).indexOf(cat._id);
          this.cats.splice(pos, 1);
          this.sendInfoMsg("item deleted successfully.", "success");
        },
        error => console.log(error)
      );
    }
  }
  */
  sendInfoMsg(body, type, time = 3000) {
    this.infoMsg.body = body;
    this.infoMsg.type = type;
    window.setTimeout(() => this.infoMsg.body = "", time);
  }

  // Alumnos

  addFalta(alumno) {
    alumno.faltas++
  }

  removeFalta(alumno) {
    alumno.faltas--
  }

  getFaltas(alumno) {
    let faltas;
    if(alumno.faltas >= 4) {
      return faltas = `${alumno.name} esta reprobado`;
    } else {
      return;
    }
  }
}