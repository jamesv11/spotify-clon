import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit {

  tracksTrending: Array<TrackModel> = []
  tracksRandom: Array<TrackModel> = [];

  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
    this.loadData();
  }


  loadData(): void {
    this.trackService.getAllTracks()
      .subscribe(
        {
          next: (response:TrackModel[]) => {
            this.tracksTrending = response
          },
          error : (err:any) => {
            console.log(err);
            
          }
        },
      );

    this.trackService.getAllRandom$().subscribe((response: TrackModel[]) => {
      this.tracksRandom = response;
    })
  }


}
