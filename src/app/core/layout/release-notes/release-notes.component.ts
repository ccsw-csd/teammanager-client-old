import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReleaseNoteService } from '../../services/releasenote.service';
import { NoteDto } from './NoteDto';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss']
})
export class ReleaseNotesComponent implements OnInit {
  
  public notes : NoteDto[] = [];

  constructor(
    public dialogRef: MatDialogRef<ReleaseNotesComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    let oldVersion = null;
    let oldNote : NoteDto | undefined;

    for (let i =0; i< this.data.notes.length; i++) {

      let note = this.data.notes[i];
      let version = note.version;

      if (version != oldVersion) {
        oldVersion = version;
        oldNote = new NoteDto();
        oldNote.text = version;
        oldNote.notes = [];
        this.notes.push(oldNote);
      }

      let noteDto = new NoteDto();
      noteDto.text = note.text;
      if (oldNote != undefined)
        oldNote.notes?.push(noteDto);
    }
  }

  close() : void {
    this.dialogRef.close();
  }

}
