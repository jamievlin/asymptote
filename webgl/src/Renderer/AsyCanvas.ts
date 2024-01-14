import { Vector2, Vector3 } from "../Types/VectorTypes";

export default class AsyCanvas {
  canvasWidth = 0;
  canvasHeight = 0;

  /** true: absolute size; false: scale to canvas */
  absolute = false;

  /** Component-wise minimum bounding box corner */
  minBound: Vector3 = { x: 0, y: 0, z: 0 };

  /** Component-wise maximum bounding box corner */
  maxBound: Vector3 = { x: 0, y: 0, z: 0 };

  /** true: orthographic; false: perspective */
  orthographic = false;

  /** Field of view angle */
  angleOfView = 0;

  /** Initial zoom */
  initialZoom = 0;

  /** Viewport shift (for perspective projection) */
  viewportShift: Vector2 = { x: 0, y: 0 };

  /** Margin around viewport */
  viewportMargin: Vector2 = { x: 0, y: 0 };

  /** Background color */
  background: any[] = [];

  /** Zoom base factor */
  zoomFactor = 0;

  /** Zoom pinch factor */
  zoomPinchFactor = 0;

  /** Zoom pinch limit */
  zoomPinchCap = 0;

  /** Zoom power step */
  zoomStep = 0;

  /** Shift-mode maximum hold distance (pixels) */
  shiftHoldDistance = 0;

  /** Shift-mode hold time (milliseconds) */
  shiftWaitTime = 0;

  /** Shift-mode vibrate time (milliseconds) */
  vibrateTime = 0;

  ibl = false;
  webgl2 = false;

  imageURL = "";
  image = "";

  /**
   * Transformation matrix T[4][4] that maps back to user
   * coordinates, with T[i][j] stored as element 4*i+j.
   */
  Transform: any[] = [];

  /** Array of billboard centers */
  Centers: any[] = [];
}
