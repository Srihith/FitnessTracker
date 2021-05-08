import { Component, OnInit } from '@angular/core';
import { HealthKit,HealthKitOptions } from '@ionic-native/health-kit/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(public healthKit: HealthKit, private plt: Platform) {
    this.plt.ready().then(() => {
      this.healthKit.available().then(available => {
        if (available) {
          // Request all permissions up front if you like to
          var options: HealthKitOptions = {
            readTypes: ['HKQuantityTypeIdentifierStepCount','HKQuantityTypeIdentifierActiveEnergyBurned',
            'HKQuantityTypeIdentifierAppleExerciseTime','HKQuantityTypeIdentifierBasalEnergyBurned'],
          }
          this.healthKit.requestAuthorization(options).then(_ => {
            this.loadHealthData();
          })
        }
      });
    });
  }

  x = setInterval( ()=>{this.loadHealthData()},300000);

  loadHealthData() {
    var stepOptions = {
      startDate: new Date(new Date().setHours(0,0,0,0)),
      endDate: new Date(new Date()),
      sampleType: 'HKQuantityTypeIdentifierStepCount',
      unit: 'count',
      aggregation: 'day'
    }

    var activeOptions = {
      startDate: new Date(new Date().setHours(0,0,0,0)),
      endDate: new Date(new Date()),
      sampleType: 'HKQuantityTypeIdentifierActiveEnergyBurned',
      unit: 'kcal',
      aggregation: 'day'
    }

    var restingOptions = {
      startDate: new Date(new Date().setHours(0,0,0,0)),
      endDate: new Date(new Date()),
      sampleType: 'HKQuantityTypeIdentifierBasalEnergyBurned',
      unit: 'kcal',
      aggregation: 'day'
    }

    var exericeOptions = {
      startDate: new Date(new Date().setHours(0,0,0,0)),
      endDate: new Date(new Date()),
      sampleType: 'HKQuantityTypeIdentifierAppleExerciseTime',
      unit: 'min',
      aggregation: 'day'
    }

    var distanceOptions = {
      startDate: new Date(new Date().setHours(0,0,0,0)),
      endDate: new Date(new Date()),
      sampleType: 'HKQuantityTypeIdentifierDistanceWalkingRunning',
      unit: 'mi',
      aggregation: 'day'
    }

    this.healthKit.querySampleTypeAggregated(stepOptions).then(data => {
      let stepSum = data.reduce((a, b) => {
        return a + b.quantity
      }, 0);
      this.stepcount = Math.round(stepSum);
    }, err => {
      console.log('No steps: ', err);
    });

    this.healthKit.querySampleTypeAggregated(activeOptions).then(data => {
      let cal = data.reduce((a, b) => {
        return a + b.quantity
      }, 0);
      this.calcount = Math.round(cal);
    }, err => {
      console.log('No cals: ', err);
    });

    this.healthKit.querySampleTypeAggregated(restingOptions).then(data => {
      let cal = data.reduce((a, b) => {
        return a + b.quantity
      }, 0);
      this.restcount = Math.round(cal);
    }, err => {
      console.log('No cals: ', err);
    });

    this.healthKit.querySampleTypeAggregated(exericeOptions).then(data => {
      let excerise = data.reduce((a, b) => {
        return a + b.quantity
      }, 0);
      this.exericecount = Math.round(excerise);
    }, err => {
      console.log('No cals: ', err);
    });

    this.healthKit.querySampleTypeAggregated(distanceOptions).then(data => {
      let dist = data.reduce((a, b) => {
        return a + b.quantity
      }, 0);
      this.distancecount = Math.round((dist + Number.EPSILON) * 100) / 100
    }, err => {
      console.log('No cals: ', err);
    });

  }
  
  stepcount = -1;
  calcount = 0;
  restcount = 0;
  exericecount = 0;
  distancecount = 0;
  todayDate = new Date().toLocaleDateString();


  ngOnInit() {
    
  }

}