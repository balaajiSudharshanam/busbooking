import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IsearchBus, Search } from '../../Models/model';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'] // ✅ fixed typo
})
export class SearchResultComponent implements OnInit {
  searchData: IsearchBus[] = [];
  searchObj: Search = new Search();
 router=inject(Router);
  // Inject services
  private activatedRoute = inject(ActivatedRoute);
  private searchService = inject(SearchService);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      this.searchObj.fromLocationId = res.fromId;
      this.searchObj.toLocationId = res.toId;
      this.searchObj.date = res.date;
      this.getSearchResult();
    });
  }

  getSearchResult(): void {
    this.searchService
      .searchBus(
        this.searchObj.fromLocationId,
        this.searchObj.toLocationId,
        this.searchObj.date
      )
      .subscribe((res: any)=>{
        this.searchData=res;
        console.log(this.searchData);
      } )
  }

  formatTime(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleTimeString();
  }

  getDuration(dep: string, arr: string): string {
    const d = new Date(dep);
    const a = new Date(arr);
    const diff = Math.abs(a.getTime() - d.getTime()) / 1000;
    const hrs = Math.floor(diff / 3600);
    const mins = Math.floor((diff % 3600) / 60);
    return `${hrs}h ${mins}m`;
  }

  selectSeats(){
    console.log("clicked");
   this.router.navigate(['search'])
  }
}
