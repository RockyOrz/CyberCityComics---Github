import { Component, OnInit, Input } from '@angular/core';
import { Comic } from './../../../interfaces/comic';
import { ComicService } from './../../../services/comic.service';

@Component({
  selector: 'app-comic-display',
  templateUrl: './comic-display.component.html',
  styleUrls: ['./comic-display.component.css'],
})
export class ComicDisplayComponent implements OnInit {
  @Input() comic_info!: Comic;

  constructor() {}

  ngOnInit(): void {}

}
