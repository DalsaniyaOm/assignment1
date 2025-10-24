import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { Aqhi, AQHIRecord } from 'src/app/services/aqhi';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message';
@Component({
  selector: 'app-air-quality',
  standalone: true,
  imports: [CommonModule, IonicModule, HttpClientModule],
  templateUrl: './air-quality.component.html',
  styleUrls: ['./air-quality.component.scss']
})
export class AirQualityComponent implements OnInit {
  aqData: AQHIRecord[] = [];
  loading: boolean = true;
  error: string | null = null;
  yearKeys: string[] = [];
  message: string = '';

  constructor(private aqhiService: Aqhi, private router: Router, private msgService: MessageService) { }

  ngOnInit() {
    this.aqhiService.getAllRecords().subscribe({
      next: data => {
        this.aqData = data;

        if (this.aqData.length > 0) {
          this.yearKeys = Object.keys(this.aqData[0]).filter(k => /^\d{4}$/.test(k));
        }

        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load AQHI data';
        this.loading = false;
      }
    });
    this.msgService.currentMessage.subscribe(msg => {
      this.message = msg;
      if (msg) {
        setTimeout(() => this.message = '', 5000);
      }
    });
  }

  goToDetails(record: AQHIRecord) {
    this.router.navigate(['/details', record.region], { state: { record } });
  }
}
