import { Component, OnInit } from '@angular/core';
import { ComicService } from 'src/app/services/comic.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import { Comic } from './../../interfaces/comic';
import { ComicJSON } from './../../interfaces/comicJSON';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  comic_info: Comic = {
    comic_title: '',
    comic_number: 0,
    comic_day: 0,
    comic_month: 0,
    comic_year: 0,
    comic_alt: '',
    comic_transcript: '',
    comic_image_url: '',
    comic_view: 0,
  };

  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faSearch = faSearch;
  faRandom = faRandom;

  constructor(
    private comicService: ComicService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['comic']) {
        this.comicService
          .get_comic(parseInt(params['comic']))
          .subscribe((comic) => {
            this.comicUpdate(comic);
            this.randomColor();
          });
      } else {
        this.comicService.get_latest_comic().subscribe((comic) => {
          this.router.navigate(['/'], {
            queryParams: { comic: comic.num.toString() },
          });
        });
      }
    });
  }

  ngAfterViewChecked(): void {
    this.parseTranscript();
  }

  comicUpdate(newComic: ComicJSON): void {
    this.comic_info.comic_title = newComic.title;
    this.comic_info.comic_number = newComic.num;
    this.comic_info.comic_day = parseInt(newComic.day);
    this.comic_info.comic_month = parseInt(newComic.month);
    this.comic_info.comic_year = parseInt(newComic.year);
    this.comic_info.comic_alt = newComic.alt;
    this.comic_info.comic_transcript = newComic.transcript;
    this.comic_info.comic_image_url = newComic.img;

    this.comicService.increment_view(newComic.num).subscribe(() => {
      this.comicService.get_view_history(newComic.num).subscribe((history) => {
        console.log(history);
        this.comic_info.comic_view = parseInt(history);
      });
    });
  }

  randomColor(): void {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    document.getElementById('title-text')!.style.color = '#' + color;
  }

  parseTranscript(): void {
    if (this.comic_info.comic_transcript) {
      let regex_narrator = /\[\[(.*)\]\]/g;
      let newString_narrtor =
        '<span style="font-size: 1.2em; font-style: italic; font-weight: bold;">$1</span>';
      let newTranscript = this.comic_info.comic_transcript.replace(
        regex_narrator,
        newString_narrtor
      );

      let regex_sound = /<<(.*)>>/g;
      let newString_sound = '<span style="font-size: 1.1em;" >*$1*</span>';
      newTranscript = newTranscript.replace(regex_sound, newString_sound);

      let regex_title = /\{\{(.*)\}\}$/g;
      let newString_title = '';
      newTranscript = newTranscript.replace(regex_title, newString_title);

      let regex_description = /\{\{(.*)\}\}/g;
      let newString_regex_description =
        '<span style="font-weight: bold;">($1)</span>';
      newTranscript = newTranscript.replace(
        regex_description,
        newString_regex_description
      );

      document.getElementById('transcript-text')!.innerHTML = newTranscript;
    }
  }

  getComic(): Comic {
    return this.comic_info;
  }

  getPreviousComic(): void {
    this.comicService
      .get_comic(this.comic_info.comic_number - 1)
      .subscribe((comic) => {
        this.comicUpdate(comic);
        this.randomColor();
        this.parseTranscript();
      });
  }

  getNextComic(): void {
    this.comicService
      .get_comic(this.comic_info.comic_number + 1)
      .subscribe((comic) => {
        this.comicUpdate(comic);
        this.randomColor();
        this.parseTranscript();
      });
  }

  randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getRandomComic(): void {
    let total_comic = 0;
    this.comicService.get_latest_comic().subscribe((comic) => {
      total_comic = comic.num;
      let random = this.randomIntFromInterval(1, total_comic);
      this.comicService.get_comic(random).subscribe((comic) => {
        this.comicUpdate(comic);
        this.randomColor();
        this.parseTranscript();
      });
    });
  }
}
