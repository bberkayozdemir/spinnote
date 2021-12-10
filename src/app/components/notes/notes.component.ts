import { Component, OnInit, HostListener  } from '@angular/core';
import { NoteService } from "../../services/note.service"
import { Note } from "../../Note"

const notelimit = 10

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: Note[] = []
  sort: string = ""
  loaded: boolean = false
  limit: number = notelimit
  noMoreNotes: boolean = false
  search: string = ""
  notifications: number[] = []
  noteToBeDeleted!: number;
  modalOpen: boolean = false

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.list("") //list notes with no filters
  }

  //on delete click open modal and set id of note to be deleted
  deleteNote(note: Note){
    this.noteToBeDeleted = note.id!
    this.modalOpen = true
  }

  //on user accepts deletion delete note 
  deleteNoteOk()
  {
    this.noteService.deleteNote(this.noteToBeDeleted).subscribe(() => {
      this.notes = this.notes.filter(n => n.id !== this.noteToBeDeleted)
      var id = this.noteToBeDeleted
      //create notification for delete
      this.notifications.push(this.noteToBeDeleted!)
      setTimeout(() => { //delete notification after 2000ms
        this.notifications = this.notifications.filter(n => n !== id)
      }, 2000)
      this.closeModal()
    })
  }

  //close modal and reset delete id
  closeModal()
  {
    this.noteToBeDeleted = undefined!
    this.modalOpen = false
  }

  //list notes
  list(sort: string)
  {
    this.noteService.getNotes(sort, this.limit, this.search).subscribe((notes) => {
      if (this.notes.length === notes.length)
        this.noMoreNotes = true
      this.notes = notes
      this.loaded = true
    })
  }

  //on sort value change re list notes
  onSortChange()
  {
    this.limit = notelimit
    this.noMoreNotes = false
    this.notes = []
    this.search = ""
    this.loaded = false
    this.list(this.sort)
  }

  //load more notes
  loadmore()
  {
    if (this.noMoreNotes)
      return;

    this.limit+=notelimit
    this.list(this.sort)
  }

  //scroll to bottom check
  @HostListener('window:scroll', ['$event']) onScroll(e: Event): void {
    if (window.innerHeight + window.pageYOffset >=  document.body.offsetHeight)
      this.loadmore()
  }

  //on input search
  onSearch()
  {
    //reset terms
    this.limit = notelimit
    this.noMoreNotes = false
    this.loaded = false
    this.notes = []

    //list notes
    this.list("")
  }

}
