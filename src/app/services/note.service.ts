import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Note } from "../Note"

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiUrl = 'http://localhost:5000/notes'

  constructor(private http: HttpClient) { }

  //get notes from db with options of sort and limit
  getNotes(sortby: string, limit: number, q: string) : Observable<Note[]> {
    var sort = ""
    var search = ""
    if (sortby === "priority-high")
      sort = "&_sort=priority&_order=desc"
    else if (sortby === "priority-low")
      sort = "&_sort=priority"
    else if (sortby === "new")
      sort = "&_sort=id&_order=desc"
    else if (sortby === "old")
      sort = "&_sort=id&?_order=asc"
    else
      sort = "&_sort=id&_order=desc"

    if (q !== "")
      search = `&content_like=${q}`
      
    const url = `${this.apiUrl}?&_limit=${limit}${sort}${search}`

    console.log(url)

    return this.http.get<Note[]>(url)
  }
  
  //insert new note
  addNote(note: Note) : Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note, httpOptions)
  }

  //get note by id
  getNote(id: number) : Observable<Note> {
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Note>(url, httpOptions)
  }

  //edit note by id
  editNote(note: Note) : Observable<Note> {
    const url = `${this.apiUrl}/${note.id}`
    return this.http.put<Note>(url, note, httpOptions)
  }

  //delete note by id
  deleteNote(id: number) : Observable<Note> {
    const url = `${this.apiUrl}/${id}`
    return this.http.delete<Note>(url)
  }
}
