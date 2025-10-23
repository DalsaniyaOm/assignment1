import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface AQHIRecord {
  region: string;
  [key: string]: any;
  aqhi: number;
  lastUpdated: string;
}

@Injectable({
  providedIn: 'root'
})
export class Aqhi {
  private dataUrl = 'assets/output.json';

  constructor(private http: HttpClient) { }

  getAllRecords(): Observable<AQHIRecord[]> {
    return this.http.get<{ metadata: any; data: AQHIRecord[] }>(this.dataUrl).pipe(
      map(res => res.data)
    );
  }

  getOntario(): Observable<AQHIRecord | undefined> {
    return this.http.get<{ metadata: any; data: AQHIRecord[] }>(this.dataUrl).pipe(
      map(res => res.data.find(r => r.region === 'ONTARIO'))
    );
  }

}
