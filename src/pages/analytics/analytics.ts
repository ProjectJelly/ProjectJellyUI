import { Component, Input, ViewChild, ElementRef, Renderer } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';
import { JELLY_PROPERTIES } from '../../../config/jelly.properties';
import { Modal, ModalController, ModalOptions } from 'ionic-angular';
import { Chart } from 'chart.js';
import { ProjectJellyServiceProvider } from '../../providers/project-jelly-service/project-jelly-service';

@Component({
    selector: 'analytics',
    templateUrl: 'analytics.html'
})
export class AnalyticsPage {
    @ViewChild('phCanvas') phCanvas;
    @ViewChild('doCanvas') doCanvas;
    @ViewChild('salintyCanvas') salintyCanvas;
    @ViewChild('tmpCanvas') tmpCanvas;

    phChart: any;
    doChart: any;
    salinityChart:any;
    tmpChart: any;

    siteList: any;
    site: any;
    siteId: any;
    siteAnalytics: any;

    constructor(public navCtrl: NavController, private projectJellyService: ProjectJellyServiceProvider) {

    }

    ionViewCanEnter() {
        this.getSite();
    }

    loadCharts() {
        for(let i = 0; i < this.siteAnalytics.length; i++){
            if(this.siteAnalytics[i].appName == "PH"){
                this.loadPH(this.siteAnalytics[i].value, this.siteAnalytics[i].labels);
            } else if(this.siteAnalytics[i].appName == "DO"){
                this.loadDO(this.siteAnalytics[i].value, this.siteAnalytics[i].labels);
            } else if(this.siteAnalytics[i].appName == "SN"){
                this.loadSalinity(this.siteAnalytics[i].value, this.siteAnalytics[i].labels);
            } else if(this.siteAnalytics[i].appName == "TMP"){
                this.loadTemp(this.siteAnalytics[i].value, this.siteAnalytics[i].labels);
            }
        }
    }

    getSite() {
        this.projectJellyService.showLoading();
        this.projectJellyService.siteGet(localStorage.getItem('access_token'), localStorage.getItem('username'))
            .subscribe(data => {
                console.log('data', data);
                this.siteList = data['data'];
                if (this.siteList.length > 0) {
                    this.siteId = this.siteList[0].id;
                    this.getSiteById();
              
                } else {
                    this.projectJellyService.dismissLoading();
                }
            }
            );
    }

    getSiteById() {
        this.projectJellyService.showLoading();
        this.projectJellyService.siteByIdGet(localStorage.getItem('access_token'), this.siteId)
            .subscribe(data => {
                this.site = data['data'];
                console.log('this.site', this.site);
                this.getAnalytics();
                
            }
            );
    }

    getAnalytics() {
        this.projectJellyService.analyticsGet(localStorage.getItem('access_token'), this.siteId)
            .subscribe(data => {
                this.siteAnalytics = data['data'];
                console.log('this.site', this.siteAnalytics);
                this.loadCharts();
                this.projectJellyService.dismissLoading();
            }
            );
    }

    siteFilter() {
        this.getSiteById();
    }

    loadPH(arrayData: any, arrayLabels: any){
        this.phChart = new Chart(this.phCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: arrayLabels,
                datasets: [
                    {
                        label: "Trend",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: arrayData,
                        spanGaps: false,
                    }
                ]
            }
        });
    }

    loadDO(arrayData: any, arrayLabels: any){
        this.doChart = new Chart(this.doCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: arrayLabels,
                datasets: [
                    {
                        label: "Trend",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: arrayData,
                        spanGaps: false,
                    }
                ]
            }
        });
    }

    loadSalinity(arrayData: any, arrayLabels: any){
        this.salinityChart = new Chart(this.salintyCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: arrayLabels,
                datasets: [
                    {
                        label: "Trend",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: arrayData,
                        spanGaps: false,
                    }
                ]
            }
        });
    }

    loadTemp(arrayData: any, arrayLabels: any){
        this.tmpChart = new Chart(this.tmpCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: arrayLabels,
                datasets: [
                    {
                        label: "Trend",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: arrayData,
                        spanGaps: false,
                    }
                ]
            }
        });
    }
}

