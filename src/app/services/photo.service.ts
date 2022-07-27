import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private defaultUrl = `${environment.apiUrl}/photo`;

  constructor(private http: HttpClient) {}

  getPhotoById(id: number) {
    const url = `${this.defaultUrl}/${id}`;
    return this.http.get(url, { observe: 'response', responseType: 'blob' });
  }

  uploadPhoto(file: File) {
    const fd = new FormData();
    fd.append('photo', file, file.name);
    return this.http.post(this.defaultUrl, fd);
  }
}
