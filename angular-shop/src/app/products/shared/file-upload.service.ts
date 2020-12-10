import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../../shared/helper.service';

@Injectable()
export class FileUploadService {
  public task$: AngularFireUploadTask;

  // Progress monitoring
  public percentage$: Observable<number>;

  public snapshot: Observable<any>;

  // Download URL
  public downloadURL: Observable<string>;

  constructor(public storage: AngularFireStorage,private http: HttpClient, private helperService : HelperService) {}

  public startUpload(data) {
      // The File object
      const file = data.files.item(0);

      // Client-side validation example
      if (file.type.split('/')[0] !== 'image') {
        console.error('unsupported file type :( ');
        throw new Error('upload failed, unsupported file type');
      }

      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      return this.http.post(this.helperService.getUrl("image/upload/product"), formData)









      // const req = new HttpRequest('POST', this.helperService.getUrl("image/upload/product"), formData, {
      //   reportProgress: true,
      // });


      // return this.http.request(req).subscribe(event => {
      //   // Via this API, you get access to the raw event stream.
      //   // Look for upload progress events.
      //   if (event.type === HttpEventType.UploadProgress) {
      //     // This is an upload progress event. Compute and show the % done:
      //     const percentDone = Math.round(100 * event.loaded / event.total);
      //     console.log(`File is ${percentDone}% uploaded.`);
      //   } else if (event instanceof HttpResponse) {
      //     console.log('File is completely uploaded!');
      //   }
      // });

      // // The storage path
      // const path = `product-images/${new Date().getTime()}_${file}`;

      // // The main task
      // this.task$ = this.storage.upload(path, file);

      // // the percentage
      // this.percentage$ = this.task$.percentageChanges();

      // return this.task$;
  }

  public deleteFile(files: string[]) {
    if (files) {
      return files.map((filePath) => {
        return this.storage.ref(filePath).delete();
      });
    }
  }

  // Determines if the upload task is active
  public isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }
}
