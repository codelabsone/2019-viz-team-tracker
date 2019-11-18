import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DraggingService {

  dragging: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
}
