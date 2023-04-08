import { MotionSensor, VideoRecorder, SurveillanceController } from "../core/surveillanceController";

describe("The Surveillance Controller", ()=>{
    it("asks the recorder to stop when the sensor detects no motion", ()=>{
        const motionSensor = new StubSensorNoDetectingMotion();
        const recorder = new SpyRecorder();
        const controller = new SurveillanceController(motionSensor, recorder);
        
        controller.recordMotion();

        expect(recorder.stopRecordingCalled).toBeTruthy();
    });

    it("asks the recorder to start when the sensor detects motion", ()=>{
        const motionSensor = new StubSensorDetectingMotion();
        const recorder = new SpyRecorder();
        const controller = new SurveillanceController(motionSensor, recorder);
        
        controller.recordMotion();

        expect(recorder.startRecordingCalled).toBeTruthy();
    });
});

//Creación de objeto Fake que simulan (o hace de doble) del sensor de movimiento
class StubSensorDetectingMotion implements MotionSensor{
    isDetectingMotion(): boolean {
        return true;
    }
}

class StubSensorNoDetectingMotion implements MotionSensor{
    isDetectingMotion(): boolean {
        return false;
    }
}

//Creación de objeto Fake que simula (o hace de doble) de la cámara de grabación
class SpyRecorder implements VideoRecorder{
    startRecordingCalled = false;
    stopRecordingCalled = false;
    startRecording(): void {
        this.startRecordingCalled = true;
        console.log("START recording..");
    }
    stopRecording(): void {
        this.stopRecordingCalled = true;
        console.log("STOP recording..");
    }
}