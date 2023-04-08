import { MotionSensor, VideoRecorder, SurveillanceController } from "../core/surveillanceController";

describe("The Surveillance Controller", ()=>{
    let motionSensor : MotionSensor;
    let recorder : VideoRecorder;
    let controller : SurveillanceController;
    beforeEach(()=>{
        motionSensor = new FakeMotionSensor();
        recorder = new FakeRecorder();
        controller = new SurveillanceController(motionSensor, recorder);
    });
    it("asks the recorder to stop when the sensor detects no motion", ()=>{
        
        const spyRecorder = jest.spyOn(recorder, 'stopRecording')
        const stubMotionSensor = jest.spyOn(motionSensor, 'isDetectingMotion');
        stubMotionSensor.mockImplementation(()=> false);
        
        controller.recordMotion();

        expect(spyRecorder).toHaveBeenCalled();
    });

    it("asks the recorder to start when the sensor detects motion", ()=>{
        const spyRecorder = jest.spyOn(recorder, 'startRecording')
        const stubMotionSensor = jest.spyOn(motionSensor, 'isDetectingMotion');
        stubMotionSensor.mockImplementation(()=>true);

        controller.recordMotion();

        expect(spyRecorder).toHaveBeenCalled();
    });
});

//Creación de objeto Fake que simulan (o hace de doble) del sensor de movimiento
class FakeMotionSensor implements MotionSensor{
    isDetectingMotion(): boolean {
        return false;
    }
}

//Creación de objeto Fake que simula (o hace de doble) de la cámara de grabación
class FakeRecorder implements VideoRecorder{
    startRecording(): void {
        console.log("START recording..");
    }
    stopRecording(): void {
        console.log("STOP recording..");
    }
}