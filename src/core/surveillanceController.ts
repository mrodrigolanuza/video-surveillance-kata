  export interface MotionSensor {
    isDetectingMotion(): boolean;
  }
  
  export interface VideoRecorder {
    startRecording(): void;
    stopRecording(): void;
  }
  
  export class SurveillanceController {
      constructor(private sensor:MotionSensor, private recorder:VideoRecorder){}
  
      recordMotion(numberOfSeconds:number = 1){
        for(let seconds = 0; seconds < numberOfSeconds; seconds++){
            this.tryToRecordMotion();
            this.waitOneSecond();
        }
        
      }

      private tryToRecordMotion() {
          try {
              this.sensor.isDetectingMotion() ? this.recorder.startRecording()
                  : this.recorder.stopRecording();
          }
          catch (ex) {
              this.recorder.stopRecording();
          }
      }

      private waitOneSecond(){
        const aSecond = 1000;
        let startTime = new Date().getTime();
        let endTime = startTime + aSecond;

        while(startTime < endTime){
            startTime = new Date().getTime();
        }
      }
  }