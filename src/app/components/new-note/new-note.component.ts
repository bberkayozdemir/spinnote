import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs"
import { NoteService } from "../../services/note.service"

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit {

  showAlert: boolean = false
  content: string = ""
  priority: string = ""
  image: any = ""
  subscription!: Subscription
  error: string = ""

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {}

  //on form submit
  async onSubmit()
  {
    this.error = ""
    if (!this.content){ //note content input form validation
      this.error ="Not bilgisi zorunludur"
      return;
    }

    //image file input form validation
    var image = this.image === "" ? "" : await this.compressImage(this.image, 30, 30)
    var priority: string = this.priority

    //priority input form validation
    if (priority !== "")
      if (isNaN(priority as any))
        priority = ""
      else if (parseInt(priority) > 5 || parseInt(priority) < 0)
      {
        this.error = "Öncelik derecesi 5 den büyük 0 dan küçük olamaz"
        return;
      }

    //note interface
    const newNote = {
      content: this.content,
      priority: priority === "" ? 6 : parseInt(this.priority),
      image: image + "",
    }

    //insert new note to db
    this.noteService.addNote(newNote).subscribe(() => {
      this.showAlert = true
      this.content = ""
      this.image = ""
      this.priority = ""
    })
  }

  //on image select
  async fileChangeEvent(fileInput: any)
  {
    this.image = await this.getBase64(fileInput.target.files[0])
  }

  //file to base64 encode
  getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    });
  }

  //make image 30x30
  compressImage(src : any, newX : any, newY: any) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        const elem = document.createElement('canvas')
        elem.width = newX
        elem.height = newY
        const ctx = elem.getContext('2d')
        ctx!.drawImage(img, 0, 0, newX, newY)
        const data = ctx!.canvas.toDataURL()
        resolve(data)
      }
      img.onerror = error => reject(error)
    })
  }

}
