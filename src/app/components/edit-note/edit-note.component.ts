import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from "rxjs"
import { NoteService } from "../../services/note.service"

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {

  id!: number
  showAlert: boolean = false
  content: string = ""
  priority: string = ""
  image: any = ""
  subscription!: Subscription
  defaultImage: string = ""
  error: string = ""

  constructor(private noteService: NoteService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    //get id from url
    const id = this.route.snapshot.paramMap.get('id');
    if (isNaN(id as any)) {
      alert("id sadece numerik olmalı")
      this.location.back()
      return;
    }

    this.id = parseInt(id!)

    //load note by id
    this.noteService.getNote(this.id).subscribe((n) => {
      this.content = n.content
      this.priority = n.priority === -1 ? "" : n.priority!.toString()
      this.defaultImage = n.image!
    })
  }

  //remove pre uploaded image
  removeImage()
  {
    this.image = ""
    this.defaultImage = ""
  }

  //on form submit
  async onSubmit()
  {
    this.error = ""
    if (!this.content){//note content input form validation
      this.error ="Not bilgisi zorunludur"
      return;
    }

    //image file input form validation
    if (this.image !== "")
      var image: any = this.image === "" ? "" : await this.compressImage(this.image, 30, 30)
    else
      var image: any = this.defaultImage //if no image select and pre uploaded image is not removed keep pre uploaded image

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
    const editNote = {
      id:this.id,
      content: this.content,
      priority: priority === "" ? 6 : parseInt(this.priority),
      image: image + "",
    }

    //insert new note to db
    this.noteService.editNote(editNote).subscribe(() => {
      this.showAlert = true
    })
  }

  //on image select
  async fileChangeEvent(fileInput: any)
  {
    this.removeImage()
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
