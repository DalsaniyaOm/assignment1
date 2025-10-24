import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel,IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonButtons, IonButton,IonIcon, CommonModule, FormsModule]
})
export class DetailsPage implements OnInit {
  record: any;
  region: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private msgService: MessageService) {
    const nav = this.router.getCurrentNavigation();
    this.record = nav?.extras?.state?.['record'];
  }

  ngOnInit() {
    this.region = this.route.snapshot.paramMap.get('region');
  }

  goBack(){
    const region = this.record.region;
    this.router.navigate(['/tabs/tab2']);
    this.msgService.setMessage(`YOU JUST SAW ${region.toUpperCase()} AQHI DATA OF A DECADE`);

  }
}
