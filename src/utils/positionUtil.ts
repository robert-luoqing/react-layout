import { PositionModel } from "../models/positionModel";

class PositionUtil {
  getPositionByElement(target: any, clientX: number, clientY: number) {
    const targetRect = target.getBoundingClientRect();

    const selfRelativeX = clientX - targetRect.left;
    const selfRelativeY = clientY - targetRect.top;

    const parent = target.parentElement;
    const parentRect = parent!.getBoundingClientRect();
    const parentRelativeX = clientX - parentRect.left;
    const parentRelativeY = clientY - parentRect.top;

    const position: PositionModel = {
      self: { x: selfRelativeX, y: selfRelativeY },
      parent: { x: parentRelativeX, y: parentRelativeY },
      viewport: { x: clientX, y: clientY },
    };
    return position;
  }
}

export const positionUtil = new PositionUtil();
