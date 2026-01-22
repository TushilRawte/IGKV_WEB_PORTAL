import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-des-publication',
  standalone: false,
  templateUrl: './des-publication.component.html',
  styleUrls: ['./des-publication.component.scss']
})
export class DesPublicationComponent {
  publicationType: any;
  publicationList_Data: any;
  loding:boolean=true;
  errorImage:any=environment.PhotoUrl + 'no_image_available.jpg';
  bannerImg:string=environment.PhotoUrl + 'research-publication-banner.jpg';
  constructor(private ds:DataService,private activateroute:ActivatedRoute){}


  
  ngOnInit(): void {
    this.activateroute.paramMap.subscribe(result=>{
      this.publicationType=result.get('id')
      this. getdata();
     })
  }

  routetoprofile(empid: any) {
    // this.router.navigate(['about/employeeProfile', empid]);
  }

  getdata(){
    const IGKV_Publication_ID = '';
    const office_id = 101;
    this.ds.postapi(`publication/publicationList/${this.publicationType},${IGKV_Publication_ID},${office_id}`,null).subscribe((result:any)=>{
      if(result){
        this.publicationList_Data = result;
      }else{
        this.publicationList_Data = [];
      }
      this.loding=false
    },(error)=>{
      console.error('Error fetching publication', error);
    })
  }

  OnErrorImage(event:any){
    event.target.src=this.errorImage;
  }
}
