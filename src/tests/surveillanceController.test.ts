import { MotionSensor, VideoRecorder, SurveillanceController } from "../core/surveillanceController";

describe("The Surveillance Controller", ()=>{
    it("asks the recorder to stop when the sensor detects no motion", ()=>{
        let called = false;
        const hasBeenCalled = ()=>{ called = true; }
        const motionSensor = new FakeSensor();
        const recorder = new FakeRecorder();
        recorder.stopRecording = hasBeenCalled; //Spy para comprobar que el controlador internamente llama al método StopRecording (Monkey Patching)
        const controller = new SurveillanceController(motionSensor, recorder);
        
        controller.recordMotion();

        expect(called).toBeTruthy();
    });
});

//Creación de objeto Fake que simulan (o hace de doble) del sensor de movimiento
export class FakeSensor implements MotionSensor{
    isDetectingMotion(): boolean {
        return false;
    }
}

//Creación de objeto Fake que simula (o hace de doble) de la cámara de grabación
export class FakeRecorder implements VideoRecorder{
    startRecording(): void {
        console.log("START recording..");
    }
    stopRecording(): void {
        console.log("STOP recording..");
    }
}