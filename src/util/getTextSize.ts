import { TextService } from "@rbxts/services";
import { DEFAULT_FONT_NORMAL, DEFAULT_TEXT_SIZE } from "ui/constants";

const FRAME_SIZE = Vector2.one.mul(math.huge);

export default function getTextSize(text: string) {
	const size = TextService.GetTextSize(text, DEFAULT_TEXT_SIZE, DEFAULT_FONT_NORMAL, FRAME_SIZE);

	return new Vector2(math.ceil(size.X), math.ceil(size.Y)).add(Vector2.one);
}
