import { Component } from '@angular/core';
import { SQLite } from 'ionic-native';
import { NavController, Platform } from 'ionic-angular';

export interface Diary {
  id: number;
  name: string;
  title: string;
  date: string;
  content: string;
}

@Component({
  selector: 'page-diary-edit',
  templateUrl: 'diary-edit.html'
})
export class DiaryEditPage {
  title = 'Details of My Diary';
  diary: Diary;
  /*
  diary: Diary = {
    id: 1,
    name: 'Nobody',
    title: 'One Day In Mt. Fuji',
    date : '2016-12-26',
    content: 'La La Land !'
  };
  */

  public database: SQLite;
  // public people: Array<Object>;

  constructor(private navController: NavController, private platform: Platform) {
    this.platform.ready().then(() => {
      this.database = new SQLite();
      this.database.openDatabase({name: 'MyDiary.db', location: 'default'}).then(() => {
        this.refresh();
      }, (error) => {
        console.log('ERROR: ', error);
      });
    });
  }

  public save() {
    this.database.executeSql('UPDATE diary SET name = ? AND title = ? AND content = ? WHERE date = ? ', 
    [this.diary.id, this.diary.name, this.diary.title, this.diary.content, this.diary.date]).then((data) => {        
      console.log('UPDATE: ' + JSON.stringify(data));
    }, (error) => {
      console.log('ERROR: ' + JSON.stringify(error.err));
    });
  }

  public delete() {
    this.database.executeSql('DELETE FROM diary WHERE date = ?', [this.diary.date]).then((data) => {
      console.log('DELETE: ' + JSON.stringify(data));
    }, (error) => {
      console.log('ERROR: ' + JSON.stringify(error.err));
    });
  }

  public add() {
    this.database.executeSql('INSERT INTO diary (name, title, date, content) VALUES (?,?,?,?,?)', 
    [this.diary.id, this.diary.name, this.diary.title, this.diary.date, this.diary.content]).then((data) => {
      console.log('INSERTED: ' + JSON.stringify(data));
    }, (error) => {
      console.log('ERROR: ' + JSON.stringify(error.err));
    });
  }

  public refresh() {
    this.database.executeSql('SELECT * FROM diary WHERE date = ? ', [ '2016-01-04' ]).then((data) => {
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.diary.name    = data.rows.items(i).id;
          this.diary.title   = data.rows.items(i).title;
          this.diary.date    = data.rows.items(i).date;
          this.diary.content = data.rows.items(i).content;
          console.log('SELECT: ' + JSON.stringify(data));
        }
      }
    }, (error) => {
      console.log('ERROR: ' + JSON.stringify(error));
    });
  }
}
