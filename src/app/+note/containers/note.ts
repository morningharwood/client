import {
  Component,
  OnInit,
} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { GetPost } from '../actions/index';


export interface INotes {
  id?: string,
  title: string,
  description: string,
  published: boolean,
}

@Component({
  selector: 'NoteContainer',
  templateUrl: './note.html',
  styleUrls: [ './note.scss' ],
})
export class NoteContainer implements OnInit {
  // private notesCollectionRef: AngularFirestoreCollection<INotes>;
  // public notes$: Observable<INotes[]>;
  private notesForm: FormGroup;

  constructor(private _afs: AngularFirestore, private fb: FormBuilder, private store:Store<any>) {
    // this.notesCollectionRef = this._afs.collection<INotes>('notes');

  }

  public ngOnInit(): void {
    this.store.subscribe(console.log);
    // this.notes$ = this.notesCollectionRef.snapshotChanges()
    //                   .map(actions => {
    //                     return actions.map(action => {
    //                       const data = action.payload.doc.data() as INotes;
    //                       const id = action.payload.doc.id;
    //                       return {
    //                         id,
    //                         ...data,
    //                       };
    //                     });
    //                   });

    this.notesForm = this.fb.group({
      title:  ['', Validators.required],
      description: ['', Validators.required],
      publish: ''
    });
  }


  public update(note: INotes) {
    // this.notesCollectionRef
    //     .doc(note.id)
    //     .update({
    //       published: !note.published,
    //     })
    //     .then(console.log);
  }


  public remove(note: INotes) {
    // this.notesCollectionRef
    //     .doc(note.id)
    //     .delete()
    //     .then(console.log);
  }

  public onSubmit(form: FormGroup) {
    this.store.dispatch(new GetPost('notes'));
    // this.notesCollectionRef.add(form.value).then(console.log);
  }
}
