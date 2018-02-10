import { Bounds } from "./bounds";
export declare class CropPosition {
    x: number;
    y: number;
    w: number;
    h: number;
    constructor(x?: number, y?: number, w?: number, h?: number);
    toBounds(): Bounds;
    isInitialized(): boolean;
}
