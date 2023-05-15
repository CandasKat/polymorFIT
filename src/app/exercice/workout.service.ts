import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Exercice} from "../model/exercice.model";

@Injectable({providedIn: 'root'})
export class WorkoutService{
  private _exercisePlaylist = new BehaviorSubject<Exercice[]>([]);
  exercisePlaylist$ = this._exercisePlaylist.asObservable();
  constructor(private http: HttpClient) {
  }

  getExercicesDB(){
    const url = 'https://exercisedb.p.rapidapi.com/exercises'
    return this.http.get(url, {headers: {
        'X-RapidAPI-Key': '0b6df8825fmshf3d59c26eacae31p1c8113jsn3da9280aca87',
        'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
      }})
  }

  getExercicesVideos(name:string){
    const url = "https://youtube-search-and-download.p.rapidapi.com/search"
    return this.http.get(url, {headers: {
        'X-RapidAPI-Key': '0b6df8825fmshf3d59c26eacae31p1c8113jsn3da9280aca87',
        'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    },
      params: {
      'query': name,
      'type': 'v',
      'sort': 'r'
      }})
  }

  getExercicesbyType(difficulty: string | undefined, type: string){
    const url = "https://api.api-ninjas.com/v1/exercises"
    // @ts-ignore
    return this.http.get(url, {headers: {'X-Api-Key': '6UU8hcZxFXHN4AVnSsOUHg==mTo54yTCui6EhkCa'}, params:{'difficulty': difficulty, 'type': type}})
  }

  readExerciceDB() {
    return this.http.get('../../assets/exercicedb/data.json')
  }


  setExercisePlaylist(exercises: Exercice[]) {
    this._exercisePlaylist.next(exercises);
  }

}
