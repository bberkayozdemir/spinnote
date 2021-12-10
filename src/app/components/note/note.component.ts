import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Note } from "../../Note"

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note!: Note
  @Output() onDeleteNote: EventEmitter<Note> = new EventEmitter()
  faTimes = faTimes
  faEdit = faEdit
  defaultImage: string = "/assets/dummy.png"

  constructor() { }

  ngOnInit(): void {}

  //call delete function from parent component
  onDelete(note: Note){
    this.onDeleteNote.emit(note)
  }

}
